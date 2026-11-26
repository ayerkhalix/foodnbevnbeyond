import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { placePath, type restaurantPlaces } from '@/lib/places'

type Restaurant = (typeof restaurantPlaces)[number]

export default function RestaurantShowcase({
  restaurants,
}: {
  restaurants: readonly Restaurant[]
}) {
  if (restaurants.length === 0) return null

  return (
    <section className="showcase">
      <div className="page-width detail-section">
        <h2>More restaurants to try</h2>
        <div className="showcase-grid">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.slug}
              href={placePath(restaurant.slug)}
              className="directory-link showcase-link"
            >
              <div className="showcase-photo">
                <Image
                  src={restaurant.image}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 26vw, 76px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3>{restaurant.shortName}</h3>
                <p>{restaurant.accent}</p>
              </div>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
