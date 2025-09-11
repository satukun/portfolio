import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card" data-reveal="scale">
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        {post.thumbnail && (
          <div className="blog-card-thumbnail">
            <Image
              src={post.thumbnail.url}
              alt={post.title}
              width={post.thumbnail.width || 400}
              height={post.thumbnail.height || 250}
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover' 
              }}
            />
          </div>
        )}
        
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <time className="blog-card-date">
              {formatDateShort(post.publishedAt || post.createdAt)}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="blog-card-tags">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag.id} className="blog-tag" style={{ backgroundColor: tag.color }}>
                    {tag.name}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="blog-tag more">+{post.tags.length - 2}</span>
                )}
              </div>
            )}
          </div>
          
          <h3 className="blog-card-title">{post.title}</h3>
          
          {post.excerpt && (
            <p className="blog-card-excerpt">{post.excerpt}</p>
          )}
          
          <div className="blog-card-footer">
            <span className="blog-card-read-more">記事を読む →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
