import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import BlogContent from '@/components/features/blog/BlogContent';
import BlogSidebar from '@/components/features/blog/BlogSidebar';
import RevealInit from '@/components/common/animations/RevealInit';
import { dal } from '@/dal';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 静的パラメータの生成（オプション）
export async function generateStaticParams() {
  try {
    const response = await dal.blog.getBlogPosts({
      limit: 100,
      fields: 'slug',
      filters: 'isPublished[equals]true'
    });
    
    return response.contents.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// メタデータの生成
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await dal.blog.getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Page Not Found | YOUSUKE Portfolio',
    };
  }

  return {
    title: `${post.title} | YOUSUKE Portfolio`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
      images: post.thumbnail ? [post.thumbnail.url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
      images: post.thumbnail ? [post.thumbnail.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await dal.blog.getBlogPostBySlug(slug);

  if (!post || !post.isPublished) {
    notFound();
  }

  // 関連記事を取得（同じタグを持つ記事）
  const getRelatedPosts = async () => {
    if (!post.tags || post.tags.length === 0) return [];
    
    const tagFilters = post.tags
      .map(tag => `tags[contains]${tag.id}`)
      .join('[or]');
    
    try {
      const response = await dal.blog.getBlogPosts({
        limit: 3,
        filters: `${tagFilters}[and]id[not_equals]${post.id}[and]isPublished[equals]true`,
        orders: '-publishedAt'
      });
      
      return response.contents;
    } catch (error) {
      console.error('Failed to fetch related posts:', error);
      return [];
    }
  };

  const relatedPosts = await getRelatedPosts();

  return (
    <>
      <Header />
      
      <main className="blog-post-page">
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
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* 記事コンテンツ */}
        <section className="blog-post-section">
          <div className="container">
            <div className="blog-layout">
              {/* メインコンテンツ */}
              <main className="blog-main">
                <div className="blog-post-container">
                  <BlogContent post={post} />
                  
                  {/* ナビゲーション */}
                  <div className="blog-post-navigation">
                    <Link href="/blog" className="btn secondary">
                      <span className="material-symbols-outlined">arrow_back</span>
                      記事一覧に戻る
                    </Link>
                  </div>
                </div>
              </main>
              
              {/* サイドバー */}
              <BlogSidebar className="blog-sidebar-desktop" />
            </div>
            
            {/* モバイル用サイドバー */}
            <BlogSidebar className="blog-sidebar-mobile" />
          </div>
        </section>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <section className="related-posts-section">
            <div className="container">
              <h2 className="section-title">関連記事</h2>
              <div className="related-posts-grid">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="related-post-card">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.thumbnail && (
                        <div className="related-post-thumbnail">
                          <img 
                            src={relatedPost.thumbnail.url} 
                            alt={relatedPost.title}
                            width={300}
                            height={200}
                            style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div className="related-post-content">
                        <h3 className="related-post-title">{relatedPost.title}</h3>
                        {relatedPost.excerpt && (
                          <p className="related-post-excerpt">{relatedPost.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
      <RevealInit />
    </>
  );
}
