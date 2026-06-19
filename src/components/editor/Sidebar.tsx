'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { DesignState, Template, SidebarSection } from '@/types'
import { IPHONE_SPECS } from '@/lib/appleSpecs'
import SectionContent from './SectionContent'

interface SidebarProps {
  design: DesignState
  onDesignChange: (updates: Partial<DesignState>) => void
  onTemplateSelect: (template: Template) => void
}

const SECTIONS: { id: SidebarSection; label: string }[] = [
  { id: 'template', label: 'Template' },
  { id: 'background', label: 'Background' },
  { id: 'text', label: 'Text' },
  { id: 'screenshot', label: 'Screenshot' },
  { id: 'logo', label: 'Logo' },
  { id: 'frame', label: 'Device Frame' },
]

export default function Sidebar({ design, onDesignChange, onTemplateSelect }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Set<SidebarSection>>(
    new Set(['template', 'background', 'text', 'screenshot'])
  )

  const toggleSection = (id: SidebarSection) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <aside className="w-full overflow-y-auto border-r border-[#E2E8F0] bg-white lg:w-[320px]">
      <div className="space-y-4 p-4">
        {SECTIONS.map((section) => {
          const isOpen = openSections.has(section.id)
          return (
            <div key={section.id} className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                  {section.label}
                </span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-[#64748B]" /> : <ChevronDown className="h-4 w-4 text-[#64748B]" />}
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-[#E2E8F0] px-4 py-4">
                  <SectionContent
                    section={section.id}
                    design={design}
                    onDesignChange={onDesignChange}
                    onTemplateSelect={onTemplateSelect}
                  />
                </div>
              )}
            </div>
          )
        })}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Device</label>
          <select
            value={design.selectedDevice}
            onChange={(e) => onDesignChange({ selectedDevice: e.target.value })}
            className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(IPHONE_SPECS).map(([key, spec]) => (
              <option key={key} value={key}>{spec.label} ({key})</option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  )
}
