import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import RevealInit from "@/components/common/animations/RevealInit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "YOUSUKE | フロントエンドエンジニア - React/Next.js専門",
  description:
    "フロントエンドエンジニアの実務経験を通じた技術知識・ベストプラクティスを発信。React/Next.js/TypeScriptに特化した実践的なコンテンツを提供しています。",
  metadataBase: new URL(siteUrl),
  applicationName: "YOUSUKE",
  keywords: [
    "フロントエンド",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "パフォーマンス最適化",
    "UI/UX",
    "エンジニア",
  ],
  openGraph: {
    title: "YOUSUKE",
    description:
      "フロントエンドエンジニアの実務経験を通じた技術知識発信サイト",
    type: "website",
    url: "/",
    siteName: "YOUSUKE",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "YOUSUKE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUSUKE",
    description:
      "フロントエンドエンジニアの実務経験を通じた技術知識発信サイト",
    images: ["/ogp.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e293b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Material Symbols (Google Material Design Icons) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..700,0..1,-50..200"
          rel="stylesheet"
        />
        {/* Google Fonts (self-hosting via next/font disabled to avoid server fetch) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Montserrat:wght@400;500;600;700;800&family=Source+Code+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Footer />
        <RevealInit />
      </body>
    </html>
  );
}
