'use client'

import Link from 'next/link'
import { TEMPLATES } from '@/lib/templates'

export default function TemplateGrid() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#0F172A]">Choose a Template</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <Link key={tpl.id} href={`/editor?template=${tpl.id}`}>
              <div className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                <div className="aspect-[5/9] overflow-hidden bg-[#F8FAFC]">
                  <img
                    src={tpl.thumbnail}
                    alt={tpl.name}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#0F172A]">{tpl.name}</h3>
                  <p className="mt-1 text-sm text-[#64748B] capitalize">{tpl.background.type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
