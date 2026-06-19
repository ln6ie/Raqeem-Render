import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "رقيم ريندر — صانع لقطات الشاشة البانورامية لتطبيقات الجوال",
  description: "صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل مجاناً وبأعلى دقة دون تسجيل أو إعلانات.",
  keywords: ["تصميم لقطات شاشة", "App Store screenshots", "لقطات شاشة بانورامية", "Raqeem Render", "رقيم ريندر", "تصدير فريمات"],
  authors: [{ name: "رقيم ريندر" }],
  openGraph: {
    title: "رقيم ريندر — صانع لقطات الشاشة البانورامية",
    description: "صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل مجاناً وبأعلى دقة دون تسجيل أو إعلانات.",
    url: "https://raqeem-render.vercel.app",
    siteName: "رقيم ريندر",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "لوغو رقيم ريندر",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "رقيم ريندر — صانع لقطات الشاشة البانورامية",
    description: "صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل مجاناً وبأعلى دقة دون تسجيل أو إعلانات.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-6 text-center text-sm text-[#64748B]">
      Free forever · No login · No ads
    </footer>
  )
}
