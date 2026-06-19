'use client'

// اللوغو الرسمي لـ رقيم ريندر (Raqeem Render) مع لمسة أكسنت صفراء متوهجة
export function RaqeemLogo({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Raqeem Logo"
    >
      {/* درع خارجي أنيق مقتبس من التصميم الرسمي */}
      <circle cx="256" cy="256" r="220" stroke="#007AFF" strokeWidth="12" fill="none" opacity="0.9" />

      {/* المونوغرام الفاخر لحرف R المعتمد */}
      <path
        d="M170,140 C170,140 280,80 320,160 C360,230 300,300 240,310 C320,340 350,420 350,420"
        stroke="#007AFF"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M185,120 L185,420"
        stroke="#007AFF"
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />

      {/* لمسة الأكسنت الفاخرة: نقطة صفراء متوهجة في الجانب العلوي الأيمن من الشعار */}
      <circle cx="390" cy="120" r="28" fill="#FFE600" />
      <circle cx="390" cy="120" r="16" fill="#007AFF" />
    </svg>
  )
}
