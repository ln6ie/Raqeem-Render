'use client'

import type { PanoramicProjectState, AppScreen } from '@/types'
import { Download, Eye, EyeOff, Palette, Layers } from 'lucide-react'
import { applyTheme } from '@/actions/projectState'
import { PANORAMIC_THEMES } from '@/lib/templates'

import { RaqeemLogo } from '@/components/ui/Logo'

interface Props {
  project: PanoramicProjectState
  activeScreen: AppScreen | undefined
  onChange: (project: PanoramicProjectState) => void
  onUpdateScreen: (screenId: string, updates: Partial<AppScreen>) => void
  onExportAll: () => void
}

const PRESET_GRADIENTS = [
  'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
  'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
  'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
]

// تحويل صيغة اللون إلى Hex
function colorToHex(color: string): string {
  if (!color) return '#4f46e5'
  if (color.startsWith('#')) {
    if (color.length === 4 || color.length === 5) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
    }
    return color
  }
  if (color.startsWith('rgb')) {
    const rgbVals = color.match(/\d+/g)
    if (rgbVals && rgbVals.length >= 3) {
      const r = parseInt(rgbVals[0], 10)
      const g = parseInt(rgbVals[1], 10)
      const b = parseInt(rgbVals[2], 10)
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
    }
  }
  return '#4f46e5'
}

// لوحة تحكم علوية بتنسيق مرتب وراقي جدا
export default function TopFloatingDashboard({
  project,
  activeScreen,
  onChange,
  onUpdateScreen,
  onExportAll,
}: Props) {
  const activeColorMatches = activeScreen?.backgroundColor.match(/#(?:[0-9a-fA-F]{3,4}){1,2}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g) || ['#4f46e5']
  const activeMainColor = colorToHex(activeColorMatches[0] || '#4f46e5')

  return (
    <div
      dir="rtl"
      className="fixed top-5 left-1/2 z-50 flex w-[95%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-slate-100/80 bg-white/80 p-2.5 px-4 shadow-xl backdrop-blur-lg transition-all"
    >
      {/* اليمين: اللوجو والتصدير */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border-l border-slate-200/80 pl-3">
          <RaqeemLogo size={28} />
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            رقيم ريندر
          </span>
        </div>
        <button
          type="button"
          onClick={onExportAll}
          className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-slate-800 shadow-sm"
        >
          <Download className="h-3.5 w-3.5" />
          <span>تصدير</span>
        </button>
      </div>

      {/* الوسط: التحكم بالقالب وخيارات الشاشة المحددة */}
      <div className="flex items-center gap-6">
        {/* اختيار القالب */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400">المظهر</span>
          <select
            value={project.activeThemeId || ''}
            onChange={(e) => {
              const theme = PANORAMIC_THEMES.find(t => t.id === e.target.value)
              if (theme) onChange(applyTheme(project, theme))
            }}
            className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-1 text-[10px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-300 cursor-pointer"
          >
            <option value="" disabled>اختر قالباً...</option>
            {PANORAMIC_THEMES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {activeScreen && (
          <div className="flex items-center gap-6 border-r border-slate-100 pr-6">
            {/* تخصيص خلفية الشاشة النشطة */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400">الخلفية</span>
              <div className="flex items-center gap-1.5">
                {PRESET_GRADIENTS.map((grad, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onUpdateScreen(activeScreen.id, { backgroundColor: grad })}
                    className={`h-4.5 w-4.5 rounded-full border transition-all ${
                      activeScreen.backgroundColor === grad ? 'ring-2 ring-slate-800 scale-110' : 'border-slate-200 hover:scale-105'
                    }`}
                    style={{ background: grad }}
                  />
                ))}
                <div className="relative h-4.5 w-4.5 rounded-full border border-slate-200 bg-slate-50 hover:scale-105 flex items-center justify-center cursor-pointer">
                  <Palette className="h-2.5 w-2.5 text-slate-500" />
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
            <div className="flex items-center gap-3 border-r border-slate-100 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold">النصوص</span>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-slate-500">عنوان</span>
                  <div className="relative h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: project.globalTitleColor }}>
                    <input
                      type="color"
                      value={project.globalTitleColor}
                      onChange={(e) => onChange({ ...project, globalTitleColor: e.target.value })}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pr-2 border-r border-slate-100">
                  <span className="text-[9px] text-slate-500">فرعي</span>
                  <div className="relative h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: project.globalSubtitleColor }}>
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
          </div>
        )}
      </div>

      {/* اليسار: خيارات الجهاز والبرواز */}
      <div className="flex items-center gap-3">
        {/* اختيار موديل الجهاز */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400">الجهاز</span>
          <select
            value={project.globalDeviceType}
            onChange={(e) => onChange({ ...project, globalDeviceType: e.target.value as any })}
            className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-1 text-[10px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-300 cursor-pointer"
          >
            <option value="iphone-pro">آيفون برو</option>
            <option value="iphone-classic">آيفون نوتش</option>
            <option value="android-ultra">أندرويد ألترا</option>
            <option value="android-punch">أندرويد دائري</option>
          </select>
        </div>

        {/* لون الإطار */}
        <div className="flex items-center border-r border-slate-100 pr-3">
          <div className="flex gap-1 bg-slate-100/80 p-0.5 rounded-lg">
            {(['titanium', 'black', 'white'] as const).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onChange({ ...project, globalFrameColor: color })}
                className={`rounded-md px-2 py-0.5 text-[9px] font-semibold transition-all ${
                  project.globalFrameColor === color
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
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
          className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-semibold transition-all ${
            project.showDeviceFrame
              ? 'border-slate-200 bg-slate-50 text-slate-800'
              : 'border-slate-100 text-slate-400 hover:bg-slate-50'
          }`}
        >
          {project.showDeviceFrame ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          <span>الإطار</span>
        </button>
      </div>
    </div>
  )
}
