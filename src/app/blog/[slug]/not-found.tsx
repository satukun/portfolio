import Link from 'next/link';
import Header from '@/components/layouts/Header';

export default function BlogNotFound() {
  return (
    <>
      <Header />
      
      <main className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-icon">
              <span className="material-symbols-outlined">article</span>
            </div>
            <h1>記事が見つかりません</h1>
            <p>
              お探しの記事は削除されたか、URLが変更された可能性があります。
            </p>
            <div className="not-found-actions">
              <Link href="/blog" className="btn primary">
                記事一覧に戻る
              </Link>
              <Link href="/" className="btn secondary">
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </main>
      
    </>
  );
}
