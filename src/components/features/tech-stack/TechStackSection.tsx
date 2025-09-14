/**
 * 技術スタックセクション（Server Component）
 * 一時的に空のセクション
 */
export default function TechStackSection() {
  return (
    <section id="tech-stack" className="section-tech-stack">
      <div className="container">
        <h2 className="section-title" data-reveal="fade-up">技術スタック</h2>
        <p className="section-description" data-reveal="fade-up">
          技術スタックの詳細は準備中です。
        </p>
        
        {/* 空のエリア */}
        <div className="tech-stack-placeholder" data-reveal="fade-up">
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="muted" style={{ fontSize: '1.1rem' }}>
              Coming Soon...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}