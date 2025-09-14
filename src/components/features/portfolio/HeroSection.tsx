import CodeSphere from "@/components/common/animations/CodeSphere";

/**
 * Heroセクション
 * サイトのメインビジュアルとキャッチコピーを表示
 */
export default function HeroSection() {
  return (
    <section className="hero" aria-label="ヒーロー">
      <div className="hero-background" aria-hidden>
        <CodeSphere width={800} height={600} />
      </div>
      <div className="container hero-content">
        <div className="hero-text">
          <h1>
            フロントエンドエンジニアとして
            <br />
            技術知見を共有・発信
          </h1>
          <p className="section-description">
            フロントエンドの最新技術・ベストプラクティスを実務経験を通じて発信しています。
          </p>
          <div className="hero-ctas">
            <a className="btn primary" href="#blog">最新記事を見る</a>
            <a className="btn secondary" href="#profile">プロフィールを見る</a>
          </div>
        </div>
      </div>
    </section>
  );
}
