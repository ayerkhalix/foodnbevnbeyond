import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { placeMenuPath, placePath, places } from '@/lib/places'

export function RestaurantCollection({
  headingLevel = 'h3',
}: {
  headingLevel?: 'h2' | 'h3'
}) {
  const Heading = headingLevel
  return (
    <div className="restaurant-collection">
      {places.map((place) => (
        <article key={place.slug} className="restaurant-entry">
          <Link href={placePath(place.slug)} className="restaurant-profile">
            <div className="restaurant-photo">
              <Image
                src={place.image}
                alt=""
                fill
                sizes="(min-width: 85rem) 620px, (min-width: 48rem) 46vw, 94vw"
                className="object-cover"
              />
            </div>
            <div className="restaurant-copy">
              <p className="cuisine-label">{place.accent}</p>
              <div className="restaurant-title-row">
                <Heading className="restaurant-title">{place.name}</Heading>
                <ArrowRight size={21} aria-hidden="true" />
              </div>
            </div>
          </Link>
          <p className="restaurant-description">{place.description}</p>
          <div className="restaurant-actions">
            <Link
              className="button-outline"
              href={placeMenuPath(place.slug)}
              aria-label={`View menu for ${place.name}`}
            >
              View menu <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
