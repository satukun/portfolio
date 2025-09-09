import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import TypewriterCode from "@/components/TypewriterCode";
import ScrollTopButton from "@/components/ScrollTopButton";
import TweetPlaceholder from "@/components/TweetPlaceholder";

const codeSample = `type AIModel = {
  name: string
  provider: 'openai' | 'anthropic' | 'google'
  tokens: number
}

export const models: AIModel[] = [
  { name: 'gpt-4o', provider: 'openai', tokens: 128000 },
  { name: 'o4-mini', provider: 'openai', tokens: 200000 },
  { name: 'claude-3-5', provider: 'anthropic', tokens: 200000 }
]

export function choose(model: string) {
  return models.find(m => m.name === model)
}
`;

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero" aria-label="ヒーロー">
        <div className="container hero-grid">
          <div>
            <h1>
              エンジニアの視点で
              <br />
              最新の生成AI技術を共有
            </h1>
            <p className="lead">
              AIの可能性を探求し、エンジニアの視点から実用的な知識を発信しています。
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="#community">コミュニティに参加</a>
              <a className="btn secondary" href="#profile">プロフィールを見る</a>
            </div>
          </div>
          <div className="hero-vis" aria-hidden>
            <Particles />
            <TypewriterCode code={codeSample} />
          </div>
        </div>
        <div className="wave bottom" aria-hidden>
          <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path d="M0 30 C 150 80 350 -20 600 30 C 850 80 1050 -20 1200 30 L1200 80 L0 80 Z" fill="rgba(37,99,235,.08)"/>
          </svg>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="section-profile">
        <div className="wave top" aria-hidden>
          <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path d="M0 50 C 200 0 400 100 600 50 C 800 0 1000 100 1200 50 L1200 80 L0 80 Z" fill="rgba(16,185,129,.10)"/>
          </svg>
        </div>
        <div className="container">
          <h2 className="section-title" data-reveal>プロフィール</h2>
          <div className="profile">
            <div className="avatar-xl" data-reveal>
              <img
                src="/profile_image/akira-papa-profile.jpg"
                alt="あきらパパ"
                width={300}
                height={300}
                style={{ display: 'block', width: '300px', height: '300px', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h3 data-reveal>あきらパパ</h3>
              <p className="muted" data-reveal>
                エンジニア歴10年以上 / 生成AI講師
              </p>
              <p className="muted" data-reveal>
                実務で使える生成AI活用を、エンジニア視点で検証・発信しています。プロンプト設計、ツール連携、フロントエンド×LLMの実装まで幅広く対応。
              </p>
              <div className="chips" data-reveal>
                {[
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "React",
                  "EJS",
                  "PHP",
                ].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 14 }} data-reveal>
                <a className="btn secondary" href="https://note.com/akira_papa_ai" target="_blank">note</a>
                <span style={{ display: "inline-block", width: 8 }} />
                <a className="btn primary" href="https://discord.gg/3GJBa9PMZU" target="_blank">Discord</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community">
        <div className="container community-grid">
          <div className="logo-spotlight" data-reveal>
            <div className="spot" aria-hidden />
            <svg
              width="260"
              height="260"
              viewBox="0 0 100 100"
              role="img"
              aria-label="RIDE ON AI ロゴ"
              onMouseMove={(e) => {
                const target = (e.currentTarget.parentElement?.querySelector(
                  ".spot"
                ) as HTMLElement)!;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                target.style.setProperty("--x", `${x}%`);
                target.style.setProperty("--y", `${y}%`);
              }}
            >
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="44" fill="url(#g)" />
              <text x="50" y="57" textAnchor="middle" fontSize="30" fill="#fff" fontFamily="var(--font-montserrat)">
                RAI
              </text>
            </svg>
          </div>
          <div>
            <h2 className="section-title" data-reveal>
              生成AI検証コミュニティ「RIDE ON AI」
            </h2>
            <p className="muted" data-reveal>
              最新のAI技術を素早く検証し、エンジニア視点で活用方法を共有するコミュニティです。
            </p>
            <div className="card3" style={{ marginTop: 14 }}>
              {[
                "最新AI技術の検証",
                "エンジニア視点でのAI活用",
                "メンバー同士の知見共有",
              ].map((t) => (
                <div key={t} className="card" data-reveal>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }} data-reveal>
              <a className="btn primary" href="https://discord.gg/3GJBa9PMZU" target="_blank">
                Discordに参加する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Twitter */}
      <section id="twitter">
        <div className="container">
          <h2 className="section-title" data-reveal>最新の投稿</h2>
          <div className="tweets">
            {[
              "生成AIの検証結果を公開しました。Next.js×LLMの実装ポイントを整理。",
              "プロンプト設計のコツ3選：役割/制約/検証をセットで考える。",
              "RAGの評価手順を共有。再現性を上げるログ設計が鍵。",
              "TypeScriptでAI SDKを扱う時の型戦略。安全に拡張する。",
              "UIで大事なのは確信度の可視化と再実行UX。",
              "Streaming UIの実装例：チャンクを扱う3つのパターン。",
              "推論コスト最適化：前処理×キャッシュ×モデル選択。",
              "Agent設計の落とし穴：ツール権限とサーキットブレーカー。",
              "コミュニティでの検証予定：検索拡張と評価自動化。",
            ].map((t, i) => (
              <div key={i} data-reveal>
                <TweetPlaceholder text={t} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <a className="btn secondary" href="https://twitter.com/intent/follow?screen_name=akira_papa_IT" target="_blank">
              フォローする
            </a>
          </div>
        </div>
      </section>

      {/* Follow */}
      <section id="contact">
        <div className="container">
          <h2 className="section-title" data-reveal>あきらパパをフォローしよう！</h2>
          <p className="muted" data-reveal>
            最新の検証・Tipsをキャッチアップ。動画・記事・コミュニティで発信中。
          </p>
          <div className="follow-grid" style={{ marginTop: 16 }}>
            <a className="sns-card" href="https://youtube.com/@akira_papa_IT" target="_blank" data-reveal>
              <strong>YouTube</strong>
              <svg className="float-icon" width="48" height="48" viewBox="0 0 24 24" fill="#ef4444"><path d="M10 15l5.19-3L10 9v6zm11-3c0-2.5-.2-4.1-.4-5-.2-.8-.8-1.4-1.6-1.6C17.1 5 12 5 12 5s-5.1 0-7 .4c-.8.2-1.4.8-1.6 1.6-.2.9-.4 2.5-.4 5s.2 4.1.4 5c.2.8.8 1.4 1.6 1.6 1.9.4 7 .4 7 .4s5.1 0 7-.4c.8-.2 1.4-.8 1.6-1.6.2-.9.4-2.5.4-5z"/></svg>
            </a>
            <a className="sns-card" href="https://note.com/akira_papa_ai" target="_blank" data-reveal>
              <strong>note</strong>
              <svg className="float-icon" width="48" height="48" viewBox="0 0 24 24" fill="#10b981"><path d="M3 5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm14 1.5V8h2.5L17 6.5z"/></svg>
            </a>
            <a className="sns-card" href="https://discord.gg/3GJBa9PMZU" target="_blank" data-reveal>
              <strong>Discord</strong>
              <svg className="float-icon" width="48" height="48" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.369A19.791 19.791 0 0016.558 3c-.197.35-.42.82-.576 1.187a18.27 18.27 0 00-7.964 0 12.26 12.26 0 00-.588-1.187 19.736 19.736 0 00-3.761 1.37C.533 9.205-.32 13.96.099 18.646a19.9 19.9 0 005.997 3.04c.486-.67.92-1.385 1.292-2.133-.708-.265-1.386-.593-2.028-.98.17-.124.337-.254.5-.388a13.66 13.66 0 0011.28 0c.163.134.33.264.5.388-.643.387-1.321.715-2.028.98.372.748.806 1.463 1.292 2.133a19.9 19.9 0 005.997-3.04c.5-5.48-.873-10.18-1.612-14.277zM8.02 15.335c-1.106 0-2.006-1.02-2.006-2.273 0-1.253.881-2.273 2.006-2.273 1.138 0 2.026 1.02 2.006 2.273.02 1.253-.868 2.273-2.006 2.273zm7.96 0c-1.106 0-2.006-1.02-2.006-2.273 0-1.253.881-2.273 2.006-2.273 1.138 0 2.026 1.02 2.006 2.273 0 1.253-.868 2.273-2.006 2.273z"/></svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ScriptTags />
      <RevealScript />
      <ScrollTopButton />
    </>
  );
}

function ScriptTags() {
  return (
    <>
      {/* Twitter widgets for embeds (loads on client) */}
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
    </>
  );
}

function RevealScript() {
  // Minimal AOS-like behavior
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(()=>{const els=[...document.querySelectorAll('[data-reveal]')];const io=new IntersectionObserver((es)=>{for(const e of es){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}},{threshold:.12});els.forEach(e=>io.observe(e));})();`,
      }}
    />
  );
}

// ScrollTopButton moved to a client component
