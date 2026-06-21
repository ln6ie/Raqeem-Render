import type Konva from 'konva'

// تصدير الشاشات الخمس
export async function exportPanoramicSet(
  stageRefs: React.RefObject<Konva.Stage | null>[]
): Promise<void> {
  let index = 0
  for (const ref of stageRefs) {
    const stage = ref.current
    if (!stage) continue

    try {
      // حساب الـ ratio ديناميكياً بناءً على حجم الكانفاس الفعلي للحصول على دقة 1242
      const targetWidth = 1242
      const currentWidth = stage.width()
      const pixelRatio = targetWidth / currentWidth

      const dataURL = stage.toDataURL({ pixelRatio, mimeType: 'image/png' })
      const link = document.createElement('a')
      link.download = `raqeem-screen-${index + 1}.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      index++
      await new Promise((resolve) => setTimeout(resolve, 800))
    } catch (error) {
      console.error(`Failed to export screen ${index + 1}:`, error)
      alert("حدث خطأ أثناء التصدير. يرجى التأكد من إعطاء الصلاحيات للمتصفح.")
    }
  }
}

// تصدير شاشة واحدة  
export function exportSingleScreen(stage: Konva.Stage | null, filename = 'raqeem-screen.png'): void {
  if (!stage) return
  try {
    const targetWidth = 1242
    const pixelRatio = targetWidth / stage.width()
    
    const dataURL = stage.toDataURL({ pixelRatio, mimeType: 'image/png' })
    const link = document.createElement('a')
    link.download = filename
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error("Export failed:", error)
  }
}
