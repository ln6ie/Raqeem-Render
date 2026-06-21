'use client'

import { useRef, useEffect, useState } from 'react'
import type Konva from 'konva'
import type { AppScreen, SingleCanvasInstanceProps } from '@/types'
import { readFileAsDataURL } from '@/actions/uploadHelpers'
import { getScreenDerivedValues } from '@/actions/canvasHelpers'
import CanvasStageRenderer from './CanvasStageRenderer'
import GradientColorPanel from './GradientColorPanel'
import InlineTextOverlay from './InlineTextOverlay'

export default function SingleCanvasInstance({
  screen, project, isActive, onClick, onUpload, onUpdateText, stageRef,
}: SingleCanvasInstanceProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [screenshotImg, setScreenshotImg] = useState<HTMLImageElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [editingField, setEditingField] = useState<'title' | 'subtitle' | 'badge' | null>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const handleResize = () => setScale(window.innerWidth < 768 ? 0.22 : 0.25)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!screen.screenshotUrl) {
      setScreenshotImg(null); setLoading(false); setError(false)
      return
    }
    setLoading(true); setError(false)
    const img = new window.Image()
    if (screen.screenshotUrl.startsWith('http')) {
      img.crossOrigin = 'anonymous'
    }
    img.src = screen.screenshotUrl
    img.onload = () => { setScreenshotImg(img); setLoading(false) }
    img.onerror = () => { setScreenshotImg(null); setLoading(false); setError(true) }
  }, [screen.screenshotUrl])

  const handleUploadNativeClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    onClick()
    if (fileRef.current) fileRef.current.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) onUpload(await readFileAsDataURL(f))
    if (fileRef.current) fileRef.current.value = ''
  }

  const v = getScreenDerivedValues(screen, project)

  return (
    <div onClick={onClick}
      className={`relative flex-shrink-0 rounded-2xl bg-white p-3 shadow-premium border transition-all duration-200 ${
        isActive ? 'ring-4 ring-blue-500/40 border-blue-500' : 'border-slate-200/60 hover:shadow-xl'
      }`}
      style={{ touchAction: 'pan-x' }}
    >
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      <div className="relative overflow-hidden rounded-xl bg-slate-50" style={{ width: 1242 * scale, height: 2688 * scale }}>
        
        {/*  زر الرفع  */}
        {!screen.screenshotUrl ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={handleUploadNativeClick}
              onTouchEnd={(e) => { e.preventDefault(); handleUploadNativeClick(e); }}
              className="pointer-events-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 backdrop-blur-md text-white shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-200 active:scale-95"
              aria-label="Upload Screenshot"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        ) : (
          /*  زر استبدال الصورة  */
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
             <button
              type="button"
              onClick={handleUploadNativeClick}
              onTouchEnd={(e) => { e.preventDefault(); handleUploadNativeClick(e); }}
              className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md text-white shadow-lg hover:bg-slate-900 hover:scale-105 transition-all duration-200 active:scale-95"
              aria-label="Change Screenshot"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
               </svg>
             </button>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-none">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-red-50 p-4 text-center pointer-events-none">
            <span className="text-xs font-semibold text-red-500">فشل تحميل الصورة</span>
          </div>
        )}

        <CanvasStageRenderer
          screen={screen} project={project} scale={scale}
          screenshotImg={screenshotImg} derived={v}
          onUploadClick={() => {}}
          onEditField={setEditingField}
          stageRef={stageRef}
        />

        {editingField === 'badge' && (
          <InlineTextOverlay value={v.badge || ''}
            top={v.badgeY * scale + scale * 160} left={80 * scale} width={1082 * scale} fontSize={14}
            onChange={(val) => onUpdateText({ config: { ...(screen.config || { layout: 'text-top' }), badge: val } })}
            onClose={() => setEditingField(null)} />
        )}
        {editingField === 'title' && (
          <InlineTextOverlay value={screen.title} top={v.titleY * scale}
            left={80 * scale} width={1082 * scale} fontSize={20}
            onChange={(val) => onUpdateText({ title: val })} onClose={() => setEditingField(null)} />
        )}
        {editingField === 'subtitle' && (
          <InlineTextOverlay value={screen.subtitle} top={v.subtitleY * scale}
            left={80 * scale} width={1082 * scale} fontSize={14}
            onChange={(val) => onUpdateText({ subtitle: val })} onClose={() => setEditingField(null)} />
        )}
      </div>

      {isActive && (
        <GradientColorPanel
          colorTop={v.colorTop} colorBottom={v.colorBottom}
          stageRef={stageRef} screenId={screen.id}
          onGradientChange={(g) => onUpdateText({ backgroundColor: g })}
        />
      )}
    </div>
  )
}
