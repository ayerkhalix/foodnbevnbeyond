import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { PageIntro, PlaceLogo, SitePage } from '@/components/site-shell'
import { placeMenuPath, places } from '@/lib/places'

export const metadata: Metadata = { title: 'Menus' }

export default function MenuPage() {
  return (
    <SitePage>
      <PageIntro
        title="Restaurant menus"
        description="Choose a restaurant to see its menu."
      />
      <section
        className="page-width directory-grid page-end"
        aria-label="Choose a restaurant menu"
      >
        {places.map((place) => (
          <Link
            key={place.slug}
            href={placeMenuPath(place.slug)}
            className="directory-link"
          >
            <PlaceLogo place={place} className="directory-logo" />
            <div>
              <h2>{place.shortName}</h2>
              <p>{place.accent}</p>
            </div>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        ))}
      </section>
    </SitePage>
  )
}
