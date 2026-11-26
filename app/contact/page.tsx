import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { PageIntro, PlaceLogo, SitePage } from '@/components/site-shell'
import RestaurantContactLinks from '@/components/restaurant-contact-links'
import { places } from '@/lib/places'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <SitePage>
      <PageIntro
        title="Contact our restaurants"
        description="For table enquiries, group meals, or questions about the menu, contact the restaurant directly using the details below."
      />
      <section
        className="page-width contact-collection"
        aria-label="Restaurant contact details"
      >
        {places.map((place) => (
          <article key={place.slug} className="contact-entry">
            <div className="contact-identity">
              <PlaceLogo place={place} className="directory-logo" />
              <div>
                <h2>{place.shortName}</h2>
                <p>{place.location}</p>
              </div>
            </div>
            <RestaurantContactLinks contact={place.contact} />
          </article>
        ))}
      </section>
      <div className="page-width page-end">
        <Link className="text-link" href="/menu">
          Browse the menus before you visit{' '}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </SitePage>
  )
}
