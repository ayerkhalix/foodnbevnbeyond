'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { MenuPageImage } from '@/lib/places'

type MenuImageCarouselModalProps = {
  images: readonly MenuPageImage[]
  initialIndex?: number
  open: boolean
  restaurantName: string
  onClose: () => void
  immersive?: boolean
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function MenuImageCarouselModal({
  images,
  initialIndex = 0,
  open,
  restaurantName,
  onClose,
  immersive = false,
}: MenuImageCarouselModalProps) {
  const [index, setIndex] = useState(initialIndex)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const hasMultiplePages = images.length > 1

  const showPrevious = useCallback(() => {
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }, [images.length])

  const showNext = useCallback(() => {
    setIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }, [images.length])

  useEffect(() => {
    if (!open) return

    setIndex(Math.min(initialIndex, Math.max(images.length - 1, 0)))
  }, [images.length, initialIndex, open])

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      document.body.style.overflow = originalOverflow
      previousFocusRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowLeft' && hasMultiplePages) {
        event.preventDefault()
        showPrevious()
        return
      }

      if (event.key === 'ArrowRight' && hasMultiplePages) {
        event.preventDefault()
        showNext()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => element.offsetParent !== null,
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [hasMultiplePages, onClose, open, showNext, showPrevious])

  if (!open || images.length === 0) return null

  const currentImage = images[index]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-0 backdrop-blur-sm transition-opacity md:p-3"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-carousel-title"
        className={immersive
          ? 'flex h-full max-h-none w-full flex-col overflow-hidden bg-ink shadow-2xl md:max-h-[98vh] md:rounded'
          : 'flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded bg-sand shadow-2xl'}
      >
        <div className={immersive
          ? 'absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 bg-gradient-to-b from-ink/80 to-transparent px-4 pb-8 pt-4 text-white md:px-6'
          : 'flex items-center justify-between gap-4 border-b border-ink/10 px-4 py-3 md:px-5'}>
          <div>
            <p className={immersive ? 'text-[9px] font-semibold uppercase tracking-[.24em] text-white/60' : 'text-[9px] font-semibold uppercase tracking-[.24em] text-ink/45'}>Full menu</p>
            <h2 id="menu-carousel-title" className="font-serif text-2xl leading-none md:text-3xl">
              {restaurantName}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu carousel"
            className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-ink/40 text-white transition hover:bg-coral hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className={immersive ? 'min-h-0 flex-1 bg-ink' : 'grid min-h-0 flex-1 bg-white md:grid-cols-[1fr_132px]'}>
          <div className={immersive
            ? 'relative flex h-full min-h-0 items-center justify-center bg-ink p-0'
            : 'relative flex min-h-[58vh] items-center justify-center bg-white p-3 md:min-h-[68vh] md:p-6'}>
            {hasMultiplePages && (
              <button
                type="button"
                aria-label="Show previous menu page"
                className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/50 text-white shadow-sm transition hover:bg-coral hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-coral md:left-5"
                onClick={showPrevious}
              >
                <ChevronLeft className="size-5" />
              </button>
            )}

            <div className={immersive ? 'relative h-full w-full overflow-hidden' : 'relative h-[58vh] w-full max-w-3xl overflow-hidden md:h-[68vh]'}>
              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="(min-width: 768px) 760px, 94vw"
                className="object-contain transition duration-300"
              />
            </div>

            {hasMultiplePages && (
              <button
                type="button"
                aria-label="Show next menu page"
                className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/50 text-white shadow-sm transition hover:bg-coral hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-coral md:right-5"
                onClick={showNext}
              >
                <ChevronRight className="size-5" />
              </button>
            )}
          </div>

          <div className={immersive ? 'hidden' : 'border-t border-ink/10 bg-sand p-3 md:border-l md:border-t-0 md:p-4'}>
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.2em] text-ink/55 md:block">
              <span>
                Page {index + 1} of {images.length}
              </span>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:max-h-[62vh] md:flex-col md:overflow-y-auto md:overflow-x-hidden">
              {images.map((image, imageIndex) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Show menu page ${imageIndex + 1}`}
                  aria-current={imageIndex === index ? 'page' : undefined}
                  className="relative h-20 w-14 shrink-0 overflow-hidden rounded border bg-white transition hover:border-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/35 aria-current:border-coral aria-current:ring-2 aria-current:ring-coral/30 md:h-28 md:w-full"
                  onClick={() => setIndex(imageIndex)}
                >
                  <Image src={image.src} alt="" fill sizes="112px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
