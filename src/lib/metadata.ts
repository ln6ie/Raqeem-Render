import type { Metadata } from "next"

export const siteMetadata: Metadata = {
  title: "Raqeem Render — صانع لقطات الشاشة البانورامية لتطبيقات الجوال",
  description: "صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل مجاناً وبأعلى دقة دون تسجيل أو إعلانات.",
  keywords: ["تصميم لقطات شاشة", "App Store screenshots", "لقطات شاشة بانورامية", "Raqeem Render", "رقيم ريندر", "تصدير فريمات"],
  authors: [{ name: "Raqeem Render" }],
  openGraph: {
    title: "Raqeem Render — صانع لقطات الشاشة البانورامية",
    description: "صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل مجاناً وبأعلى دقة دون تسجيل أو إعلانات.",
    url: "https://raqeemrender.netlify.app/",
    siteName: "Raqeem Render",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "لوغو Raqeem Render",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Raqeem Render — صانع لقطات الشاشة البانورامية",
    description: "صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل مجاناً وبأعلى دقة دون تسجيل أو إعلانات.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}
