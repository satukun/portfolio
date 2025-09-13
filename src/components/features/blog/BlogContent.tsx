import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/dal';

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <article className="blog-content">
      {/* ヘッダー */}
      <header className="blog-header">
        <div className="blog-meta">
          <time className="blog-date">
            {formatDate(post.publishedAt || post.createdAt)}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="blog-tags">
              {post.tags.map((tag, index) => (
                <span 
                  key={`${tag.id}-${index}`} 
                  className="blog-tag"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <h1 className="blog-title">{post.title}</h1>
        
        {post.excerpt && (
          <p className="blog-excerpt">{post.excerpt}</p>
        )}
        
        {post.authorName && (
          <div className="blog-author">
            {post.authorAvatar && (
              <div className="blog-author-avatar">
                <Image
                  src={post.authorAvatar.url}
                  alt={post.authorName}
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
              </div>
            )}
            <span className="blog-author-name">by {post.authorName}</span>
          </div>
        )}
      </header>

      {/* サムネイル */}
      {post.thumbnail && (
        <div className="blog-thumbnail">
          <Image
            src={post.thumbnail.url}
            alt={post.title}
            width={post.thumbnail.width || 800}
            height={post.thumbnail.height || 400}
            style={{ 
              width: '100%', 
              height: 'auto',
              borderRadius: 'var(--radius)'
            }}
            priority
          />
        </div>
      )}

      {/* 本文 */}
      <div 
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* フッター */}
      <footer className="blog-footer">
        <div className="blog-footer-meta">
          <p>
            作成日: {formatDate(post.createdAt)}
            {post.updatedAt !== post.createdAt && (
              <span> | 更新日: {formatDate(post.updatedAt)}</span>
            )}
          </p>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="blog-footer-tags">
            <h4>タグ</h4>
            <div className="blog-tags">
              {post.tags.map((tag, index) => (
                <span 
                  key={`footer-${tag.id}-${index}`} 
                  className="blog-tag"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  );
}
