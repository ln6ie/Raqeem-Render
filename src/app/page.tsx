import Link from 'next/link'
import { Download, Edit3, Layers } from 'lucide-react'
import { RaqeemLogo } from '@/components/ui/Logo'
import { VisitorCounter } from '@/components/ui/VisitorCounter'

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-white text-[#1d1d1f] font-sans tracking-tight">

      <header className="fixed top-5 left-1/2 z-50 flex w-[92%] max-w-4xl -translate-x-1/2 items-center justify-between rounded-full border border-[#E2E8F0]/60 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <RaqeemLogo size={28} />
          <span className="text-sm font-semibold text-[#1d1d1f]">Raqeem Render</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[#E2E8F0] px-3.5 py-1.5 text-xs transition-colors hover:bg-[#F8FAFC]">
            <VisitorCounter />
          </div>
           <a href="https://github.com/ln6ie/Raqeem-Render" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] px-3.5 py-1.5 text-xs font-medium text-[#64748B] transition-colors hover:bg-[#F8FAFC]">
            <img src="/github.svg" alt="GitHub" className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 pt-36 pb-20 text-center">
        <h1 className="text-6xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.05] sm:text-7xl">
          لقطات شاشة بانورامية
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-[#86868b] leading-relaxed">
          صمم لقطات شاشتك لمتجر التطبيقات بأسلوب بانورامي متكامل. أداة خفيفة، دقيقة، وسريعة.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/editor"
            className="rounded-full bg-[#007AFF] px-8 py-3 text-base font-medium text-white transition-all hover:bg-[#0066D6] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25">
            ابدأ الآن
          </Link>
          <a href="https://github.com/ln6ie/Raqeem-Render" target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-[#007AFF] px-8 py-3 text-base font-medium text-white transition-all hover:bg-[#0066D6] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25">
            كود المشروع
          </a>
        </div>
      </section>

      <section className="pb-28">
        <div className="flex gap-6 overflow-x-auto px-10 pb-6 scrollbar-none md:justify-center">
          {mockScreens.map((s, i) => (
            <div key={i}
              className="relative h-[400px] w-60 flex-shrink-0 overflow-hidden rounded-3xl border border-[#E2E8F0]/60 bg-white shadow-sm">
              <div className="absolute inset-0 opacity-[0.03]" style={{ background: s.bg }} />
              <div className="relative flex h-full flex-col justify-between p-6">
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-[#1d1d1f]">{s.title}</h3>
                  <p className="text-sm text-[#86868b] leading-relaxed">{s.subtitle}</p>
                </div>
                <div className="mx-auto h-40 w-5/6 rounded-2xl bg-[#F5F5F7] border border-[#E2E8F0]/40 flex items-start justify-center pt-3">
                  <span className="h-1.5 w-8 rounded-full bg-[#D1D5DB]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-[#F5F5F7] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-14 sm:grid-cols-3">
            {[
              { icon: Layers, title: 'تنسيق بانورامي', desc: 'اعرض تطبيقك في واجهة من 5 شاشات متصلة لتقديم تجربة متناسقة وجذابة.' },
              { icon: Edit3, title: 'تحرير مباشر', desc: 'عدّل النصوص بسهولة بمجرد النقر عليها مباشرة على الشاشة دون تعقيد الأشرطة الجانبية.' },
              { icon: Download, title: 'دقة تصدير فائقة', desc: 'احصل على لقطات شاشتك بدقة 1242x2688 بكسل جاهزة للرفع المباشر.' },
            ].map((item) => (
              <div key={item.title} className="space-y-4">
                <item.icon className="h-6 w-6 text-[#86868b]" />
                <h3 className="text-base font-semibold text-[#1d1d1f]">{item.title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

const mockScreens = [
  { bg: '#1d1d1f', title: 'الواجهة الأولى', subtitle: 'هاتف مدمج من الأسفل' },
  { bg: '#86868b', title: 'تحليل البيانات', subtitle: 'إحصائيات متكاملة فوراً' },
  { bg: '#1d1d1f', title: 'الأمان المالي', subtitle: 'تشفير كامل لبياناتك' },
  { bg: '#86868b', title: 'أكاديمية رقيم', subtitle: 'دروس تفاعلية مبسطة' },
  { bg: '#1d1d1f', title: 'تداول ذكي', subtitle: 'أدوات تحليلية مبتكرة' },
]
