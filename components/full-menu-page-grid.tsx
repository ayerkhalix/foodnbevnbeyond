'use client'

import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import type { MenuPageImage } from '@/lib/places'
import MenuImageCarouselModal from '@/components/menu-image-carousel-modal'
import { MenuPageTiles } from '@/components/menu-page-tiles'

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
      <div className="menu-grid-heading">
        <button
          type="button"
          className="button-primary"
          aria-haspopup="dialog"
          onClick={() => setOpenIndex(0)}
        >
          <BookOpen size={18} aria-hidden="true" /> Read menu
        </button>
        <p>
          {images.length} {images.length === 1 ? 'page' : 'pages'}
        </p>
      </div>
      <MenuPageTiles pages={images} onOpen={setOpenIndex} />

      {openIndex !== null && (
        <MenuImageCarouselModal
          images={images}
          initialIndex={openIndex}
          restaurantName={restaurantName}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}
