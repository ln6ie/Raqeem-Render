import type Konva from 'konva'

// تصدير الشاشات الخمس بأعلى دقة  خالية من البكسلة
export async function exportPanoramicSet(
  stageRefs: React.RefObject<Konva.Stage | null>[]
): Promise<void> {
  console.log("=== ULTRA-HQ EXPORT PANORAMIC SET STARTED ===");
  
  let index = 0
  for (const ref of stageRefs) {
    const stage = ref.current
    if (!stage) continue

    try {
      // تثبيت معامل التصدير بدقة 4X صافية لضمان خروج النصوص بوضوح الكريستال
      const pixelRatio = 4
      
      const dataURL = stage.toDataURL({ 
        pixelRatio: pixelRatio, 
        mimeType: 'image/png',
        quality: 1.0 // دقة كاملة غير مضغوطة
      })
      
      const link = document.createElement('a')
      link.download = `raqeem-ultra-screen-${index + 1}.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      index++
      await new Promise((resolve) => setTimeout(resolve, 800))
    } catch (error) {
      console.error(`Ultra-HQ Export failed at index ${index}:`, error)
    }
  }
  console.log("=== ULTRA-HQ EXPORT PANORAMIC SET FINISHED ===");
}

// تصدير شاشة فردية واحدة بأعلى دقة  خالية من البكسلة
export function exportSingleScreen(stage: Konva.Stage | null, filename = 'raqeem-screen.png'): void {
  if (!stage) return
  try {
    console.log("=== ULTRA-HQ EXPORT SINGLE SCREEN STARTED ===");
    // استخدام دقة بكسل مضاعفة 4X لضمان ثبات التفاصيل والألوان
    const pixelRatio = 4
    
    const dataURL = stage.toDataURL({ 
      pixelRatio: pixelRatio, 
      mimeType: 'image/png',
      quality: 1.0
    })
    
    const link = document.createElement('a')
    link.download = filename
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log("=== ULTRA-HQ EXPORT SINGLE SCREEN FINISHED ===");
  } catch (error) {
    console.error("Ultra-HQ Single Export failed:", error)
  }
}
