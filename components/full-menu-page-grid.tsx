'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { MenuPageImage } from '@/lib/places'
import MenuImageCarouselModal from '@/components/menu-image-carousel-modal'

export default function FullMenuPageGrid({
  images,
  restaurantName,
}: {
  images: readonly MenuPageImage[]
  restaurantName: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        {images.map((page, index) => (
          <article key={page.src} className="rounded border border-ink/10 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-ink/45">Page {index + 1}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-ink/35">{index + 1} / {images.length}</p>
            </div>
            <button
              type="button"
              aria-label={`Open ${restaurantName} menu page ${index + 1} in full view`}
              className="relative block aspect-[3/4] w-full cursor-pointer overflow-hidden rounded bg-sand text-left transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/35"
              onClick={() => setOpenIndex(index)}
            >
              <Image
                src={page.src}
                alt={page.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
                priority={index === 0}
              />
            </button>
          </article>
        ))}
      </div>

      <MenuImageCarouselModal
        images={images}
        initialIndex={openIndex ?? 0}
        open={openIndex !== null}
        restaurantName={restaurantName}
        onClose={() => setOpenIndex(null)}
        immersive
      />
    </>
  )
}
