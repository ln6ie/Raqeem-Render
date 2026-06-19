'use client'

import { useState, useEffect, useCallback } from 'react'
import type { DesignState } from '@/types'
import { getTemplateById, TEMPLATES } from '@/lib/templates'
import { templateToDesignState } from '@/actions/parseTemplate'
import Sidebar from '@/components/editor/Sidebar'
import CanvasArea from '@/components/editor/CanvasArea'

const FALLBACK_TEMPLATE = TEMPLATES[0]

export default function EditorPage() {
  const [design, setDesign] = useState<DesignState | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const templateId = params.get('template')
    const template = templateId ? getTemplateById(templateId) : null
    const initial = template ?? FALLBACK_TEMPLATE
    setDesign(templateToDesignState(initial))
  }, [])

  const handleDesignChange = useCallback((updates: Partial<DesignState>) => {
    setDesign((prev) => prev ? { ...prev, ...updates } : prev)
  }, [])

  const handleTemplateSelect = useCallback((template: typeof FALLBACK_TEMPLATE) => {
    setDesign(templateToDesignState(template))
  }, [])

  if (!design) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#1B3A6B]" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-65px-53px)] flex-col lg:flex-row">
      <Sidebar
        design={design}
        onDesignChange={handleDesignChange}
        onTemplateSelect={handleTemplateSelect}
      />
      <div className="flex flex-1 items-center justify-center overflow-auto bg-[#F8FAFC] p-6">
        <CanvasArea design={design} />
      </div>
    </div>
  )
}
