type Props = {
  author?: string;
  handle?: string;
  text: string;
  date?: string;
};

export default function TweetPlaceholder({
  author = "YOUSUKE",
  handle = "@akira_papa_IT",
  text,
  date = "2025/01/01",
}: Props) {
  return (
    <article className="tweet-embed" role="article" aria-label="ツイート（ダミー）">
      <header style={{ display: "flex", gap: 8, alignItems: "center", width: "100%" }}>
        <span
          aria-hidden
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: "linear-gradient(135deg,#2563eb,#8b5cf6)",
            display: "inline-block",
          }}
        />
        <div style={{ display: "grid", lineHeight: 1.15 }}>
          <strong style={{ fontSize: 14 }}>{author}</strong>
          <span className="muted" style={{ fontSize: 12 }}>{handle} · {date}</span>
        </div>
      </header>
      <p style={{ marginTop: 10, fontSize: 14, textAlign: "left" }}>{text}</p>
    </article>
  );
}

