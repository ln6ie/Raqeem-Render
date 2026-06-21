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

  // دالة الرفع التي تتعامل مباشرة مع أحداث HTML لمنع تداخل اللمس
  const handleUploadNativeClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation() // منع التداخل مع أحداث الكانفاس
    onClick()
    if (fileRef.current) fileRef.current.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) onUpload(await readFileAsDataURL(f))
    // تفريغ المدخل ليسمح برفع نفس الصورة مرة أخرى إذا أراد المستخدم
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
        
        {/* إذا لم تكن هناك صورة، نعرض زر رفع كبير */}
        {!screen.screenshotUrl ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={handleUploadNativeClick}
              onTouchEnd={(e) => { e.preventDefault(); handleUploadNativeClick(e); }}
              className="pointer-events-auto flex flex-col items-center justify-center gap-2 bg-blue-500/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-xl hover:bg-blue-600 transition-all active:scale-95"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <span className="font-bold">اضغط لرفع الصورة</span>
            </button>
          </div>
        ) : (
          /* إذا كانت الصورة موجودة نعرض زر استبدال صغير في الزاوية */
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
             <button
              type="button"
              onClick={handleUploadNativeClick}
              onTouchEnd={(e) => { e.preventDefault(); handleUploadNativeClick(e); }}
              className="pointer-events-auto flex items-center gap-2 bg-slate-900/70 backdrop-blur-md text-white px-3 py-2 rounded-xl shadow-lg hover:bg-slate-900 transition-all active:scale-95 text-xs font-semibold"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
               تغيير الصورة
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
          screen={screen} 
          project={project} 
          scale={scale}
          screenshotImg={screenshotImg} 
          derived={v}
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
