'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TEMPLATES } from '@/lib/templates'

export default function HeroSection() {
  const previews = TEMPLATES.slice(0, 3)

  return (
    <section className="flex flex-col items-center gap-10 px-6 py-20 text-center">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
          App Store Screenshots,
          <br />
          <span className="text-[#1B3A6B]">No Cost</span>
        </h1>
        <p className="mx-auto max-w-lg text-lg text-[#64748B]">
          Design beautiful, Apple-style screenshots for your app in minutes. No sign-up, no ads, just export.
        </p>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#2952A3]"
        >
          Start Designing
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
      <div className="flex items-end gap-4 sm:gap-6">
        {previews.map((tpl, i) => (
          <Link key={tpl.id} href={`/editor?template=${tpl.id}`}>
            <div
              className={`overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${i === 1 ? 'h-56' : 'h-44'} w-[90px] sm:w-[110px]`}
            >
              <img
                src={tpl.thumbnail}
                alt={tpl.name}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
