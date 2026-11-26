import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PlaceLogo, SitePage } from '@/components/site-shell'
import { otherRestaurants, placeMenuPath, places } from '@/lib/places'
import MenuPreview from '@/components/menu-preview'
import BestSellerCard from '@/components/best-seller-card'
import RestaurantShowcase from '@/components/restaurant-showcase'
import RestaurantContactLinks from '@/components/restaurant-contact-links'

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
  return place ? { title: place.name, description: place.description } : {}
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const place = places.find((item) => item.slug === slug)
  if (!place) notFound()
  return (
    <SitePage>
      <section className="page-width detail-intro">
        <Link className="text-link" href="/restaurants">
          <ArrowLeft size={16} aria-hidden="true" />
          All restaurants
        </Link>
        <div className="detail-heading">
          <PlaceLogo place={place} className="detail-logo" />
          <h1>
            {place.shortName}{' '}
            <span>{place.name.slice(place.shortName.length).trim()}</span>
          </h1>
        </div>
        <p className="detail-description">{place.description}</p>
        <div className="detail-actions">
          <Link href={placeMenuPath(place.slug)} className="button-primary">
            View menu <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <a href="#restaurant-contact" className="button-outline">
            Contact
          </a>
        </div>
        <div className="relative mt-7 aspect-[1.65] overflow-hidden rounded bg-sage md:mt-10 md:aspect-[2.8]">
          <Image
            src={place.image}
            alt={place.imageAlt}
            fill
            preload
            sizes="(min-width: 85rem) 1280px, 94vw"
            className="object-cover"
          />
        </div>
      </section>
      <section id="menu" className="page-width detail-section">
        <h2>On the menu</h2>
        <MenuPreview
          menuPages={place.menuPages}
          restaurantName={place.shortName}
          fullMenuHref={placeMenuPath(place.slug)}
        />
      </section>
      <section className="page-width detail-section">
        <h2>A few house favorites</h2>
        <div className="grid gap-x-7 md:grid-cols-3">
          {place.menu.map((item) => (
            <BestSellerCard key={item.name} item={item} />
          ))}
        </div>
      </section>
      <section
        id="restaurant-contact"
        className="page-width detail-section page-end"
      >
        <h2>Contact {place.shortName}</h2>
        <p className="detail-location">
          <MapPin size={16} aria-hidden="true" /> {place.location}
        </p>
        <RestaurantContactLinks contact={place.contact} />
      </section>
      <RestaurantShowcase restaurants={otherRestaurants(place.slug)} />
    </SitePage>
  )
}
