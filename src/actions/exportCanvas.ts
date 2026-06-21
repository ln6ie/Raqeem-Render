import type Konva from 'konva'

// تصدير الشاشات الخمس بالكامل مع سجل تتبع تفصيلي
export async function exportPanoramicSet(
  stageRefs: React.RefObject<Konva.Stage | null>[]
): Promise<void> {
  console.log("=== EXPORT PANORAMIC SET STARTED ===");
  console.log(`Total stage references received: ${stageRefs.length}`);
  
  let index = 0
  for (const ref of stageRefs) {
    console.log(`Processing panoramic item at index: ${index}`);
    const stage = ref.current
    
    if (!stage) {
      console.warn(`Warning: Stage reference at index ${index} is null. Skipping this canvas.`);
      continue
    }

    try {
      const targetWidth = 1242
      const currentWidth = stage.width()
      const currentHeight = stage.height()
      
      console.log(`Stage geometry verified for index ${index}. Width: ${currentWidth}px, Height: ${currentHeight}px`);
      
      if (currentWidth === 0) {
        console.error(`Error: Stage width at index ${index} is zero. Cannot compute pixel ratio.`);
        continue
      }

      const pixelRatio = targetWidth / currentWidth
      console.log(`Computed pixel ratio for high-res rendering at index ${index}: ${pixelRatio}`);

      console.log(`Executing toDataURL() buffer read for stage index ${index}...`);
      const dataURL = stage.toDataURL({ 
        pixelRatio: pixelRatio, 
        mimeType: 'image/png',
        quality: 1.0
      })
      
      console.log(`DataURL successfully generated for index ${index}. Base64 string length: ${dataURL.length}`);

      console.log(`Constructing virtual DOM download link for index ${index}...`);
      const link = document.createElement('a')
      link.download = `raqeem-screen-${index + 1}.png`
      link.href = dataURL
      document.body.appendChild(link)
      
      console.log(`Triggering programmatic click for download at index ${index}...`);
      link.click()
      document.body.removeChild(link)
      console.log(`Download cycle completed successfully for stage index ${index}`);

      index++
      console.log("Throttling pipeline: Waiting 800ms before next canvas query to prevent browser spam block...");
      await new Promise((resolve) => setTimeout(resolve, 800))
    } catch (error) {
      console.error(`CRITICAL EXPORT ERROR encountered at stage index ${index}:`, error);
      if (error instanceof Error) {
        console.error(`Error Name: ${error.name}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Error Stack Trace: ${error.stack}`);
      }
    }
  }
  console.log("=== EXPORT PANORAMIC SET FINISHED ===");
}

// تصدير كارت فردي واحد بجودة عالية مع سجل تتبع تفصيلي
export function exportSingleScreen(stage: Konva.Stage | null, filename = 'raqeem-screen.png'): void {
  console.log("=== EXPORT SINGLE SCREEN STARTED ===");
  
  if (!stage) {
    console.error("Error: The single stage reference passed to the function is null or undefined.");
    return
  }

  try {
    const targetWidth = 1242
    const currentWidth = stage.width()
    const currentHeight = stage.height()
    
    console.log(`Single stage geometry verified. Current Canvas Width: ${currentWidth}px, Height: ${currentHeight}px`);

    if (currentWidth === 0) {
      console.error("Error: Single stage width is zero. Division by zero prevented, aborting operation.");
      return
    }

    const pixelRatio = targetWidth / currentWidth
    console.log(`Calculated custom scaling pixel ratio: ${pixelRatio}`);

    console.log("Invoking toDataURL() extraction on the individual canvas instance...");
    const dataURL = stage.toDataURL({ 
      pixelRatio: pixelRatio, 
      mimeType: 'image/png',
      quality: 1.0
    })
    
    console.log(`Individual DataURL generated successfully. Base64 string length: ${dataURL.length}`);

    const link = document.createElement('a')
    link.download = filename
    link.href = dataURL
    document.body.appendChild(link)
    
    console.log(`Dispatching virtual download click event for file: ${filename}`);
    link.click()
    document.body.removeChild(link)
    console.log("=== EXPORT SINGLE SCREEN FINISHED SUCCESSFULLY ===");
  } catch (error) {
    console.error("CRITICAL EXPORT ERROR inside single screen runtime context:", error);
    if (error instanceof Error) {
      console.error(`Error Name: ${error.name}`);
      console.error(`Error Message: ${error.message}`);
      console.error(`Error Stack Trace: ${error.stack}`);
    }
  }
}
