import { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import BlogList from '@/components/features/blog/BlogList';
import BlogSidebar from '@/components/features/blog/BlogSidebar';
import BlogPagination from '@/components/features/blog/BlogPagination';
import RevealInit from '@/components/common/animations/RevealInit';
import { dal } from '@/dal';

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

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

// ブログ記事一覧を取得
async function getBlogPosts(page: number = 1, postsPerPage: number = 8) {
  const offset = (page - 1) * postsPerPage;
  
  const response = await dal.blog.getBlogPosts({
    limit: postsPerPage,
    offset,
    orders: '-publishedAt',
    filters: 'isPublished[equals]true'
  });
  
  return {
    posts: response.contents,
    totalCount: response.totalCount,
    totalPages: Math.ceil(response.totalCount / postsPerPage),
    currentPage: page,
    postsPerPage
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const postsPerPage = 8;
  
  const { posts, totalCount, totalPages } = await getBlogPosts(currentPage, postsPerPage);

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
            <div className="blog-layout">
              {/* メインコンテンツ */}
              <main className="blog-main">
                <Suspense fallback={<BlogLoading />}>
                  <BlogList posts={posts} />
                </Suspense>
                
                {/* ページネーション */}
                <BlogPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  postsPerPage={postsPerPage}
                />
              </main>
              
              {/* サイドバー */}
              <BlogSidebar className="blog-sidebar-desktop" />
            </div>
            
            {/* モバイル用サイドバー */}
            <BlogSidebar className="blog-sidebar-mobile" />
          </div>
        </section>
      </main>
      
      <Footer />
      <RevealInit />
    </>
  );
}
