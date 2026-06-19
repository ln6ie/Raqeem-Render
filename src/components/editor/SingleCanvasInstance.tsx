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
  if (type === 'android-ultra') return 24
  if (type === 'iphone-classic') return 140
  if (type === 'android-punch') return 100
  return 120
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
  const [editingField, setEditingField] = useState<'title' | 'subtitle' | null>(null)

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

  let titleY = 150
  let subtitleY = 290
  let deviceY = 460
  let badgeY = 60

  if (layout === 'text-bottom') {
    deviceY = 80          // الهاتف يبدأ من الأعلى
    titleY = 2580         // النص بعد نهاية الهاتف (80+2388=2468)
    subtitleY = 2700
    badgeY = 2500
  } else if (layout === 'hero-center') {
    titleY = 1250
    subtitleY = 1420
    badgeY = 1160
  }

  const decoration = screen.config?.decoration
  const badge = screen.config?.badge
  const badgeBg = screen.config?.badgeBg || '#000000'
  const badgeColor = screen.config?.badgeColor || '#ffffff'

  // إنشاء نقاط التوقف للتدرج الثنائي لـ Konva
  const colorStops = [0, colorTop, 1, colorBottom]

  return (
    <div
      onClick={onClick}
      className={`relative flex-shrink-0 rounded-2xl bg-white p-3 shadow-premium border transition-all duration-200 ${
        isActive
          ? 'ring-4 ring-blue-500/40 border-blue-500'
          : 'border-slate-200/60 hover:shadow-xl'
      }`}
    >
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      
      <div className="relative overflow-hidden rounded-xl bg-slate-50" style={{ width: 330, height: 717 }}>
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

        <Stage ref={stageRef} width={330} height={717} scaleX={0.25} scaleY={0.25}>
          <Layer>
            <Rect 
              key={screen.backgroundColor}
              x={0} y={0} width={1320} height={2868}
              fillLinearGradientStartPoint={{ x: 0, y: 0 }}
              fillLinearGradientEndPoint={{ x: 0, y: 2868 }}
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
                <KonvaImage image={screenshotImg} x={110} y={deviceY} width={1100} height={2388} cornerRadius={deviceRadius} onClick={handleUploadClick} />
              ) : (
                <Rect x={110} y={deviceY} width={1100} height={2388} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth={4} dash={[20, 10]} cornerRadius={deviceRadius} onClick={handleUploadClick} />
              )}
            </Layer>
          )}

          {showDevice && (
            <Layer>
              <Rect x={110} y={deviceY} width={1100} height={2388} cornerRadius={deviceRadius} fill="transparent" stroke={frameColor}
                strokeWidth={
                  project.globalDeviceType === 'android-ultra' ? 18 :
                  project.globalDeviceType === 'android-punch' ? 22 :
                  project.globalDeviceType === 'iphone-classic' ? 28 : 24
                }
                onClick={handleUploadClick}
              />
              
              {project.globalDeviceType === 'iphone-pro' && (
                <Rect x={485} y={deviceY + 40} width={350} height={105} cornerRadius={52.5} fill="#000000" onClick={handleUploadClick} />
              )}
              {project.globalDeviceType === 'iphone-classic' && (
                <Rect x={485} y={deviceY} width={350} height={80} cornerRadius={[0, 0, 30, 30]} fill="#000000" onClick={handleUploadClick} />
              )}
              {(project.globalDeviceType === 'android-ultra' || project.globalDeviceType === 'android-punch') && (
                <Circle x={660} y={deviceY + 50} radius={22} fill="#000000" onClick={handleUploadClick} />
              )}
            </Layer>
          )}

          <Layer>
            {/* رسم البادج كرسالة ملصقة بشكل حبة دائرية */}
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
              width={1160}
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
              width={1160}
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
          <InlineTextOverlay value={badge || ''} top={badgeY * 0.25 + 40} left={80 * 0.25} width={1160 * 0.25} fontSize={14}
            onChange={(val) => onUpdateText({ config: { ...(screen.config || { layout: 'text-top' }), badge: val } })} onClose={() => setEditingField(null)} />
        )}

        {editingField === 'title' && (
          <InlineTextOverlay value={screen.title} top={titleY * 0.25} left={80 * 0.25} width={1160 * 0.25} fontSize={20}
            onChange={(val) => onUpdateText({ title: val })} onClose={() => setEditingField(null)} />
        )}

        {editingField === 'subtitle' && (
          <InlineTextOverlay value={screen.subtitle} top={subtitleY * 0.25} left={80 * 0.25} width={1160 * 0.25} fontSize={14}
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
