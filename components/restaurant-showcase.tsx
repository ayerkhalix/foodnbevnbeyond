import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { placePath, type restaurantPlaces } from '@/lib/places'

type Restaurant = (typeof restaurantPlaces)[number]

export default function RestaurantShowcase({ restaurants }: { restaurants: readonly Restaurant[] }) {
  if (restaurants.length === 0) return null

  return (
    <section className="bg-ink px-5 py-20 text-white md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[.8fr_1fr] md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-coral">More restaurants</p>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-none md:text-6xl">Explore More of Our Table.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/60 md:justify-self-end">
            Discover the other dining destinations in the Food N Bev & Beyond collection, from coastal seafood to warm Filipino tables.
          </p>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {restaurants.map((restaurant, index) => (
            <Link
              key={restaurant.slug}
              href={placePath(restaurant.slug)}
              className={`group relative min-h-[420px] w-[82vw] shrink-0 overflow-hidden rounded bg-white/10 text-white md:w-auto ${
                index === 1 ? 'md:mt-10' : ''
              }`}
            >
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                sizes="(min-width: 768px) 33vw, 82vw"
                className="object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-coral">{restaurant.accent}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight">{restaurant.name}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">{restaurant.description}</p>
                {restaurant.location && (
                  <p className="mt-4 flex items-center gap-2 text-xs text-white/60">
                    <MapPin className="size-4 text-coral" />
                    {restaurant.location}
                  </p>
                )}
                <span className="mt-7 inline-flex items-center gap-2 border border-white/35 px-4 py-3 text-[10px] font-semibold uppercase tracking-[.18em] transition group-hover:border-coral group-hover:bg-coral group-hover:text-ink">
                  Explore Restaurant
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
