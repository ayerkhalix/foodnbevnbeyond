import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BestSellerCard from '@/components/best-seller-card'
import FullMenuPageGrid from '@/components/full-menu-page-grid'
import RestaurantShowcase from '@/components/restaurant-showcase'
import { PlaceLogo, SitePage } from '@/components/site-shell'
import { otherRestaurants, places, placePath } from '@/lib/places'

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const place = places.find((item) => item.slug === slug)
  return place ? { title: `${place.shortName} menu` } : {}
}

export default async function PlaceMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const place = places.find((item) => item.slug === slug)
  if (!place) notFound()

  const hasMenuPages = place.menuPages.length > 0

  return (
    <SitePage>
      <section className="page-width detail-intro">
        <Link href={placePath(place.slug)} className="text-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Restaurant details
        </Link>
        <div className="detail-heading">
          <PlaceLogo place={place} className="detail-logo" />
          <h1>{place.shortName} menu</h1>
        </div>
      </section>

      <section className="page-width page-end" aria-label="Menu pages">
        {hasMenuPages ? (
          <FullMenuPageGrid
            images={place.menuPages}
            restaurantName={place.shortName}
          />
        ) : (
          <div className="grid gap-x-7 md:grid-cols-3">
            {place.menu.map((item) => (
              <BestSellerCard
                key={item.name}
                item={item}
                badge={item.category}
              />
            ))}
          </div>
        )}
      </section>

      {otherRestaurants(place.slug).length > 0 && (
        <RestaurantShowcase restaurants={otherRestaurants(place.slug)} />
      )}
    </SitePage>
  )
}
