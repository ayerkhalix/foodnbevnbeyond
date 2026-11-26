'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { MenuPageImage } from '@/lib/places'
import MenuImageCarouselModal from '@/components/menu-image-carousel-modal'
import { MenuPageTiles } from '@/components/menu-page-tiles'

export default function MenuPreview({
  menuPages = [],
  restaurantName,
  fullMenuHref,
}: {
  menuPages?: readonly MenuPageImage[]
  restaurantName: string
  fullMenuHref: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <>
      {menuPages.length ? (
        <MenuPageTiles pages={menuPages.slice(0, 4)} onOpen={setOpenIndex} />
      ) : (
        <p className="text-muted-foreground">
          Contact the restaurant for the latest menu.
        </p>
      )}
      <div className="mt-3">
        <Link href={fullMenuHref} className="text-link">
          View full menu <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      {openIndex !== null && (
        <MenuImageCarouselModal
          images={menuPages}
          initialIndex={openIndex}
          restaurantName={restaurantName}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}
