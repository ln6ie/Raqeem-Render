const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please upload a PNG, JPEG, or WebP image.'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File is too large. Maximum size is 10MB.'
  }
  return null
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
