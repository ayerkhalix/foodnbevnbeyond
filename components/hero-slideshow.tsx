'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Slide = {
  name: string
  image: string
  alt: string
  href: string
}

export function HeroSlideshow({
  slides,
  initialIndex = 0,
}: {
  slides: readonly Slide[]
  initialIndex?: number
}) {
  const [index, setIndex] = useState(initialIndex)
  const [playing, setPlaying] = useState(false)
  const [initialLoaded, setInitialLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [inView, setInView] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 48rem) and (hover: hover)')
    setPlaying(desktop.matches && !motion.matches)
    const respectMotion = () => {
      if (motion.matches) setPlaying(false)
    }
    const updateVisibility = () => setVisible(!document.hidden)
    updateVisibility()
    motion.addEventListener('change', respectMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    )
    if (carouselRef.current) observer.observe(carouselRef.current)
    return () => {
      motion.removeEventListener('change', respectMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (
      !playing ||
      !initialLoaded ||
      hovered ||
      focused ||
      !visible ||
      !inView ||
      slides.length < 2
    )
      return
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      6000,
    )
    return () => window.clearInterval(timer)
  }, [playing, initialLoaded, hovered, focused, visible, inView, slides.length])

  const current = slides[index]
  if (!current) return null
  const step = (direction: number) => {
    setPlaying(false)
    setIndex((value) => (value + direction + slides.length) % slides.length)
  }

  return (
    <div
      ref={carouselRef}
      className="hero-photo"
      role="group"
      aria-roledescription="carousel"
      aria-label="Restaurant photos"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false)
      }}
    >
      <div className="hero-photo-frame">
        {slides.map(
          (slide, slideIndex) =>
            (initialLoaded ||
              slideIndex === initialIndex ||
              slideIndex === index) && (
              <Image
                key={slide.href}
                src={slide.image}
                alt={slideIndex === index ? slide.alt : ''}
                aria-hidden={slideIndex !== index}
                fill
                preload={slideIndex === initialIndex}
                onLoad={
                  slideIndex === initialIndex
                    ? () => setInitialLoaded(true)
                    : undefined
                }
                onError={
                  slideIndex === initialIndex
                    ? () => setInitialLoaded(true)
                    : undefined
                }
                sizes="(min-width: 85rem) 650px, (min-width: 48rem) 50vw, 94vw"
                className={`hero-slide object-cover ${slideIndex === index ? 'is-active' : ''}`}
              />
            ),
        )}
      </div>
      <div className="hero-slideshow-controls">
        <div aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
          <Link href={current.href} className="hero-caption">
            {current.name} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="hero-photo-actions">
          <button
            type="button"
            className="icon-control"
            aria-label="Previous restaurant photo"
            onClick={() => step(-1)}
          >
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-control"
            aria-label="Next restaurant photo"
            onClick={() => step(1)}
          >
            <ChevronRight size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-control"
            aria-label={
              playing
                ? 'Pause restaurant slideshow'
                : 'Play restaurant slideshow'
            }
            title={playing ? 'Pause slideshow' : 'Play slideshow'}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
