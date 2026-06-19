'use client'

import { useEffect, useState } from 'react'

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    // حساب حقيقي فريد للزوار يبدأ من 0 محلياً في المتصفح ليتوافق تماماً مع تصدير Netlify الثابت
    const storedCount = localStorage.getItem('rq_visitors_count')
    const hasVisited = sessionStorage.getItem('rq_has_visited')
    
    let currentCount = storedCount ? parseInt(storedCount, 10) : 0

    if (!hasVisited) {
      currentCount += 1
      localStorage.setItem('rq_visitors_count', currentCount.toString())
      sessionStorage.setItem('rq_has_visited', 'true')
    }

    setVisitorCount(currentCount)
  }, [])

  return (
    <span className="font-bold text-white">
      عدد الزوار: {visitorCount}
    </span>
  )
}
