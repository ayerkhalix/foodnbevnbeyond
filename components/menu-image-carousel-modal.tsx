'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { MenuPageImage } from '@/lib/places'

type Props = {
  images: readonly MenuPageImage[]
  initialIndex: number
  restaurantName: string
  onClose: () => void
}

export default function MenuImageCarouselModal({
  images,
  initialIndex,
  restaurantName,
  onClose,
}: Props) {
  const [index, setIndex] = useState(initialIndex)
  const [zoomed, setZoomed] = useState(false)
  const [ratio, setRatio] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousFocus = document.activeElement
    const root = document.documentElement
    const originalOverflow = root.style.overflow
    dialog.showModal()
    root.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      dialog.close()
      root.style.overflow = originalOverflow
      if (previousFocus instanceof HTMLElement)
        previousFocus.focus({ preventScroll: true })
    }
  }, [])

  const current = images[index]
  const canPage = images.length > 1
  const step = (direction: number) => {
    if (!canPage) return
    setZoomed(false)
    setRatio(null)
    setFailed(false)
    setIndex((value) => (value + direction + images.length) % images.length)
    scrollRef.current?.scrollTo(0, 0)
  }

  return (
    <dialog
      ref={dialogRef}
      className="menu-dialog"
      aria-labelledby="menu-viewer-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.target === scrollRef.current) return
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          step(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}
    >
      <div className="menu-dialog-layout">
        <header className="menu-dialog-header">
          <h2 id="menu-viewer-title">{restaurantName} menu</h2>
          <a
            href={current.src}
            target="_blank"
            rel="noreferrer"
            className="icon-control"
            title="Open original image in a new tab"
            aria-label="Open original image in a new tab"
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <button
            ref={closeRef}
            type="button"
            className="icon-control"
            aria-label="Close menu viewer"
            onClick={onClose}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div className="menu-dialog-image">
          <div
            ref={scrollRef}
            className={`menu-image-scroll${zoomed ? ' is-zoomed' : ''}`}
            role={zoomed ? 'region' : undefined}
            aria-label={zoomed ? 'Zoomed menu page' : undefined}
            tabIndex={zoomed ? 0 : undefined}
          >
            <div
              className="menu-image-page"
              style={{ '--image-ratio': ratio ?? 1 } as CSSProperties}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                unoptimized
                loading="eager"
                className={ratio ? 'object-contain' : 'opacity-0'}
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget
                  setRatio(naturalWidth / naturalHeight)
                }}
                onError={() => setFailed(true)}
              />
            </div>
          </div>
          {failed ? (
            <div className="menu-image-status" role="status">
              <p>This menu page couldn’t load.</p>
              <a
                className="text-link"
                href={current.src}
                target="_blank"
                rel="noreferrer"
              >
                Open original image
              </a>
            </div>
          ) : (
            !ratio && (
              <p className="menu-image-status" role="status">
                Loading menu page…
              </p>
            )
          )}
        </div>
        <footer className="menu-dialog-footer">
          <div className="menu-pager">
            <button
              type="button"
              className="icon-control"
              aria-label="Show previous menu page"
              disabled={!canPage}
              onClick={() => step(-1)}
            >
              <ChevronLeft size={23} aria-hidden="true" />
            </button>
            <p aria-live="polite" aria-atomic="true">
              {index + 1} of {images.length}
            </p>
            <button
              type="button"
              className="icon-control"
              aria-label="Show next menu page"
              disabled={!canPage}
              onClick={() => step(1)}
            >
              <ChevronRight size={23} aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            className="button-outline viewer-zoom"
            aria-label={zoomed ? 'Fit page to screen' : 'Zoom in on menu page'}
            disabled={!ratio}
            onClick={() => {
              setZoomed(!zoomed)
              scrollRef.current?.scrollTo(0, 0)
            }}
          >
            {zoomed ? (
              <ZoomOut size={17} aria-hidden="true" />
            ) : (
              <ZoomIn size={17} aria-hidden="true" />
            )}
            {zoomed ? 'Fit page' : 'Zoom in'}
          </button>
        </footer>
      </div>
    </dialog>
  )
}
