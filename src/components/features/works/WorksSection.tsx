import WorksClient from "@/components/features/works/WorksClient";
import { dal } from "@/dal";

/**
 * Works セクション（Server Component）
 * microCMS APIからデータを取得してクライアントコンポーネントに渡す
 */
export default async function WorksSection() {
  // Server Componentでデータ取得（DAL使用）
  const [featuredWorks, allWorks] = await Promise.all([
    dal.works.getFeaturedWorks(3),  // トップページ用3件
    dal.works.getAllWorks()         // スライドパネル用全件
  ]);

  return (
    <WorksClient 
      featuredWorks={featuredWorks}
      allWorks={allWorks}
    />
  );
}
