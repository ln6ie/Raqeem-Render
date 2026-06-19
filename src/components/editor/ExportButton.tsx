'use client'

import { Download } from 'lucide-react'

interface ExportButtonProps {
  onExport: () => void
  disabled?: boolean
}

export default function ExportButton({ onExport, disabled }: ExportButtonProps) {
  return (
    <button
      type="button"
      onClick={onExport}
      disabled={disabled}
      className="flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#2952A3] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="h-5 w-5" />
      Export PNG
    </button>
  )
}
