import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PlaceLogo, SiteFooter, SiteHeader } from '@/components/site-shell'
import { otherRestaurants, placeMenuPath, places } from '@/lib/places'
import MenuPreview from '@/components/menu-preview'
import BestSellerCard from '@/components/best-seller-card'
import RestaurantShowcase from '@/components/restaurant-showcase'
import RestaurantContactLinks from '@/components/restaurant-contact-links'

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }))
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const place = places.find((item) => item.slug === slug)
  if (!place) notFound()

  const isRestaurant = place.category === 'Restaurant'

  return (
    <main className="bg-sand text-ink">
      <SiteHeader />

      <section className="relative flex min-h-[620px] items-end overflow-hidden bg-ink px-5 pb-14 text-white md:px-10 md:pb-20">
        <Image src={place.image} alt={place.name} fill priority className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl">
          <PlaceLogo place={place} className="h-32 w-44 shadow-lg" priority />
          <p className="mt-8 text-[10px] uppercase tracking-[.28em] text-coral">Part of Food N Bev & Beyond Corporation · {place.category}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[.9] tracking-[-.05em] md:text-8xl">{place.name}</h1>
          <p className="mt-6 max-w-lg text-lg text-white/75">{place.hero}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#menu" className="bg-coral px-6 py-4 text-[10px] font-semibold uppercase tracking-[.2em] text-ink">Explore {isRestaurant ? 'the menu' : 'the place'}</a>
            <a href={placeMenuPath(place.slug)} className="border border-white/50 px-6 py-4 text-[10px] font-semibold uppercase tracking-[.2em]">View full menu</a>
          </div>
          <RestaurantContactLinks contact={place.contact} />
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="eyebrow">Menu</p>
          <h2 className="mt-5 font-serif text-5xl leading-none md:text-6xl">Discover what&apos;s on the table.</h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-7 text-ink/65">
            A curated first look at the plates, pizzas, and coastal flavors guests ask for most. Open the menu pages for the complete selection.
          </p>
        </div>
        <MenuPreview
          menuPages={place.menuPages}
          restaurantName={place.name}
          fullMenuHref={placeMenuPath(place.slug)}
        />
      </section>

      {isRestaurant && (
        <section id="best-sellers" className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-10 md:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Best Sellers</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl">The dishes worth coming back for.</h2>
            <p className="mt-4 text-ink/70">A few of the flavors our guests love most.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {place.menu.slice(0, 3).map((item) => (
              <BestSellerCard key={item.name} item={item} />
            ))}
          </div>
        </section>
      )}

      {isRestaurant && <RestaurantShowcase restaurants={otherRestaurants(place.slug)} />}

      <SiteFooter />
    </main>
  )
}
