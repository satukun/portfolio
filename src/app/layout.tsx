import type { Metadata } from "next";
import { Noto_Sans_JP, Montserrat, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "YOUSUKE.SATO | 生成AIをエンジニア視点で共有",
  description:
    "AIエンジニアの視点で最新の生成AI技術を共有。個人ブランドの確立、コミュニティへの誘導、SNSフォロワー獲得を目的としたブランディングサイト。",
  metadataBase: new URL(siteUrl),
  applicationName: "YOUSUKE.SATO",
  keywords: [
    "生成AI",
    "AIエンジニア",
    "LLM",
    "ChatGPT",
    "Next.js",
    "TypeScript",
    "コミュニティ",
  ],
  openGraph: {
    title: "YOUSUKE.SATO",
    description:
      "エンジニアの視点で最新の生成AI技術を共有するブランディングサイト",
    type: "website",
    url: "/",
    siteName: "YOUSUKE.SATO",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "YOUSUKE.SATO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUSUKE.SATO",
    description:
      "エンジニアの視点で最新の生成AI技術を共有するブランディングサイト",
    images: ["/ogp.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      </head>
      <body
        className={`${notoSansJP.variable} ${montserrat.variable} ${sourceCodePro.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
