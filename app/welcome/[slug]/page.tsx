import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Brand, PlaceLogo } from '@/components/site-shell'
import { placeMenuPath, places, placePath } from '@/lib/places'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const place = places.find((item) => item.slug === slug)
  return place ? { title: `Welcome to ${place.shortName}` } : {}
}

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const place = places.find((item) => item.slug === slug)
  if (!place) notFound()
  return (
    <div className="page-width welcome-page">
      <header>
        <Brand />
      </header>
      <main className="welcome-content">
        <PlaceLogo place={place} className="detail-logo" priority />
        <h1>Welcome to {place.shortName}</h1>
        <p className="detail-description">{place.description}</p>
        <Link
          className="button-primary welcome-menu"
          href={placeMenuPath(place.slug)}
        >
          <BookOpen size={18} aria-hidden="true" /> View menu
        </Link>
        <Link className="welcome-link" href={placePath(place.slug)}>
          Restaurant details <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link className="welcome-link" href="/explore">
          Explore our other restaurants{' '}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </main>
    </div>
  )
}
