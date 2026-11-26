import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { PlaceLogo, SitePage } from '@/components/site-shell'
import { RestaurantCollection } from '@/components/restaurant-collection'
import { HeroSlideshow } from '@/components/hero-slideshow'
import { places, placePath } from '@/lib/places'

const heroSlides = places.map((place) => ({
  name: place.shortName,
  image: place.image,
  alt: place.imageAlt,
  href: placePath(place.slug),
}))

export default function Page() {
  return (
    <SitePage>
      <section className="home-hero page-width" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">
            Good food.
            <br />
            Warm welcomes.
            <br />
            <span>All in El Nido.</span>
          </h1>
          <p className="hero-description">
            Filipino favorites, fresh seafood, and Mediterranean plates. Four
            restaurants, each with a table for you.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#restaurants">
              Explore restaurants <ArrowDown aria-hidden="true" size={17} />
            </a>
            <Link className="text-link" href="/menu">
              Browse menus <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
        <HeroSlideshow slides={heroSlides} initialIndex={3} />
      </section>
      <nav
        className="restaurant-family page-width"
        aria-label="Choose a restaurant"
      >
        {places.map((place) => (
          <Link key={place.slug} href={placePath(place.slug)}>
            <PlaceLogo place={place} className="family-logo" />
            <span>{place.shortName}</span>
          </Link>
        ))}
      </nav>
      <section
        id="restaurants"
        className="page-width restaurant-section"
        aria-labelledby="restaurants-title"
      >
        <div className="section-intro">
          <h2 id="restaurants-title">Find your kind of table.</h2>
          <p>
            A family lunch, seafood to share, or pizza in the garden. Get to
            know our restaurants and see what’s cooking.
          </p>
        </div>
        <RestaurantCollection />
      </section>
      <section className="visit-section" aria-labelledby="visit-title">
        <div className="page-width visit-inner">
          <div>
            <h2 id="visit-title">
              Come hungry.
              <br />
              We’ll take it from here.
            </h2>
            <p>
              For table enquiries, group meals, and a little local advice, get
              in touch with the restaurant you have in mind.
            </p>
          </div>
          <Link className="button-light" href="/contact">
            Contact a restaurant <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </SitePage>
  )
}
