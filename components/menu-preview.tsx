'use client'

import Image from 'next/image'
import { ArrowRight, Images } from 'lucide-react'
import { useState } from 'react'
import type { MenuPageImage } from '@/lib/places'
import MenuImageCarouselModal from '@/components/menu-image-carousel-modal'

export default function MenuPreview({
  menuPages = [],
  restaurantName,
  fullMenuHref,
}: {
  menuPages?: readonly MenuPageImage[]
  restaurantName: string
  fullMenuHref: string
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const previewPages = menuPages.slice(0, 4)
  const canViewMenuPages = menuPages.length > 0

  const openMenuAtIndex = (index: number) => {
    setActiveIndex(index)
    setModalOpen(true)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-4 shadow-[0_20px_60px_rgba(19,19,19,0.06)] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-ink/45">Menu pages</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">Browse the complete menu.</h3>
          </div>

          <div className="lg:min-w-[220px] lg:max-w-[260px]">
            <button
              type="button"
              disabled={!canViewMenuPages}
              className="flex w-full items-center justify-between bg-coral px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em] text-ink transition hover:bg-coral/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 disabled:cursor-not-allowed disabled:opacity-45"
              onClick={() => openMenuAtIndex(0)}
            >
              <span className="flex items-center gap-2">
                <Images className="size-4" />
                View More
              </span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          {canViewMenuPages ? (
            <div className="grid w-full gap-3 text-left sm:grid-cols-2 xl:grid-cols-4">
              {previewPages.map((page, index) => {
                const isOverflowCard = index === previewPages.length - 1 && menuPages.length > previewPages.length

                return (
                  <button
                    key={page.src}
                    type="button"
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-sand text-left"
                    aria-label={isOverflowCard ? `Open ${restaurantName} full menu page` : `Open ${restaurantName} menu page ${index + 1}`}
                    onClick={() => {
                      if (isOverflowCard) {
                        openMenuAtIndex(0)
                        return
                      }

                      openMenuAtIndex(index)
                    }}
                  >
                    <Image
                      src={page.src}
                      alt={index === 0 ? `${restaurantName} menu preview` : ''}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {isOverflowCard && (
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/55 font-serif text-2xl text-white">
                        +{menuPages.length - previewPages.length}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-sand p-5 text-sm leading-6 text-ink/60">
              Full menu images can be added for this restaurant when they are available.
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-sm leading-6 text-ink/60 md:text-base">
          Flip through the restaurant&apos;s full menu pages to browse the complete selection without leaving the experience.
        </p>
      </div>

      <MenuImageCarouselModal
        images={menuPages}
        initialIndex={activeIndex}
        open={modalOpen}
        restaurantName={restaurantName}
        onClose={() => setModalOpen(false)}
        immersive
      />
    </div>
  )
}
