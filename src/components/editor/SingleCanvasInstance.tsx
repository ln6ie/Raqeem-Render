'use client'

import { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect, Circle, Text, Image as KonvaImage, Path } from 'react-konva'
import type Konva from 'konva'
import type { AppScreen, PanoramicProjectState } from '@/types'
import { readFileAsDataURL } from '@/actions/uploadHelpers'
import { exportSingleScreen } from '@/actions/exportCanvas'
import { Download } from 'lucide-react'
import InlineTextOverlay from './InlineTextOverlay'

interface Props {
  screen: AppScreen
  project: PanoramicProjectState
  isActive: boolean
  onClick: () => void
  onUpload: (dataUrl: string) => void
  onUpdateText: (updates: Partial<AppScreen>) => void
  stageRef: React.RefObject<Konva.Stage | null>
}

const FRAME_COLORS = {
  black: '#1a1a1a',
  white: '#f5f5f7',
  titanium: '#8e9eb5',
}

// الحصول على نصف قطر حواف الهاتف حسب نوعه
function getDeviceRadius(type: string) {
  if (type === 'android-ultra') return 22
  if (type === 'iphone-classic') return 130
  if (type === 'android-punch') return 94
  return 110
}

// تحويل أي صيغة لون (Hex أو RGB/RGBA) إلى صيغة Hex من 7 رموز
function colorToHex(color: string): string {
  if (!color) return '#4f46e5'
  if (color.startsWith('#')) {
    if (color.length === 4 || color.length === 5) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
    }
    return color.substring(0, 7)
  }
  if (color.startsWith('rgb')) {
    const rgbVals = color.match(/\d+/g)
    if (rgbVals && rgbVals.length >= 3) {
      const r = parseInt(rgbVals[0], 10)
      const g = parseInt(rgbVals[1], 10)
      const b = parseInt(rgbVals[2], 10)
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
    }
  }
  return '#4f46e5'
}

