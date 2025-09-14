import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import BlogList from '@/components/features/blog/BlogList';
import BlogSidebar from '@/components/features/blog/BlogSidebar';
import BlogPagination from '@/components/features/blog/BlogPagination';
import RevealInit from '@/components/common/animations/RevealInit';
import { dal } from '@/dal';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// メタデータ生成
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `カテゴリ: ${slug} | YOUSUKE Portfolio`,
    description: `${slug}カテゴリの記事一覧ページです。`,
    openGraph: {
      title: `カテゴリ: ${slug} | YOUSUKE Portfolio`,
      description: `${slug}カテゴリの記事一覧ページです。`,
      type: 'website',
    },
  };
}

// カテゴリ別記事取得
async function getCategoryPosts(categorySlug: string, page: number = 1, postsPerPage: number = 8) {
  const offset = (page - 1) * postsPerPage;
  
  // デバッグ用ログ追加
  // microCMSのカテゴリフィルタリング：複数の構文を試行
  const filterQueries = [
    `isPublished[equals]true[and]category[contains]${categorySlug}`,
    `isPublished[equals]true[and]category.slug[contains]${categorySlug}`,
    `isPublished[equals]true[and]category.name[contains]${categorySlug}`,
    `isPublished[equals]true[and]category[equals]${categorySlug}`
  ];

  let response;
  let usedFilter = '';
  
  // 複数のフィルタリング構文を試行
  for (const filter of filterQueries) {
    try {
      console.log('Trying filter:', filter);
      response = await dal.blog.getBlogPosts({
        limit: postsPerPage,
        offset,
        orders: '-publishedAt',
        filters: filter
      });
      
      if (response.totalCount > 0) {
        usedFilter = filter;
        console.log('Success with filter:', filter, 'Found:', response.totalCount);
        break;
      }
    } catch (error) {
      console.log('Filter failed:', filter, error);
      continue;
    }
  }
  
  // どのフィルターでも見つからない場合、フィルターなしで全記事取得
  if (!response || response.totalCount === 0) {
    console.log('No posts found with any filter, fetching all posts for debugging');
    response = await dal.blog.getBlogPosts({
      limit: postsPerPage,
      offset,
      orders: '-publishedAt',
      filters: 'isPublished[equals]true'
    });
  }
  
  return {
    posts: response.contents,
    totalCount: response.totalCount,
    totalPages: Math.ceil(response.totalCount / postsPerPage),
    currentPage: page,
    postsPerPage
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const searchParamsData = await searchParams;
  const currentPage = Number(searchParamsData.page) || 1;
  const postsPerPage = 8;
  
  const { posts, totalCount, totalPages } = await getCategoryPosts(slug, currentPage, postsPerPage);
  
  // 記事が見つからない場合は404
  if (posts.length === 0 && currentPage === 1) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main className="blog-page">
        {/* パンくずナビ */}
        <nav className="breadcrumb">
          <div className="container">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="breadcrumb-item active">
                カテゴリ: {slug}
              </li>
            </ol>
          </div>
        </nav>

        {/* ヘッダーセクション */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-content">
              <h1 className="blog-hero-title" data-reveal="fade-up">
                カテゴリ: {slug}
              </h1>
              <p className="blog-hero-description" data-reveal="fade-up">
                {slug}カテゴリの記事一覧です。{totalCount}件の記事があります。
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
                <Suspense fallback={<div>読み込み中...</div>}>
                  <BlogList posts={posts} />
                </Suspense>
                
                {/* ページネーション */}
                <BlogPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  postsPerPage={postsPerPage}
                  baseUrl={`/blog/category/${slug}`}
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
