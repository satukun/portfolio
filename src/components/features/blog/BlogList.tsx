import { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
}

export default function BlogList({ 
  posts, 
  showLoadMore = false, 
  onLoadMore, 
  loading = false 
}: BlogListProps) {
  console.log('BlogList received posts:', posts.length, posts);
  
  if (posts.length === 0) {
    return (
      <div className="blog-empty">
        <div className="blog-empty-content">
          <span className="material-symbols-outlined blog-empty-icon">article</span>
          <h3>記事がありません</h3>
          <p>まだ公開された記事がありません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list">
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {showLoadMore && onLoadMore && (
        <div className="blog-load-more">
          <button 
            className="btn secondary blog-load-more-btn"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner" />
                読み込み中...
              </>
            ) : (
              'さらに読み込む'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
