'use client'

import { useEffect, useRef, useState } from 'react'
import type { InlineTextOverlayProps } from '@/types'

// نافذة منبثقة لتحرير النصوص 
export default function InlineTextOverlay({
  value,
  top,
  left,
  width,
  fontSize,
  onChange,
  onClose,
}: InlineTextOverlayProps) {
  const [text, setText] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onChange(text)
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleBlur = () => {
    onChange(text)
    onClose()
  }

  return (
    <div
      className="absolute z-[99] rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xl transition-all duration-200"
      style={{
        top: '50%',
        left: '50%',
        width: '90%',
        maxWidth: '300px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        rows={2}
        className="w-full resize-none rounded-lg border-0 bg-transparent p-1 focus:outline-none focus:ring-0 text-slate-800 font-semibold"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: '1.2',
          direction: 'rtl',
        }}
      />
      <div className="mt-1 flex items-center justify-between text-[9px] text-slate-400">
        <span>اضغط Enter للحفظ</span>
        <span>Esc للإلغاء</span>
      </div>
    </div>
  )
}
