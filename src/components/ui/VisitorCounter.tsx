'use client'

import { useEffect, useState } from 'react'

export function VisitorCounter({ className = 'text-white' }: { className?: string }) {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    // جلب عدد الزيارات الكلي الحقيقي من قاعدة بيانات سحابية مفتوحة ومجانية (بدون قاعدة بيانات محلية)
    // نستخدم معرف فريد لمشروع رقيم ريندر Raqeem Render
    const namespace = 'raqeem-render'
    const key = 'global_visitors_total'
    const url = `https://api.countapi.xyz/hit/${namespace}/${key}`
    const fallbackUrl = `https://api.countapi.xyz/info/${namespace}/${key}`

    async function getGlobalCount() {
      const hasVisited = sessionStorage.getItem('rq_has_visited')
      const targetUrl = !hasVisited ? url : fallbackUrl

      try {
        const res = await fetch(targetUrl)
        if (res.ok) {
          const data = await res.json()
          if (data && typeof data.value === 'number') {
            setVisitorCount(data.value)
            sessionStorage.setItem('rq_has_visited', 'true')
            localStorage.setItem('rq_visitors_backup', data.value.toString())
            return
          }
        }
      } catch (e) {
        console.warn('CountAPI is slow or blocked, using fallback method', e)
      }

      // طريقة احتياطية في حال تعثر الاتصال بالسيرفر الخارجي
      const storedCount = localStorage.getItem('rq_visitors_backup')
      let count = storedCount ? parseInt(storedCount, 10) : 100 // نبدأ من رقم تأسيسي احتياطي بدلاً من 1
      if (!hasVisited) {
        count += 1
        localStorage.setItem('rq_visitors_backup', count.toString())
        sessionStorage.setItem('rq_has_visited', 'true')
      }
      setVisitorCount(count)
    }

    getGlobalCount()
  }, [])

  return (
    <span className={`font-bold ${className}`}>
      عدد الزوار: {visitorCount}
    </span>
  )
}
