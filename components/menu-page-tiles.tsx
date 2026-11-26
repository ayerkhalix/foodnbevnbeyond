import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import type { MenuPageImage } from '@/lib/places'

export function MenuPageTiles({
  pages,
  onOpen,
}: {
  pages: readonly MenuPageImage[]
  onOpen: (index: number) => void
}) {
  return (
    <div className="menu-tiles">
      {pages.map((page, index) => (
        <button
          type="button"
          key={page.src}
          className="menu-tile"
          aria-haspopup="dialog"
          aria-label={`Open menu page ${index + 1}`}
          onClick={() => onOpen(index)}
        >
          <span className="menu-tile-image">
            <Image
              src={page.src}
              alt=""
              fill
              sizes="(min-width: 85rem) 300px, (min-width: 48rem) 23vw, 46vw"
              className="object-contain"
            />
          </span>
          <span className="menu-tile-label">
            Page {index + 1} <Maximize2 size={16} aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  )
}
