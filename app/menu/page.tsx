import Image from 'next/image'
import Link from 'next/link'
import { PageIntro, SiteFooter, SiteHeader } from '@/components/site-shell'
import { placeMenuPath, places } from '@/lib/places'

export default function MenuPage() {
  const restaurants = places.filter((place) => place.category === 'Restaurant')

  return (
    <main className="bg-sand text-ink">
      <SiteHeader />
      <PageIntro eyebrow="The menu" title="Explore every table." description="Choose a restaurant to open its full menu, including complete menu pages where available." />

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          {restaurants.map((place) => {
            const previewImage = place.menuPages[0]?.src ?? place.image

            return (
              <article key={place.slug} className="rounded border border-ink/10 bg-white p-5">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-sand sm:h-32 sm:w-48">
                    <Image src={previewImage} alt={`${place.name} menu preview`} fill sizes="(min-width: 768px) 192px, 100vw" className="object-cover" />
                  </div>
                <div>
                  <h3 className="font-serif text-2xl">{place.name}</h3>
                  <p className="mt-2 text-sm text-ink/60">{place.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {place.menu.slice(0, 3).map((item) => (
                      <span key={item.name} className="border border-ink/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-ink/55">
                        {item.category}
                      </span>
                    ))}
                  </div>
                  <Link href={placeMenuPath(place.slug)} className="mt-6 inline-block text-[10px] font-semibold uppercase tracking-[.2em] text-ink">
                    View full menu
                  </Link>
                </div>
              </div>
            </article>
            )
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
