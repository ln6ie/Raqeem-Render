'use client'

import { useEffect, useState } from 'react'

export function VisitorCounter({ className = 'text-white' }: { className?: string }) {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    // حساب للزوار عبر خدمة CounterAPI
    const namespace = 'raqeemframe'
    const key = 'visits'
    const upUrl = `https://api.counterapi.dev/v1/${namespace}/${key}/up`
    const getUrl = `https://api.counterapi.dev/v1/${namespace}/${key}/`

    async function getGlobalCount() {
      const hasVisited = sessionStorage.getItem('rq_has_visited')
      const targetUrl = !hasVisited ? upUrl : getUrl

      try {
        const res = await fetch(targetUrl)
        if (res.ok) {
          const data = await res.json()
          if (data && typeof data.count === 'number') {
            setVisitorCount(data.count)
            sessionStorage.setItem('rq_has_visited', 'true')
          }
        }
      } catch (e) {
        console.error('CounterAPI error:', e)
      }
    }

    getGlobalCount()
  }, [])

  return (
    <span className={`font-bold ${className}`}>
      عدد الزوار: {visitorCount}
    </span>
  )
}
