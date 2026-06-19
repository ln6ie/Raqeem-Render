import type Konva from 'konva'

// تصدير الشاشات الخمس بجودة عالية جدا
export async function exportPanoramicSet(
  stageRefs: React.RefObject<Konva.Stage | null>[]
): Promise<void> {
  let index = 0
  for (const ref of stageRefs) {
    const stage = ref.current
    if (!stage) continue

    const pixelRatio = 4
    const dataURL = stage.toDataURL({ pixelRatio, mimeType: 'image/png' })
    const link = document.createElement('a')
    link.download = `raqeem-screen-${index + 1}.png`
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    index++
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}

// تصدير شاشة واحدة بجودة عالية
export function exportSingleScreen(stage: Konva.Stage | null, filename = 'raqeem-screen.png'): void {
  if (!stage) return
  const pixelRatio = 4
  const dataURL = stage.toDataURL({ pixelRatio, mimeType: 'image/png' })
  const link = document.createElement('a')
  link.download = filename
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

