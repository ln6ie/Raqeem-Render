'use client'

import type { Template } from '@/types'

interface TemplateCardProps {
  template: Template
  isActive: boolean
  onClick: () => void
}

export default function TemplateCard({ template, isActive, onClick }: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 overflow-hidden rounded-xl border bg-white transition-all duration-200 hover:shadow-md ${isActive ? 'ring-2 ring-[#1B3A6B] shadow-md' : 'border-[#E2E8F0]'}`}
      aria-label={`Select template: ${template.name}`}
    >
      <img
        src={template.thumbnail}
        alt={template.name}
        className="h-28 w-16 object-cover"
      />
      <div className="px-1.5 py-1">
        <p className="truncate text-[10px] font-medium text-[#0F172A]">{template.name}</p>
      </div>
    </button>
  )
}
