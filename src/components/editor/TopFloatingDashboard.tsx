'use client'

import type { TopFloatingDashboardProps } from '@/types'
import { Download, Eye, EyeOff, Palette, Layers } from 'lucide-react'
import { applyTheme } from '@/actions/projectState'
import { colorToHex, parseGradientColors } from '@/actions/canvasHelpers'
import { PANORAMIC_THEMES } from '@/lib/templates'

import { RaqeemLogo } from '@/components/ui/Logo'
import Link from 'next/link'

const PRESET_GRADIENTS = [
  'linear-gradient(135deg, #0a1128 0%, #1c2541 100%)',
  'linear-gradient(135deg, #1c2541 0%, #3a506b 100%)',
  'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)',
  'linear-gradient(135deg, #0f4c81 0%, #1f3a52 100%)',
  'linear-gradient(135deg, #0a1128 0%, #007AFF 100%)',
]

// لوحة تحكم علوية بتنسيق مرتب وراقي جدا
export default function TopFloatingDashboard({
  project,
  activeScreen,
  onChange,
  onUpdateScreen,
  onExportAll,
}: TopFloatingDashboardProps) {
  const activeColorMatches = activeScreen?.backgroundColor.match(/#(?:[0-9a-fA-F]{3,4}){1,2}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g) || ['#4f46e5']
  const activeMainColor = colorToHex(activeColorMatches[0] || '#4f46e5')

  return (
    <div
      dir="rtl"
      className="fixed top-4 left-1/2 z-50 flex w-[95%] max-w-6xl -translate-x-1/2 flex-col gap-2 rounded-2xl border border-slate-100/80 bg-white/90 p-2 px-3 shadow-xl backdrop-blur-lg transition-all md:flex-row md:items-center md:justify-between md:p-2.5 md:px-4"
    >
      {/* اليمين: اللوجو والتصدير */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100/60 pb-2 md:border-b-0 md:pb-0 md:justify-start">
        <div className="flex items-center gap-2 md:border-l md:border-slate-200/80 md:pl-3">
          <Link href="/" className="flex items-center gap-1.5 transition-transform hover:scale-105">
            <RaqeemLogo size={28} />
            <span className="text-xs font-black tracking-tight text-slate-900 font-sans whitespace-nowrap md:hidden">Raqeem Render</span>
          </Link>
        </div>
        <button
          type="button"
          onClick={onExportAll}
          className="flex items-center gap-1 rounded-full bg-[#007AFF] px-3.5 py-1.5 text-[10px] font-semibold text-white transition-all hover:bg-[#0066D6] shadow-md shadow-blue-500/20 md:px-5 md:py-2 md:text-xs"
        >
          <Download className="h-3 w-3 md:h-3.5 md:w-3.5" />
          <span>تصدير</span>
        </button>
      </div>

      {/* شريط الأدوات بالتمرير الأفقي للهاتف */}
      <div className="flex items-center gap-4 overflow-x-auto overflow-y-hidden py-1 scrollbar-none md:overflow-visible md:py-0 md:gap-6 touch-pan-x">
        {/* اختيار القالب */}
        <div className="flex flex-shrink-0 items-center gap-1.5">
          <span className="text-[9px] font-bold text-slate-900 md:text-[10px]">المظهر</span>
          <select
            value={project.activeThemeId || ''}
            onChange={(e) => {
              const theme = PANORAMIC_THEMES.find(t => t.id === e.target.value)
              if (theme) onChange(applyTheme(project, theme))
            }}
            className="rounded-full border border-slate-200 bg-slate-50/50 px-2 py-1 text-[9px] font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-300 cursor-pointer md:px-3 md:text-[10px]"
          >
            <option value="" disabled>اختر قالباً...</option>
            {PANORAMIC_THEMES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {activeScreen && (
          <div className="flex flex-shrink-0 items-center gap-4 border-r border-slate-100 pr-4 md:gap-6 md:pr-6">
            {/* تخصيص خلفية الشاشة */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-900 md:text-[10px]">الخلفية</span>
              <div className="flex items-center gap-1">
                {PRESET_GRADIENTS.map((grad, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onUpdateScreen(activeScreen.id, { backgroundColor: grad })}
                    className={`h-3.5 w-3.5 rounded-full border transition-all md:h-4.5 md:w-4.5 ${
                      activeScreen.backgroundColor === grad ? 'ring-2 ring-slate-800 scale-110' : 'border-slate-200 hover:scale-105'
                    }`}
                    style={{ background: grad }}
                  />
                ))}
                <div className="relative h-3.5 w-3.5 rounded-full border border-slate-200 bg-slate-50 hover:scale-105 flex items-center justify-center cursor-pointer md:h-4.5 md:w-4.5">
                  <Palette className="h-2 w-2 text-slate-700 md:h-2.5 md:w-2.5" />
                  <input
                    type="color"
                    value={activeMainColor}
                    onChange={(e) => onUpdateScreen(activeScreen.id, { backgroundColor: e.target.value })}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>

            {/* تخصيص ألوان النصوص */}
            <div className="flex items-center gap-2 border-r border-slate-100 pr-4 md:gap-3 md:pr-6">
              <span className="text-[9px] text-slate-900 font-bold md:text-[10px]">النصوص</span>
              
              <div className="flex items-center gap-1">
                <span className="text-[8px] text-slate-900 md:text-[9px]">عنوان</span>
                <div className="relative h-3.5 w-3.5 rounded-full border border-slate-200 md:h-4 md:w-4" style={{ backgroundColor: project.globalTitleColor }}>
                  <input
                    type="color"
                    value={project.globalTitleColor}
                    onChange={(e) => onChange({ ...project, globalTitleColor: e.target.value })}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 pr-1 border-r border-slate-100">
                <span className="text-[8px] text-slate-900 md:text-[9px]">فرعي</span>
                <div className="relative h-3.5 w-3.5 rounded-full border border-slate-200 md:h-4 md:w-4" style={{ backgroundColor: project.globalSubtitleColor }}>
                  <input
                    type="color"
                    value={project.globalSubtitleColor}
                    onChange={(e) => onChange({ ...project, globalSubtitleColor: e.target.value })}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* خيارات الجهاز والبرواز */}
        <div className="flex flex-shrink-0 items-center gap-3 border-r border-slate-100 pr-4 md:pr-0 md:border-r-0">
          {/* اختيار موديل الجهاز */}
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-slate-900 md:text-[10px]">الجهاز</span>
            <select
              value={project.globalDeviceType}
              onChange={(e) => onChange({ ...project, globalDeviceType: e.target.value as any })}
              className="rounded-full border border-slate-200 bg-slate-50/50 px-2 py-1 text-[9px] font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-300 cursor-pointer md:px-3 md:text-[10px]"
            >
              <option value="iphone-pro">آيفون برو</option>
              <option value="iphone-classic">آيفون نوتش</option>
              <option value="android-ultra">أندرويد ألترا</option>
              <option value="android-punch">أندرويد دائري</option>
            </select>
          </div>

          {/* لون الإطار */}
          <div className="flex items-center border-r border-slate-100 pr-2 md:pr-3">
            <div className="flex gap-0.5 bg-slate-100/80 p-0.5 rounded-full md:gap-1">
              {(['titanium', 'black', 'white'] as const).map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange({ ...project, globalFrameColor: color })}
                  className={`rounded-full px-2.5 py-0.5 text-[8px] font-semibold transition-all md:px-3 md:text-[9px] ${
                    project.globalFrameColor === color
                      ? 'bg-[#007AFF] text-white shadow-sm'
                      : 'text-slate-900 hover:text-slate-950 font-semibold'
                  }`}
                >
                  {color === 'titanium' ? 'تيتانيوم' : color === 'black' ? 'أسود' : 'أبيض'}
                </button>
              ))}
            </div>
          </div>

          {/* إظهار/إخفاء الإطار */}
          <button
            type="button"
            onClick={() => onChange({ ...project, showDeviceFrame: !project.showDeviceFrame })}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[9px] font-semibold transition-all md:px-3.5 md:text-[10px] ${
              project.showDeviceFrame
                ? 'border-[#007AFF] bg-[#007AFF] text-white shadow-sm'
                : 'border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            {project.showDeviceFrame ? <Eye className="h-2.5 w-2.5 md:h-3 md:w-3" /> : <EyeOff className="h-2.5 w-2.5 md:h-3 md:w-3" />}
            <span>الإطار</span>
          </button>
        </div>
      </div>
    </div>
  )
}
