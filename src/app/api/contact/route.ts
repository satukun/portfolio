import { NextResponse } from 'next/server';
import { contactFormSchema, type ContactFormData } from '@/lib/validation/contact';

// メール本文でのインジェクションを防ぐためのシンプルなHTMLエスケープ
function escapeHtml(str: string) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildEmailHtml({ name, email, message }: ContactFormData) {
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
    <h2 style="margin: 0 0 16px;">新しいお問い合わせ</h2>
    <p style="margin: 0 0 8px;">ポートフォリオサイトから問い合わせが届きました。</p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="width:120px;padding:8px 0;color:#64748b;">お名前</td>
        <td style="padding:8px 0;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#64748b;">メール</td>
        <td style="padding:8px 0;">${escapeHtml(email)}</td>
      </tr>
      <tr>
        <td style="vertical-align:top;padding:8px 0;color:#64748b;">内容</td>
        <td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(message)}</td>
      </tr>
    </table>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
    <p style="font-size:12px;color:#64748b;">このメールはポートフォリオサイトの問い合わせフォームから自動送信されています。</p>
  </div>`;
}

async function sendViaFormspree(data: ContactFormData) {
  const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID;

  if (!FORMSPREE_FORM_ID) return { sent: false, reason: 'missing_formspree_id' } as const;

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      _subject: `【お問い合わせ】${data.name}様より`,
    }),
    // Vercelのedge/nodeに外部呼び出しを処理させる（キャッシュなし）
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Formspree API error: ${res.status} ${res.statusText} ${text}`);
  }
  
  const json = await res.json().catch(() => ({}));
  return { sent: true, id: json?.id } as const;
}

// Resend用関数（将来的な独自ドメイン対応）
async function sendViaResend(data: ContactFormData) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.CONTACT_TO_EMAIL;
  const FROM = process.env.CONTACT_FROM_EMAIL; // 独自ドメイン必須

  if (!RESEND_API_KEY || !TO || !FROM) return { sent: false, reason: 'missing_resend_config' } as const;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM, // 認証済み独自ドメインが必要
      to: [TO],
      reply_to: [data.email],
      subject: `【お問い合わせ】${data.name}様より`,
      html: buildEmailHtml(data),
      text: `お名前: ${data.name}\nメール: ${data.email}\n\n内容:\n${data.message}`,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Resend API error: ${res.status} ${res.statusText} ${text}`);
  }
  
  const json = await res.json().catch(() => ({}));
  return { sent: true, id: json?.id } as const;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // 同じスキーマを使用したサーバーサイドバリデーション
    const parsed = await contactFormSchema.validate(body, { abortEarly: false, stripUnknown: true });

    // 軽量なスパム対策：過度に長いメッセージまたは隠しハニーポットを拒否
    if (typeof parsed.message === 'string' && parsed.message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    // メール送信の優先順位：Formspree → Resend → ログ保存
    try {
      // Priority 1: Formspree（現在・無料ドメイン対応）
      const formspreeResult = await sendViaFormspree(parsed as ContactFormData);
      if (formspreeResult.sent) {
        return NextResponse.json({ 
          ok: true, 
          id: formspreeResult.id, 
          method: 'formspree' 
        }, { status: 200 });
      }

      // Priority 2: Resend（将来・独自ドメイン対応）
      const resendResult = await sendViaResend(parsed as ContactFormData);
      if (resendResult.sent) {
        return NextResponse.json({ 
          ok: true, 
          id: resendResult.id, 
          method: 'resend' 
        }, { status: 200 });
      }

      // Priority 3: フォールバック（ログ保存）
      console.warn('Email providers not configured. Logging message only.', parsed);
      return NextResponse.json({ 
        ok: true, 
        mode: 'log-only',
        note: 'メール送信設定が必要です'
      }, { status: 202 });

    } catch (e) {
      console.error('Email send failed:', e);
      return NextResponse.json({ 
        error: 'メール送信に失敗しました',
        fallback: 'ログに保存されました'
      }, { status: 502 });
    }
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'name' in err && err.name === 'ValidationError') {
      const validationError = err as { inner?: Array<{ path: string; message: string }> };
      const details = (validationError.inner || []).map((e) => ({ 
        path: e.path, 
        message: e.message 
      }));
      return NextResponse.json({ error: '入力エラー', details }, { status: 400 });
    }
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}

