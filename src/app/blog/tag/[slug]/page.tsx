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

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// メタデータ生成
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `タグ: ${slug} | YOUSUKE Portfolio`,
    description: `${slug}タグの記事一覧ページです。`,
    openGraph: {
      title: `タグ: ${slug} | YOUSUKE Portfolio`,
      description: `${slug}タグの記事一覧ページです。`,
      type: 'website',
    },
  };
}

// タグ別記事取得
async function getTagPosts(tagSlug: string, page: number = 1, postsPerPage: number = 8) {
  const offset = (page - 1) * postsPerPage;
  
  // デバッグ用ログ追加
  // まず全記事を取得してタグ構造を確認
  console.log('=== Debug: Getting all posts to understand tag structure ===');
  const allPostsResponse = await dal.blog.getBlogPosts({
    limit: 5,
    orders: '-publishedAt',
    filters: 'isPublished[equals]true'
  });
  
  console.log('Sample posts with tags:', allPostsResponse.contents.map(post => ({
    title: post.title,
    tags: post.tags
  })));

  // 正しいmicroCMSフィルタリング構文
  const filterQueries = [
    `isPublished[equals]true`, // まずフィルターなしで試行
    // 他の構文は一旦コメントアウト
    // `tags.slug[equals]${tagSlug}`,
    // `tags.name[equals]${tagSlug}`,
    // `tags[contains]${tagSlug}`
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
      
      console.log('Filter result:', {
        filter,
        totalCount: response.totalCount,
        firstPost: response.contents[0] ? {
          title: response.contents[0].title,
          tags: response.contents[0].tags
        } : null
      });
      
      if (response.totalCount > 0) {
        // クライアントサイドでフィルタリング（一時的な解決策）
        const filteredPosts = response.contents.filter(post => {
          if (!post.tags || post.tags.length === 0) return false;
          return post.tags.some(tag => 
            tag.slug === tagSlug || 
            tag.name === tagSlug ||
            tag.slug?.toLowerCase() === tagSlug.toLowerCase() ||
            tag.name?.toLowerCase() === tagSlug.toLowerCase()
          );
        });
        
        console.log('Client-side filtered posts:', filteredPosts.length);
        
        if (filteredPosts.length > 0) {
          response = {
            contents: filteredPosts,
            totalCount: filteredPosts.length,
            offset: 0,
            limit: postsPerPage
          };
          usedFilter = `client-side-filter:${filter}`;
          console.log('Success with client-side filter. Found:', filteredPosts.length);
          break;
        }
      }
    } catch (error) {
      console.log('Filter failed:', filter, error);
      continue;
    }
  }
  
  // フィルターで見つからない場合は空の結果を返す（全記事表示はしない）
  if (!response || response.totalCount === 0) {
    console.log('No posts found with tag:', tagSlug);
    response = {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: postsPerPage
    };
  }
  
  return {
    posts: response.contents,
    totalCount: response.totalCount,
    totalPages: Math.ceil(response.totalCount / postsPerPage),
    currentPage: page,
    postsPerPage
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const searchParamsData = await searchParams;
  const currentPage = Number(searchParamsData.page) || 1;
  const postsPerPage = 8;
  
  const { posts, totalCount, totalPages } = await getTagPosts(slug, currentPage, postsPerPage);
  
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
                タグ: {slug}
              </li>
            </ol>
          </div>
        </nav>

        {/* ヘッダーセクション */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-content">
              <h1 className="blog-hero-title" data-reveal="fade-up">
                タグ: {slug}
              </h1>
              <p className="blog-hero-description" data-reveal="fade-up">
                {slug}タグの記事一覧です。{totalCount}件の記事があります。
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
                  baseUrl={`/blog/tag/${slug}`}
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
