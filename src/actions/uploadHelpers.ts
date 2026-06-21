const MAX_FILE_SIZE = 15 * 1024 * 1024 // رفعنا الحد إلى 15 ميجا ليتوافق مع كاميرات الهواتف
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please upload a PNG, JPEG, or WebP image.'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File is too large. Maximum size is 15MB.'
  }
  return null
}

// دالة تقوم بضغط الصورة وتقليص أبعادها فوراً لتجنب انهيار المتصفح في الهاتف
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 1242 // العرض المثالي لشاشات الآيفون في القوالب
        let width = img.width
        let height = img.height

        // تقليص الأبعاد إذا كانت أكبر من المطلوب مع الحفاظ على التناسق
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        
        // تحويل الصورة لـ JPEG مع ضغط 90% لتقليل الحجم بشكل دراماتيكي وتسريع الـ Konva
        resolve(canvas.toDataURL('image/jpeg', 0.9))
      }
      img.onerror = () => reject(new Error('Failed to load image for resizing'))
      if (event.target?.result) {
        img.src = event.target.result as string
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
