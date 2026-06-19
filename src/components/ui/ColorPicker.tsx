'use client'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
  presets?: string[]
}

const DEFAULT_PRESETS = ['#1B3A6B', '#2952A3', '#3B82F6', '#0F172A', '#FFFFFF', '#10B981']

export default function ColorPicker({ label, value, onChange, presets = DEFAULT_PRESETS }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-10 w-10 cursor-pointer opacity-0"
            aria-label={label}
          />
          <div
            className="h-10 w-10 rounded-xl border border-[#E2E8F0] shadow-sm"
            style={{ backgroundColor: value }}
          />
        </div>
        <span className="font-mono text-sm text-[#64748B]">{value}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {presets.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`h-7 w-7 rounded-lg border border-[#E2E8F0] transition-all duration-200 hover:scale-110 ${value === color ? 'ring-2 ring-[#3B82F6] ring-offset-1' : ''}`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  )
}
