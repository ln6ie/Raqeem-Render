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

import { RaqeemLogo } from "@/components/ui/Logo"

import Link from "next/link"

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-[#F5F5F7] py-12 text-slate-500">
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* اليمين: معلومات المشروع واللوغو */}
        <div className="flex items-center gap-3">
          <Link href="/" className="transition-transform hover:scale-105">
            <RaqeemLogo size={32} />
          </Link>
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-slate-800">رقيم ريندر</span>
            <span className="text-[10px] text-slate-400">منصة تصدير لقطات الشاشة البانورامية المفتوحة</span>
          </div>
        </div>

        {/* الوسط: مميزات المنصة كقائمة أفقية */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-600">
          <span>بدون تسجيل</span>
          <span className="text-slate-300">•</span>
          <span>مجاني بالكامل</span>
          <span className="text-slate-300">•</span>
          <span>بدون إعلانات</span>
          <span className="text-slate-300">•</span>
          <span>دقة كاملة</span>
        </div>

        {/* اليسار: حقوق الملكية */}
        <div className="text-[10px] text-slate-400 text-left md:text-right">
          <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
        </div>
        
      </div>
    </footer>
  )
}
