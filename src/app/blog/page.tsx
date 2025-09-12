import { Suspense } from 'react';
import { Metadata } from 'next';
import Header from '@/components/common/navigation/Header';
import Footer from '@/components/common/navigation/Footer';
import BlogList from '@/components/features/blog/BlogList';
import { microCMSClient } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | YOUSUKE Portfolio',
  description: 'フロントエンド技術に関する記事やノウハウを発信しています。',
  openGraph: {
    title: 'Blog | YOUSUKE Portfolio',
    description: 'フロントエンド技術に関する記事やノウハウを発信しています。',
    type: 'website',
  },
};

// ローディングコンポーネント
function BlogLoading() {
  return (
    <div className="blog-loading">
      <div className="container">
        <div className="blog-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="blog-card-skeleton">
              <div className="skeleton-thumbnail" />
              <div className="skeleton-content">
                <div className="skeleton-meta" />
                <div className="skeleton-title" />
                <div className="skeleton-excerpt" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ブログ記事一覧を取得
async function getBlogPosts() {
  const response = await microCMSClient.getBlogPosts({
    limit: 12,
    orders: '-publishedAt',
    filters: 'isPublished[equals]true'
  });
  
  
  return response.contents;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  

  return (
    <>
      <Header />
      
      <main className="blog-page">
        {/* ヘッダーセクション */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-content">
              <h1 className="blog-hero-title" data-reveal="fade-up">
                Blog
              </h1>
              <p className="blog-hero-description" data-reveal="fade-up">
                フロントエンド技術に関する記事やノウハウ、開発で得た知見を発信しています。
                最新の技術トレンドや実務で使えるテクニックを中心にお届けします。
              </p>
            </div>
          </div>
        </section>

        {/* ブログ記事一覧 */}
        <section className="blog-section">
          <div className="container">
            <Suspense fallback={<BlogLoading />}>
              <BlogList posts={posts} />
            </Suspense>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
