import { Cairo } from "next/font/google"
import { siteMetadata } from "@/lib/metadata"
import "./globals.css"
import { RaqeemLogo } from "@/components/ui/Logo"
import { VisitorCounter } from "@/components/ui/VisitorCounter"
import Link from "next/link"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-cairo",
})

export const metadata = siteMetadata

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
    <footer className="border-t border-slate-100 bg-[#F5F5F7] py-12 text-slate-500">
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6 items-center text-center md:flex-row md:items-center md:justify-between">

        {/* اليمين: معلومات المشروع واللوغو */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3">
          <Link href="/" className="transition-transform hover:scale-105">
            <RaqeemLogo size={32} />
          </Link>
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <span className="text-sm font-bold text-slate-800">Raqeem Render</span>
            <span className="text-[10px] text-slate-400">منصة تصدير شاشات التطبيق للمتاجر</span>
          </div>
        </div>

        {/* الوسط: مميزات المنصة كقائمة أفقية */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-600">
          <span>بدون تسجيل</span>
          <span>مجاني بالكامل</span>
          <span>بدون إعلانات</span>
        </div>

        {/* اليسار: حقوق الملكية ومعلومات المستخدمين */}
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-left">
          <span className="text-[10px] text-slate-400">جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          <div className="flex items-center rounded-full bg-[#007AFF] px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-bold text-white shadow-sm whitespace-nowrap">
            <VisitorCounter className="text-white" />
          </div>
        </div>

      </div>
    </footer>
  )
}
