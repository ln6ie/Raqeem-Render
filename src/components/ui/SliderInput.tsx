'use client'

interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
}

export default function SliderInput({ label, value, min, max, step = 1, unit, onChange }: SliderInputProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">{label}</label>
        <span className="text-sm font-medium text-[#0F172A]">
          {value}{unit ?? ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#E2E8F0] accent-[#1B3A6B] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1B3A6B] [&::-webkit-slider-thumb]:shadow-sm"
        aria-label={label}
      />
    </div>
  )
}
