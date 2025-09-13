/**
 * Data Access Layer (DAL) 統一エクスポート
 * 
 * Next.jsベストプラクティスに従い、API取得ロジックを集約
 * Server Componentsでのデータフェッチングに最適化
 */

// Base client
export { MicroCMSBaseClient, formatDate, formatDateShort } from './microcms-client';

// Blog DAL
export { BlogDAL } from './blog';
export { blogDAL } from './blog';

// Works DAL  
export { WorksDAL } from './works';
export { worksDAL } from './works';

// Tech Stack DAL
export { TechStackDAL, type TechStack } from './tech-stack';
export { techStackDAL } from './tech-stack';

// 便利な統一インターフェース
import { blogDAL } from './blog';
import { worksDAL } from './works';
import { techStackDAL } from './tech-stack';

export const dal = {
  blog: blogDAL,
  works: worksDAL,
  techStack: techStackDAL
} as const;

/**
 * 使用例:
 * 
 * // Server Component での使用
 * import { dal } from '@/dal';
 * 
 * export default async function HomePage() {
 *   const featuredWorks = await dal.works.getFeaturedWorks(3);
 *   const latestPosts = await dal.blog.getLatestPosts(3);
 *   
 *   return (
 *     <div>
 *       <WorksSection works={featuredWorks} />
 *       <BlogSection posts={latestPosts} />
 *     </div>
 *   );
 * }
 */
