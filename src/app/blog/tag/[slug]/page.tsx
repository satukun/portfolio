import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layouts/Header';
import BlogList from '@/components/features/blog/BlogList';
import BlogSidebar from '@/components/features/blog/BlogSidebar';
import BlogPagination from '@/components/features/blog/BlogPagination';
import { dal } from '@/dal';
import { BlogPost } from '@/lib/types';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

interface TagPostsResult {
  posts: BlogPost[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  postsPerPage: number;
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
async function getTagPosts(tagSlug: string, page: number = 1, postsPerPage: number = 8): Promise<TagPostsResult> {
  // タグフィルタリング処理
  
  try {
    // 全記事を取得してクライアントサイドでフィルタリング
    const allPostsResponse = await dal.blog.getBlogPosts({
      limit: 100, // 全記事取得
      orders: '-publishedAt',
      filters: 'isPublished[equals]true'
    });
    
    // 全記事を取得
    
    // クライアントサイドでタグフィルタリング
    const filteredPosts = allPostsResponse.contents.filter(post => {
      if (!post.tags || post.tags.length === 0) return false;
      
      const hasMatchingTag = post.tags.some(tag => {
        const normalizedTagSlug = tagSlug.toLowerCase().replace(/\./g, '');
        const normalizedTagName = tag.name?.toLowerCase().replace(/\./g, '') || '';
        const normalizedTagSlugField = tag.slug?.toLowerCase().replace(/\./g, '') || '';
        
        const matches = 
          tag.slug === tagSlug || 
          tag.name === tagSlug ||
          normalizedTagSlugField === normalizedTagSlug ||
          normalizedTagName === normalizedTagSlug;
          
        // マッチング処理
        
        return matches;
      });
      
      return hasMatchingTag;
    });
    
    // フィルタリング完了
    
    // ページング処理
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    return {
      posts: paginatedPosts,
      totalCount: filteredPosts.length,
      totalPages: Math.ceil(filteredPosts.length / postsPerPage),
      currentPage: page,
      postsPerPage
    };
    
  } catch (error) {
    console.error('Error in getTagPosts:', error);
    return {
      posts: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      postsPerPage
    };
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const searchParamsData = await searchParams;
  const currentPage = Number(searchParamsData.page) || 1;
  const postsPerPage = 8;
  
  const { posts, totalCount, totalPages } = await getTagPosts(slug, currentPage, postsPerPage);

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
                {totalCount > 0 
                  ? `${slug}タグの記事一覧です。${totalCount}件の記事があります。`
                  : `${slug}タグの記事は見つかりませんでした。`
                }
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
                {posts.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="no-posts-found">
                    <div className="no-posts-content">
                      <span className="material-symbols-outlined">label_off</span>
                      <h3>このタグの記事が見つかりません</h3>
                      <p>「{slug}」タグの記事は現在公開されていません。</p>
                      <Link href="/blog" className="btn primary">
                        記事一覧に戻る
                      </Link>
                    </div>
                  </div>
                )}
              </main>
              
              {/* サイドバー */}
              <BlogSidebar className="blog-sidebar-desktop" />
            </div>
            
            {/* モバイル用サイドバー */}
            <BlogSidebar className="blog-sidebar-mobile" />
          </div>
        </section>
      </main>
      
    </>
  );
}