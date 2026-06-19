'use client'

import Link from 'next/link'
import { Download, Edit3, Layers } from 'lucide-react'
import { RaqeemLogo } from '@/components/ui/Logo'

// الصفحة التعريفية للمشروع مفتوح المصدر بتصميم آبل المبسط
export default function Home() {
  const PREVIEW_THEMES = [
    'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
    'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  ]

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/50 text-neutral-900 font-sans tracking-tight pt-24">
      {/* الهيدر العلوي كبطاقة عائمة */}
      <header className="fixed top-5 left-1/2 z-50 flex w-[90%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-2xl border border-slate-100/80 bg-white/80 p-3.5 px-6 shadow-xl backdrop-blur-lg transition-all">
        <div className="flex items-center gap-2">
          <RaqeemLogo size={32} />
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-50 shadow-sm"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </a>
      </header>

      {/* قسم الهيرو */}
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl leading-tight">
          لقطات شاشة بانورامية متصلة.
        </h1>
        
        <p className="mx-auto mt-6 max-w-lg text-base text-neutral-500 leading-relaxed">
          صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل. أداة خفيفة، دقيقة، وسريعة لإنتاج تصميمات عالية الدقة.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/editor"
            className="rounded-full bg-[#007AFF] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0066D6] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
          >
            ابدأ الآن
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#007AFF] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#007AFF]/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            كود المشروع
          </a>
        </div>
      </section>

      {/* قسم المعاينة البصرية المبسطة */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="flex justify-center gap-5 overflow-x-auto py-6 scrollbar-none">
          {PREVIEW_THEMES.map((bg, idx) => (
            <div
              key={idx}
              className="h-64 w-32 flex-shrink-0 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between p-3 text-white transition-all hover:scale-[1.02]"
              style={{ background: bg }}
            >
              <div className="space-y-1 text-center">
                <div className="h-1.5 w-10 bg-white/30 rounded mx-auto" />
                <div className="h-1 w-6 bg-white/25 rounded mx-auto" />
              </div>
              <div className="h-32 w-full bg-white/5 rounded-xl border border-white/10 border-dashed" />
            </div>
          ))}
        </div>
      </section>

      {/* قسم المزايا المبسط */}
      <section className="border-t border-neutral-100 bg-[#F5F5F7] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 sm:grid-cols-3">
            <div className="space-y-2.5">
              <Layers className="h-5 w-5 text-neutral-800" />
              <h3 className="text-sm font-semibold text-neutral-950">تنسيق بانورامي</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                اعرض تطبيقك في واجهة من 5 شاشات متصلة لتقديم تجربة متناسقة وجذابة على المتجر.
              </p>
            </div>

            <div className="space-y-2.5">
              <Edit3 className="h-5 w-5 text-neutral-800" />
              <h3 className="text-sm font-semibold text-neutral-950">تحرير مباشر</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                عدّل النصوص بسهولة بمجرد النقر عليها مباشرة على الشاشة دون تعقيد الأشرطة الجانبية.
              </p>
            </div>

            <div className="space-y-2.5">
              <Download className="h-5 w-5 text-neutral-800" />
              <h3 className="text-sm font-semibold text-neutral-950">دقة تصدير فائقة</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                احصل على لقطات شاشتك بدقة 1320x2868 بكسل جاهزة للرفع المباشر بجودة عالية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="border-t border-neutral-100 bg-[#F5F5F7] py-8 text-center text-xs text-neutral-400">
        <span>مفتوح المصدر للجميع © {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
