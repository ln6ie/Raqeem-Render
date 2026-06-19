'use client'

import { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group } from 'react-konva'
import type Konva from 'konva'
import type { DesignState } from '@/types'
import { PREVIEW_WIDTH, PREVIEW_HEIGHT, IPHONE_SPECS } from '@/lib/appleSpecs'
import ExportButton from './ExportButton'
import { exportAsPNG } from '@/actions/exportCanvas'

interface CanvasAreaProps {
  design: DesignState
}

const PHONE_PADDING = 12
const SCREEN_X = PHONE_PADDING
const SCREEN_Y = PHONE_PADDING + 50
const SCREEN_W = PREVIEW_WIDTH - PHONE_PADDING * 2
const SCREEN_H = PREVIEW_HEIGHT - PHONE_PADDING * 2 - 80

const FRAME_COLORS: Record<string, string> = {
  black: '#1C1C1E',
  white: '#F2F2F7',
  titanium: '#8E9EB5',
  none: 'transparent',
}

function getGradientProps(value: string) {
  const match = value.match(/linear-gradient\(180deg,\s*(#[0-9A-Fa-f]+)\s*0%,\s*(#[0-9A-Fa-f]+)\s*100%\)/)
  if (match) {
    return { start: match[1], end: match[2] }
  }
  return null
}

export default function CanvasArea({ design }: CanvasAreaProps) {
  const stageRef = useRef<Konva.Stage>(null)
  const [screenshotImg, setScreenshotImg] = useState<HTMLImageElement | null>(null)
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null)
  const [logoPos, setLogoPos] = useState({ x: design.logo.x, y: design.logo.y })

  useEffect(() => {
    if (design.screenshot.url) {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.src = design.screenshot.url
      img.onload = () => setScreenshotImg(img)
    } else {
      setScreenshotImg(null)
    }
  }, [design.screenshot.url])

  useEffect(() => {
    if (design.logo.url && design.logo.visible) {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.src = design.logo.url
      img.onload = () => setLogoImg(img)
    } else {
      setLogoImg(null)
    }
  }, [design.logo.url, design.logo.visible])

  useEffect(() => {
    setLogoPos({ x: design.logo.x, y: design.logo.y })
  }, [design.logo.x, design.logo.y])

  const showFrame = design.deviceFrame.show && design.deviceFrame.color !== 'none'
  const frameColor = FRAME_COLORS[design.deviceFrame.color] || '#1C1C1E'
  const gradient = getGradientProps(design.background.value)
  const isGradient = design.background.type === 'gradient' && gradient

  const textPos = design.text.title.position === 'top' ? 30 : PREVIEW_HEIGHT - 140

  const handleExport = () => {
    exportAsPNG(stageRef, design.selectedDevice)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E2E8F0]">
        <Stage
          ref={stageRef}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
        >
          <Layer>
            {isGradient ? (
              <Rect
                x={0}
                y={0}
                width={PREVIEW_WIDTH}
                height={PREVIEW_HEIGHT}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: 0, y: PREVIEW_HEIGHT }}
                fillLinearGradientColorStops={[0, gradient!.start, 1, gradient!.end]}
              />
            ) : (
              <Rect
                x={0}
                y={0}
                width={PREVIEW_WIDTH}
                height={PREVIEW_HEIGHT}
                fill={design.background.value}
              />
            )}
          </Layer>
          <Layer>
            {screenshotImg && (
              <KonvaImage
                image={screenshotImg}
                x={SCREEN_X}
                y={SCREEN_Y}
                width={SCREEN_W}
                height={SCREEN_H}
                listening={false}
              />
            )}
          </Layer>
          {showFrame && (
            <Layer>
              <Rect
                x={4}
                y={4}
                width={PREVIEW_WIDTH - 8}
                height={PREVIEW_HEIGHT - 8}
                cornerRadius={28}
                fill={frameColor}
                stroke={design.deviceFrame.color === 'titanium' ? '#6B7B9E' : frameColor}
                strokeWidth={2}
                shadowColor="#000"
                shadowBlur={design.deviceFrame.shadow * 30}
                shadowOpacity={design.deviceFrame.shadow * 0.5}
                shadowEnabled={design.deviceFrame.shadow > 0}
              />
            </Layer>
          )}
          <Layer>
            {logoImg && design.logo.visible && (
              <KonvaImage
                image={logoImg}
                x={logoPos.x}
                y={logoPos.y}
                width={design.logo.width}
                height={design.logo.width}
                draggable
                onDragEnd={(e) => setLogoPos({ x: e.target.x(), y: e.target.y() })}
              />
            )}
          </Layer>
          <Layer>
            <Text
              text={design.text.title.value}
              x={20}
              y={textPos}
              width={PREVIEW_WIDTH - 40}
              fontSize={design.text.title.fontSize}
              fill={design.text.title.color}
              fontStyle={design.text.title.fontWeight === '800' ? 'bold' : design.text.title.fontWeight === '700' ? 'bold' : 'normal'}
              fontFamily="Inter, sans-serif"
              align="center"
              listening={false}
            />
            <Text
              text={design.text.subtitle.value}
              x={20}
              y={textPos + design.text.title.fontSize + 12}
              width={PREVIEW_WIDTH - 40}
              fontSize={design.text.subtitle.fontSize}
              fill={design.text.subtitle.color}
              fontFamily="Inter, sans-serif"
              align="center"
              listening={false}
            />
          </Layer>
        </Stage>
      </div>
      <ExportButton onExport={handleExport} />
    </div>
  )
}
