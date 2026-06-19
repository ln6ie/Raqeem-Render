'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { validateFile, readFileAsDataURL } from '@/actions/uploadHelpers'

interface UploadZoneProps {
  onUpload: (dataUrl: string) => void
  currentPreview?: string | null
  label: string
}

export default function UploadZone({ onUpload, currentPreview, label }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback(async (file: File) => {
    setError(null)
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }
    try {
      const dataUrl = await readFileAsDataURL(file)
      onUpload(dataUrl)
    } catch {
      setError('Failed to read file.')
    }
  }, [onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setDragging(false), [])

  const handleClick = () => inputRef.current?.click()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">{label}</label>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-all duration-200 ${dragging ? 'border-[#3B82F6] bg-[#E8EEF8]' : 'border-[#E2E8F0] hover:border-[#3B82F6] hover:bg-[#F8FAFC]'}`}
      >
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleInputChange} />
        {currentPreview ? (
          <div className="relative w-full">
            <img src={currentPreview} alt="Upload preview" className="mx-auto max-h-28 rounded-lg object-contain" />
            <p className="mt-2 text-center text-xs text-[#64748B]">Click to change</p>
          </div>
        ) : (
          <>
            <Upload className="mb-2 h-6 w-6 text-[#64748B]" />
            <p className="text-center text-xs text-[#64748B]">Drop an image here or click to browse</p>
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
