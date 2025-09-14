/**
 * 技術スタックセクション（Server Component）
 * チャート削除、シンプルなテキストセクションに変更
 */
export default function TechStackSection() {
  return (
    <section id="tech-stack" className="section-tech-stack">
      <div className="container">
        <h2 className="section-title" data-reveal="fade-up">技術スタック</h2>
        <p className="section-description" data-reveal="fade-up">
          フロントエンド開発を中心とした技術スキルをご紹介します。モダンな技術を活用して効率的な開発を行っています。
        </p>
        
        <div className="tech-stack-content" data-reveal="fade-up">
          <div className="tech-categories">
            <div className="tech-category">
              <h3>フロントエンド</h3>
              <div className="tech-list">
                <span className="tech-item">React</span>
                <span className="tech-item">Next.js</span>
                <span className="tech-item">TypeScript</span>
                <span className="tech-item">CSS Grid</span>
              </div>
            </div>
            
            <div className="tech-category">
              <h3>開発ツール</h3>
              <div className="tech-list">
                <span className="tech-item">Vite</span>
                <span className="tech-item">ESLint</span>
                <span className="tech-item">Git</span>
                <span className="tech-item">Cursor</span>
              </div>
            </div>
            
            <div className="tech-category">
              <h3>デプロイ・ホスティング</h3>
              <div className="tech-list">
                <span className="tech-item">Vercel</span>
                <span className="tech-item">microCMS</span>
                <span className="tech-item">GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}