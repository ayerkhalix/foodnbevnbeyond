import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import BestSellerCard from '@/components/best-seller-card'
import FullMenuPageGrid from '@/components/full-menu-page-grid'
import RestaurantShowcase from '@/components/restaurant-showcase'
import { PlaceLogo, SiteFooter, SiteHeader } from '@/components/site-shell'
import { otherRestaurants, places, placePath } from '@/lib/places'

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }))
}

export default async function PlaceMenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const place = places.find((item) => item.slug === slug)
  if (!place) notFound()

  const hasMenuPages = place.menuPages.length > 0

  return (
    <main className="bg-sand text-ink">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <Link href={`${placePath(place.slug)}#menu`} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-ink/60 transition hover:text-ink">
          <ArrowLeft className="size-4" />
          Back to restaurant
        </Link>

        <div className="mt-10 grid gap-8 md:grid-cols-[220px_1fr] md:items-end">
          <PlaceLogo place={place} className="h-32 w-48 border border-ink/10 shadow-sm" priority />
          <div>
            <p className="eyebrow">Full menu</p>
            <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[.92] tracking-[-.05em] md:text-8xl">{place.name}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-ink/65">
              Explore the complete menu pages in a calm, easy-to-scan layout.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        {hasMenuPages ? (
          <FullMenuPageGrid images={place.menuPages} restaurantName={place.name} />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {place.menu.map((item) => (
              <BestSellerCard key={item.name} item={item} badge={item.category} />
            ))}
          </div>
        )}
      </section>

      {otherRestaurants(place.slug).length > 0 && <RestaurantShowcase restaurants={otherRestaurants(place.slug)} />}

      <SiteFooter />
    </main>
  )
}
