const MAX_FILE_SIZE = 25 * 1024 * 1024 
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please upload a PNG, JPEG, or WebP image.'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File is too large. Maximum size is 25MB.'
  }
  return null
}

// دالة محسنة للاحتفاظ بأعلى دقة ومعالجة الصورة بصيغة PNG غير مضغوطة
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        
        // الأبعاد القياسية 
        const TARGET_WIDTH = 1320
        const TARGET_HEIGHT = 2868
        
        canvas.width = TARGET_WIDTH
        canvas.height = TARGET_HEIGHT
        
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // تفعيل فلاتر تنعيم وتحسين جودة الصورة لمنع تشوه النصوص (Anti-aliasing)
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          
          // رسم الصورة لتمتد وتغطي الأبعاد القياسية بالكامل وبأعلى دقة
          ctx.drawImage(img, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)
        }
        
        // التصدير بصيغة image/png لمنع أي ضغط أو تدمير للجودة
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = () => reject(new Error('Failed to load image for ultra-res processing'))
      if (event.target?.result) {
        img.src = event.target.result as string
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
