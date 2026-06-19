'use client'

import { useRef } from 'react'
import type { PanoramicProjectState, AppScreen } from '@/types'
import { updateScreen } from '@/actions/projectState'
import SingleCanvasInstance from './SingleCanvasInstance'
import type Konva from 'konva'

interface Props {
  project: PanoramicProjectState
  stageRefs: React.RefObject<Konva.Stage | null>[]
  onChange: (project: PanoramicProjectState) => void
}

// مساحة العمل الأفقية لعرض الشاشات الخمس جنبًا إلى جنب مع دعم التمرير الذكي
export default function PanoramicCanvasWorkspace({
  project,
  stageRefs,
  onChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // تحويل التمرير العمودي لعجلات الفأرة إلى تمرير أفقي
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current && e.deltaY !== 0) {
      containerRef.current.scrollLeft += e.deltaY
    }
  }

  const handleUpload = (screenId: string, dataUrl: string) => {
    onChange(updateScreen(project, screenId, { screenshotUrl: dataUrl }))
  }

  const handleUpdateText = (screenId: string, updates: Partial<AppScreen>) => {
    onChange(updateScreen(project, screenId, updates))
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="flex w-full items-center justify-start overflow-x-auto gap-8 px-16 py-10 scroll-smooth select-none"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(156, 163, 175, 0.4) transparent'
      }}
    >
      {project.screens.map((screen, index) => (
        <SingleCanvasInstance
          key={screen.id}
          screen={screen}
          project={project}
          isActive={screen.id === project.activeScreenId}
          onClick={() => onChange({ ...project, activeScreenId: screen.id })}
          onUpload={(url) => handleUpload(screen.id, url)}
          onUpdateText={(updates) => handleUpdateText(screen.id, updates)}
          stageRef={stageRefs[index]}
        />
      ))}
    </div>
  )
}

