import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 開発環境では認証をスキップ
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Basic認証の環境変数が設定されていない場合はスキップ
  const basicAuthUser = process.env.BASIC_AUTH_USER;
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;
  
  if (!basicAuthUser || !basicAuthPassword) {
    return NextResponse.next();
  }

  // API routes や静的ファイルは認証をスキップ
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon') ||
    request.nextUrl.pathname.includes('.') // 静的ファイル
  ) {
    return NextResponse.next();
  }

  // Basic認証のヘッダーをチェック
  const authorizationHeader = request.headers.get('authorization');
  
  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = Buffer.from(basicAuth, 'base64').toString().split(':');
    
    if (user === basicAuthUser && password === basicAuthPassword) {
      return NextResponse.next();
    }
  }

  // 認証が必要な場合、401レスポンスを返す
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// middlewareを適用するパスを設定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
