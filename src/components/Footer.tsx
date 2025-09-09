import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-site">
      <div className="container footer-grid">
        <div className="f-brand">
          <div className="logo">YOUSUKE.SATO</div>
          <p className="muted">
            エンジニアの視点で最新の生成AI技術を共有。
          </p>
        </div>
        <div className="f-links">
          <div className="f-title">サイトマップ</div>
          <ul>
            <li>
              <Link href="#profile">プロフィール</Link>
            </li>
            <li>
              <Link href="#community">コミュニティ</Link>
            </li>
            <li>
              <Link href="#twitter">ツイート</Link>
            </li>
            <li>
              <Link href="#contact">フォロー</Link>
            </li>
          </ul>
        </div>
        <div className="f-social">
          <div className="f-title">SNS</div>
          <ul>
            <li>
              <a href="https://youtube.com/@akira_papa_IT" target="_blank">YouTube</a>
            </li>
            <li>
              <a href="https://note.com/akira_papa_ai" target="_blank">note</a>
            </li>
            <li>
              <a href="https://discord.gg/3GJBa9PMZU" target="_blank">Discord</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container copyright">
        © 2025 あきらパパ
      </div>
    </footer>
  );
}

