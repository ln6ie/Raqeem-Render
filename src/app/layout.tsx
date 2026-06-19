import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "RaqeemFrame — App Store Screenshot Designer",
  description: "Design beautiful App Store screenshots for free. No sign-up, no ads, just export.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1B3A6B]">
          RaqeemFrame
        </Link>
        <Link
          href="/editor"
          className="rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#2952A3]"
        >
          Start Free
        </Link>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-6 text-center text-sm text-[#64748B]">
      Free forever · No login · No ads
    </footer>
  )
}
