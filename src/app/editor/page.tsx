'use client'

import { useState, useRef, useCallback } from 'react'
import type Konva from 'konva'
import { createEmptyProject, updateScreen, getActiveScreen } from '@/actions/projectState'
import { exportPanoramicSet } from '@/actions/exportCanvas'
import TopFloatingDashboard from '@/components/editor/TopFloatingDashboard'
import PanoramicCanvasWorkspace from '@/components/editor/PanoramicCanvasWorkspace'
import type { AppScreen } from '@/types'

// الصفحة الرئيسية للمحرر لإدارة الشاشات الخمس
export default function EditorPage() {
  const [project, setProject] = useState(createEmptyProject)
  
  const stageRefs = [
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
  ]

  const handleUpdateScreen = useCallback(
    (screenId: string, updates: Partial<AppScreen>) => {
      setProject((prev) => updateScreen(prev, screenId, updates))
    },
    [],
  )

  const handleExportAll = useCallback(() => {
    exportPanoramicSet(stageRefs)
  }, [stageRefs])

  const activeScreen = getActiveScreen(project)

  return (
    <div className="relative flex h-screen w-screen flex-col bg-[#F8FAFC] overflow-hidden pt-28">
      <TopFloatingDashboard
        project={project}
        activeScreen={activeScreen}
        onChange={setProject}
        onUpdateScreen={handleUpdateScreen}
        onExportAll={handleExportAll}
      />
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <PanoramicCanvasWorkspace
          project={project}
          stageRefs={stageRefs}
          onChange={setProject}
        />
      </div>
    </div>
  )
}
