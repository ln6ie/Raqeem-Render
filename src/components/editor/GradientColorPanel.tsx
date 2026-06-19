'use client'

import { Download } from 'lucide-react'
import { exportSingleScreen } from '@/actions/exportCanvas'
import type { GradientColorPanelProps } from '@/types'

export default function GradientColorPanel({
  colorTop, colorBottom, stageRef, screenId, onGradientChange,
}: GradientColorPanelProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute z-30 top-1/2 -right-4 -translate-y-1/2 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-xl ring-2 ring-white"
    >
      {[
        { color: colorTop, isTop: true, label: 'اللون العلوي' },
        { color: colorBottom, isTop: false, label: 'اللون السفلي' },
      ].map(({ color, isTop, label }) => (
        <div
          key={isTop ? 'top' : 'bottom'}
          onClick={(e) => e.stopPropagation()}
          className="relative h-5 w-5 rounded-full border border-slate-100 shadow-sm transition-transform hover:scale-110 cursor-pointer"
          style={{ backgroundColor: color }}
          title={label}
        >
          <input
            type="color"
            value={color}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation()
              const nextTop = isTop ? e.target.value : colorTop
              const nextBottom = isTop ? colorBottom : e.target.value
              onGradientChange(`linear-gradient(135deg, ${nextTop} 0%, ${nextBottom} 100%)`)
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          exportSingleScreen(stageRef.current, `raqeem-${screenId}.png`)
        }}
        className="h-5 w-5 rounded-full bg-slate-900 border border-slate-950 text-white shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
        title="تصدير هذه الشاشة"
      >
        <Download className="h-2.5 w-2.5" />
      </button>
    </div>
  )
}
