import type Konva from 'konva'
import { IPHONE_SPECS, PREVIEW_WIDTH } from '@/lib/appleSpecs'

export function exportAsPNG(
  stageRef: React.RefObject<Konva.Stage | null>,
  deviceSize: string,
  filename?: string
): void {
  const stage = stageRef.current
  if (!stage) return

  const spec = IPHONE_SPECS[deviceSize]
  if (!spec) return

  const pixelRatio = spec.width / PREVIEW_WIDTH
  const dataURL = stage.toDataURL({ pixelRatio, mimeType: 'image/png' })
  const link = document.createElement('a')
  link.download = filename ?? `raqeemframe-${Date.now()}.png`
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
