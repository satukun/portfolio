import Link from 'next/link';
import Header from '@/components/layouts/Header';

export default function TagNotFound() {
  return (
    <>
      <Header />
      
      <main className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-icon">
              <span className="material-symbols-outlined">label_off</span>
            </div>
            <h1>タグが見つかりません</h1>
            <p>
              指定されたタグは存在しないか、記事が公開されていません。
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
