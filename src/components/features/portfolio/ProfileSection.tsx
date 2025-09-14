/**
 * プロフィールセクション
 * 個人情報、技術スタック、SNSリンクを表示
 */
export default function ProfileSection() {
  const techStack = [
    "React",
    "Next.js", 
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "GraphQL"
  ];

  return (
    <section id="profile" className="section-profile">
      <div className="container">
        <h2 className="section-title" data-reveal="fade-up">Profile</h2>
        <p className="section-description" data-reveal="fade-up">
          フロントエンドエンジニアとしての経歴、スキル、取り組んできたプロジェクトをご紹介します。
        </p>
        <div className="profile">
          <div className="avatar-xl" data-reveal="scale">
            <img
              src="/profile_image/sandaga.svg"
              alt="YOUSUKE"
              width={200}
              height={200}
              style={{ 
                display: 'block', 
                width: '200px', 
                height: '200px', 
                objectFit: 'cover',
                transform: 'scale(1.1)' 
              }}
            />
          </div>
          <div className="profile-content">
            <h3 data-reveal="fade-right">YOUSUKE</h3>
            <p className="muted" data-reveal="fade-right">
              エンジニア歴10年以上 / フロントエンド×AI活用
            </p>
            <p className="muted" data-reveal="fade-right">
              実務で使える生成AI活用を、エンジニア視点で検証・発信しています。フロントエンドの実装においてもAIツールを積極的に活用し、開発効率と品質向上を追求しています。
            </p>
            <div className="chips" data-reveal="fade-right">
              {techStack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 14 }} data-reveal="fade-right">
              <a className="btn secondary icon-btn" href="https://note.com/dec_mugi" target="_blank" title="note">
                <span className="material-symbols-outlined">article</span>
                note
              </a>
              <span style={{ display: "inline-block", width: 8 }} />
              <a className="btn primary icon-btn" href="https://github.com/satukun" target="_blank" title="GitHub">
                <span className="material-symbols-outlined">code</span>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
