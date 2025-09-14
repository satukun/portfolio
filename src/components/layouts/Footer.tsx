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
              <Link href="#posts">記事</Link>
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
              <a href="https://note.com/dec_mugi" target="_blank">note</a>
            </li>
            <li>
              <a href="https://github.com/satukun" target="_blank">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container copyright">
        © 2025 YOUSUKE
      </div>
    </footer>
  );
}