// رسم شاشة واحدة ومعالجة التفاعل معها
export default function SingleCanvasInstance({
  screen,
  project,
  isActive,
  onClick,
  onUpload,
  onUpdateText,
  stageRef,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [screenshotImg, setScreenshotImg] = useState<HTMLImageElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [editingField, setEditingField] = useState<'title' | 'subtitle' | 'badge' | null>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(0.22)
      } else {
        setScale(0.25)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screen.screenshotUrl) {
      setLoading(true)
      setError(false)
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.src = screen.screenshotUrl
      img.onload = () => {
        setScreenshotImg(img)
        setLoading(false)
      }
      img.onerror = () => {
        setScreenshotImg(null)
        setLoading(false)
        setError(true)
      }
    } else {
      setScreenshotImg(null)
      setLoading(false)
      setError(false)
    }
  }, [screen.screenshotUrl])

  const handleUploadClick = () => {
    onClick()
    fileRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) onUpload(await readFileAsDataURL(f))
  }

  // استخراج الألوان بصيغة Hex أو RGB/RGBA
  const colorMatches = screen.backgroundColor.match(/#(?:[0-9a-fA-F]{3,4}){1,2}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g) || ['#4f46e5']
  const colorTop = colorToHex(colorMatches[0] || '#4f46e5')
  const colorBottom = colorToHex(colorMatches[1] || colorMatches[0] || '#7c3aed')
  const frameColor = FRAME_COLORS[project.globalFrameColor] || FRAME_COLORS.titanium
  const deviceRadius = getDeviceRadius(project.globalDeviceType)

  const layout = screen.config?.layout || 'text-top'
  const isHideDevice = screen.config?.hideDevice || false
  const showDevice = project.showDeviceFrame && !isHideDevice
  const textAlign = screen.config?.textAlign || 'center'
  const titleX = textAlign === 'left' ? 80 : textAlign === 'right' ? 80 : 80
  const titleAlign = textAlign === 'left' ? 'left' : textAlign === 'right' ? 'right' : 'center'
  
  // الألوان تأخذ الأولوية من الـ config ثم من الإعدادات العامة
  const activeTitleColor = screen.config?.titleColor || project.globalTitleColor
  const activeSubtitleColor = screen.config?.subtitleColor || project.globalSubtitleColor

  let titleY = 140
  let subtitleY = 270
  let deviceY = 380
  let badgeY = 60

  if (layout === 'text-bottom') {
    deviceY = 80
    titleY = 2410
    subtitleY = 2530
    badgeY = 2330
  } else if (layout === 'hero-center') {
    titleY = 1170
    subtitleY = 1330
    badgeY = 1080
  }

  const decoration = screen.config?.decoration
  const badge = screen.config?.badge
  const badgeBg = screen.config?.badgeBg || '#000000'
  const badgeColor = screen.config?.badgeColor || '#ffffff'

  const colorStops = [0, colorTop, 1, colorBottom]

  return (
    <div
      onClick={onClick}
      style={{ touchAction: 'pan-x' }}
      className={`relative flex-shrink-0 rounded-2xl bg-white p-3 shadow-premium border transition-all duration-200 touch-pan-x ${
        isActive
          ? 'ring-4 ring-blue-500/40 border-blue-500'
          : 'border-slate-200/60 hover:shadow-xl'
      }`}
    >
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      
      <div className="relative overflow-hidden rounded-xl bg-slate-50 touch-pan-x" style={{ width: 1242 * scale, height: 2688 * scale, touchAction: 'pan-x' }}>
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-red-50 p-4 text-center">
            <span className="text-xs font-semibold text-red-500">فشل تحميل الصورة</span>
          </div>
        )}

        <Stage ref={stageRef} width={1242 * scale} height={2688 * scale} scaleX={scale} scaleY={scale} preventDefault={false} style={{ touchAction: 'pan-x' }}>
          <Layer listening={false}>
            <Rect 
              key={screen.backgroundColor}
              x={0} y={0} width={1242} height={2688}
              fillLinearGradientStartPoint={{ x: 0, y: 0 }}
              fillLinearGradientEndPoint={{ x: 0, y: 2688 }}
              fillLinearGradientColorStops={colorStops}
            />
            
            {decoration && decoration.type === 'path' && (
              <Path x={decoration.x} y={decoration.y} data={decoration.data} fill={decoration.fill} />
            )}
            {decoration && decoration.type === 'circle' && (
              <Circle x={decoration.x} y={decoration.y} radius={Number(decoration.data)} fill={decoration.fill} />
            )}
          </Layer>

          {!isHideDevice && (
            <Layer>
              {screenshotImg ? (
                <KonvaImage image={screenshotImg} x={103.5} y={deviceY} width={1035} height={2240} cornerRadius={deviceRadius} onClick={handleUploadClick} />
              ) : (
                <Rect x={103.5} y={deviceY} width={1035} height={2240} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth={4} dash={[20, 10]} cornerRadius={deviceRadius} onClick={handleUploadClick} />
              )}
            </Layer>
          )}

          {showDevice && (
            <Layer>
              <Rect x={103.5} y={deviceY} width={1035} height={2240} cornerRadius={deviceRadius} fill="transparent" stroke={frameColor}
                strokeWidth={
                  project.globalDeviceType === 'android-ultra' ? 18 :
                  project.globalDeviceType === 'android-punch' ? 22 :
                  project.globalDeviceType === 'iphone-classic' ? 28 : 24
                }
                onClick={handleUploadClick}
              />
              
              {project.globalDeviceType === 'iphone-pro' && (
                <Rect x={461} y={deviceY + 36} width={320} height={96} cornerRadius={48} fill="#000000" onClick={handleUploadClick} />
              )}
              {project.globalDeviceType === 'iphone-classic' && (
                <Rect x={461} y={deviceY} width={320} height={75} cornerRadius={[0, 0, 26, 26]} fill="#000000" onClick={handleUploadClick} />
              )}
              {(project.globalDeviceType === 'android-ultra' || project.globalDeviceType === 'android-punch') && (
                <Circle x={621} y={deviceY + 46} radius={20} fill="#000000" onClick={handleUploadClick} />
              )}
            </Layer>
          )}

          <Layer>
            {badge && (
              <>
                <Rect
                  x={titleX}
                  y={badgeY}
                  width={badge.length * 32 + 60}
                  height={90}
                  fill={badgeBg}
                  cornerRadius={45}
                  onClick={(e) => { e.cancelBubble = true; setEditingField('badge') }}
                />
                <Text
                  text={badge}
                  x={titleX}
                  y={badgeY + 18}
                  width={badge.length * 32 + 60}
                  fontSize={40}
                  fill={badgeColor}
                  fontStyle="bold"
                  fontFamily="Cairo"
                  align="center"
                  onClick={(e) => { e.cancelBubble = true; setEditingField('badge') }}
                />
              </>
            )}
            <Text
              text={screen.title}
              x={titleX}
              y={titleY}
              width={1082}
              fontSize={90}
              fill={activeTitleColor}
              fontStyle="bold"
              fontFamily="Cairo"
              align={titleAlign}
              onClick={(e) => { e.cancelBubble = true; setEditingField('title') }}
            />
            <Text
              text={screen.subtitle}
              x={titleX}
              y={subtitleY}
              width={1082}
              fontSize={52}
              fill={activeSubtitleColor}
              fontStyle="bold"
              fontFamily="Cairo"
              align={titleAlign}
              onClick={(e) => { e.cancelBubble = true; setEditingField('subtitle') }}
            />
          </Layer>
        </Stage>

        {editingField === 'badge' && (
          <InlineTextOverlay value={badge || ''} top={badgeY * scale + scale * 160} left={80 * scale} width={1082 * scale} fontSize={14}
            onChange={(val) => onUpdateText({ config: { ...(screen.config || { layout: 'text-top' }), badge: val } })} onClose={() => setEditingField(null)} />
        )}

        {editingField === 'title' && (
          <InlineTextOverlay value={screen.title} top={titleY * scale} left={80 * scale} width={1082 * scale} fontSize={20}
            onChange={(val) => onUpdateText({ title: val })} onClose={() => setEditingField(null)} />
        )}

        {editingField === 'subtitle' && (
          <InlineTextOverlay value={screen.subtitle} top={subtitleY * scale} left={80 * scale} width={1082 * scale} fontSize={14}
            onChange={(val) => onUpdateText({ subtitle: val })} onClose={() => setEditingField(null)} />
        )}
      </div>

      {/* حاوية رأسية عائمة للتدرج الثنائي على الحافة اليمنى للفريم المختار */}
      {isActive && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute z-30 top-1/2 -right-4 -translate-y-1/2 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-xl ring-2 ring-white"
        >
          {[
            { color: colorTop, isTop: true, label: 'اللون العلوي' },
            { color: colorBottom, isTop: false, label: 'اللون السفلي' }
          ].map(({ color, isTop, label }) => (
            <div
              key={isTop ? 'top' : 'bottom'}
              onClick={(e) => e.stopPropagation()}
              className="relative h-5 w-5 rounded-full border border-slate-100 shadow-sm transition-transform hover:scale-110 cursor-pointer"
              style={{ backgroundColor: color }}
              title={label}
            >
              <input
                type="color"
                value={color}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation()
                  const nextTop = isTop ? e.target.value : colorTop
                  const nextBottom = isTop ? colorBottom : e.target.value
                  const newGrad = `linear-gradient(135deg, ${nextTop} 0%, ${nextBottom} 100%)`
                  onUpdateText({ backgroundColor: newGrad })
                }}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </div>
          ))}
          {/* زر تحميل/تصدير الشاشة الفردية */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              exportSingleScreen(stageRef.current, `raqeem-${screen.id}.png`)
            }}
            className="h-5 w-5 rounded-full bg-slate-900 border border-slate-950 text-white shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            title="تصدير هذه الشاشة"
          >
            <Download className="h-2.5 w-2.5" />
          </button>
        </div>
      )}
    </div>
  )
}
