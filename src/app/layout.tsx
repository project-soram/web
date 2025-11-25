import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://soram.team"
  ),
  title: {
    default: "Soram | 소람 - 이야기와 목소리로 연결 된 우리",
    template: "%s | Soram",
  },
  description:
    " 진짜 대화를 시작하는 감성 소셜 앱 소람, 소람은 외모나 스펙보다 내면과 진심에 집중하는 감성 소셜 앱입니다.",
  applicationName: "Soram",
  keywords: ["Soram", "소람", "커뮤니티", "연결", "소셜", "만남"],
  authors: [{ name: "Soram" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "Soram",
    title: "Soram | 소람 - 이야기와 목소리로 연결 된 우리",
    description: "이야기와 목소리로 연결된 우리, 소람",

    // 링크 공유 시 보여질 대표 이미지
    images: [
      { url: "/icons/og-logo.png", width: 1200, height: 630, alt: "Soram" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soram | 소람 - 이야기와 목소리로 연결 된 우리",
    description: "이야기와 목소리로 연결된 우리, 소람",

    // 링크 공유 시 보여질 대표 이미지
    images: ["/icons/og-logo.png"],
  },
  // 주소가 여러개일 때 어떤 주소를 대표로 할지 설정
  alternates: { canonical: "/" },

  // 검색 엔진 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/icons/rlogo.png" />
        {/* Naver Site Verification */}
        <meta
          name="naver-site-verification"
          content="6ad1ff1c8605a58b0c2d23cd5485cacddb45e98a"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
