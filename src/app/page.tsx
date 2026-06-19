import Link from 'next/link'
import { Download, Edit3, Layers } from 'lucide-react'
import { RaqeemLogo } from '@/components/ui/Logo'
import { VisitorCounter } from '@/components/ui/VisitorCounter'

// الصفحة التعريفية للمشروع مفتوح المصدر بتصميم آبل المبسط
export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/50 text-neutral-900 font-sans tracking-tight pt-24">
      {/* الهيدر العلوي كبطاقة عائمة بحواف دائرية كاملة */}
      <header className="fixed top-5 left-1/2 z-50 flex w-[94%] sm:w-[90%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-slate-100/80 bg-white/80 p-2 sm:p-2.5 px-3 sm:px-6 shadow-xl backdrop-blur-lg transition-all">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap min-w-0">
          <RaqeemLogo size={32} className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 font-sans whitespace-nowrap">Raqeem Render</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* شارة المستخدمين باللون الأزرق الداكن الملكي 100% والنص باللون الأبيض */}
          <div className="flex items-center rounded-full bg-[#007AFF] px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-bold text-white shadow-sm whitespace-nowrap flex-shrink-0">
            <VisitorCounter />
          </div>
          <a
            href="https://github.com/ln6ie/RaqeemFrame"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-neutral-200 bg-white px-2.5 sm:px-3 py-1 sm:py-1 text-[10px] sm:text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-50 shadow-sm flex-shrink-0"
          >
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="inline">GitHub</span>
          </a>
        </div>
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
            href="https://github.com/ln6ie/RaqeemFrame"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#007AFF] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#007AFF]/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            كود المشروع
          </a>
        </div>
      </section>

      {/* قسم المعاينة البصرية المبسطة */}
      <section className="w-full pb-20 overflow-hidden">
        <div className="flex justify-start gap-6 overflow-x-auto py-6 px-8 scrollbar-none md:justify-center">
          {[
            {
              bg: 'linear-gradient(135deg, #007AFF 0%, #004499 100%)',
              badge: 'الواجهة الذكية',
              badgeBg: '#FFE600',
              badgeColor: '#0a0a0a',
              title: 'الواجهة الأولى',
              subtitle: 'هاتف مدمج من الأسفل',
              layout: 'text-bottom',
            },
            {
              bg: '#0b132b',
              badge: 'سرعة وكفاءة',
              badgeBg: '#007AFF',
              badgeColor: '#ffffff',
              title: 'تحليل البيانات',
              subtitle: 'إحصائيات متكاملة فورا',
              layout: 'text-top',
            },
            {
              bg: '#1c2541',
              badge: 'تصميم متناسق',
              badgeBg: '#FFE600',
              badgeColor: '#0a0a0a',
              title: 'الأمان المالي',
              subtitle: 'تشفير كامل لبياناتك',
              layout: 'text-top',
            },
            {
              bg: 'linear-gradient(135deg, #0056b3 0%, #002244 100%)',
              badge: 'تحديث فوري',
              badgeBg: '#ffffff',
              badgeColor: '#007AFF',
              title: 'أكاديمية رقيم',
              subtitle: 'دروس تفاعلية مبسطة',
              layout: 'text-top',
            },
            {
              bg: '#0a0f1d',
              badge: 'تصدير سهل',
              badgeBg: '#FFE600',
              badgeColor: '#0a0a0a',
              title: 'تداول ذكي',
              subtitle: 'أدوات تحليلية مبتكرة',
              layout: 'text-top',
            }
          ].map((screen, idx) => (
            <div
              key={idx}
              className="h-[320px] w-48 flex-shrink-0 rounded-3xl shadow-xl border border-white/10 flex flex-col justify-between p-4 transition-all hover:scale-[1.03] select-none text-white"
              style={{ background: screen.bg }}
            >
              {screen.layout === 'text-top' ? (
                <>
                  <div className="space-y-2 text-right">
                    {/* البادج الصغير المصغر */}
                    <div
                      className="inline-block rounded-full px-2 py-0.5 text-[8px] font-bold"
                      style={{ backgroundColor: screen.badgeBg, color: screen.badgeColor }}
                    >
                      {screen.badge}
                    </div>
                    <div className="text-[12px] font-extrabold">{screen.title}</div>
                    <div className="text-[8px] opacity-80">{screen.subtitle}</div>
                  </div>
                  {/* مجسم الهاتف المصغر */}
                  <div className="h-36 w-full rounded-t-2xl bg-white/15 border border-white/10 border-b-0 relative overflow-hidden">
                    <div className="mx-auto mt-1 h-1 w-8 bg-black/40 rounded-full" />
                  </div>
                </>
              ) : (
                <>
                  {/* مجسم الهاتف المصغر في الأعلى */}
                  <div className="h-36 w-full rounded-b-2xl bg-white/15 border border-white/10 border-t-0 relative overflow-hidden">
                    <div className="mx-auto mt-1 h-1.5 w-1.5 bg-white/20 rounded-full" />
                  </div>
                  <div className="space-y-2 text-right">
                    {/* البادج الصغير المصغر */}
                    <div
                      className="inline-block rounded-full px-2 py-0.5 text-[8px] font-bold"
                      style={{ backgroundColor: screen.badgeBg, color: screen.badgeColor }}
                    >
                      {screen.badge}
                    </div>
                    <div className="text-[12px] font-extrabold">{screen.title}</div>
                    <div className="text-[8px] opacity-80">{screen.subtitle}</div>
                  </div>
                </>
              )}
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
                احصل على لقطات شاشتك بدقة 1242x2688 بكسل جاهزة للرفع المباشر بجودة عالية.
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
