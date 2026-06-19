'use client'

import { useEffect, useState } from 'react'

let globalFetchPromise: Promise<number> | null = null

// حساب وعرض عدد زوار الموقع الكلي
export function VisitorCounter({ className = 'text-white' }: { className?: string }) {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    const namespace = process.env.NEXT_PUBLIC_COUNTER_NAMESPACE || ''
    const key = process.env.NEXT_PUBLIC_COUNTER_KEY || ''
    const upUrl = `https://api.counterapi.dev/v1/${namespace}/${key}/up`
    const getUrl = `https://api.counterapi.dev/v1/${namespace}/${key}/`

    async function getGlobalCount() {
      if (globalFetchPromise) {
        try {
          const count = await globalFetchPromise
          setVisitorCount(count)
        } catch (e) {}
        return
      }

      const hasVisited = sessionStorage.getItem('rq_has_visited')
      const targetUrl = !hasVisited ? upUrl : getUrl

      globalFetchPromise = (async () => {
        const res = await fetch(targetUrl)
        if (!res.ok) throw new Error('API fetch failed')
        const data = await res.json()
        if (data && typeof data.count === 'number') {
          if (!hasVisited) {
            sessionStorage.setItem('rq_has_visited', 'true')
          }
          return data.count
        }
        throw new Error('Invalid response format')
      })()

      try {
        const count = await globalFetchPromise
        setVisitorCount(count)
      } catch (e) {
        console.error('CounterAPI error:', e)
        globalFetchPromise = null
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
