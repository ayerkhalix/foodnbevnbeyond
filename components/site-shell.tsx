import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { companyLogo, places, placePath } from '@/lib/places'
import { SiteNavLink, SiteNavigation } from '@/components/site-navigation'

type Place = (typeof places)[number]

export function CompanyLogo({
  className = '',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <span className={`company-logo relative block shrink-0 ${className}`}>
      <Image
        src={companyLogo.src}
        alt=""
        fill
        preload={priority || undefined}
        sizes="48px"
        className="object-contain"
      />
    </span>
  )
}
export function PlaceLogo({
  place,
  className = '',
  priority = false,
}: {
  place: Place
  className?: string
  priority?: boolean
}) {
  return (
    <span
      className={`place-logo relative block shrink-0 ${className}`}
      data-logo={place.logoShape}
    >
      <Image
        src={place.logo}
        alt=""
        fill
        preload={priority || undefined}
        sizes="(min-width: 768px) 220px, 150px"
        className="object-contain"
      />
    </span>
  )
}
export function Brand() {
  return (
    <SiteNavLink
      href="/"
      className="site-brand"
      aria-label="Food N Bev & Beyond home"
    >
      <CompanyLogo className="size-11" />
      <span>
        Food N Bev<span className="brand-second-line">&amp; Beyond</span>
      </span>
    </SiteNavLink>
  )
}
export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="page-width header-inner">
        <Brand />
        <SiteNavigation />
      </div>
    </header>
  )
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              Four restaurants. A shared love of good food.
              <br />
              El Nido, Palawan.
            </p>
          </div>
          <nav aria-label="Footer" className="footer-nav">
            <SiteNavLink href="/restaurants">Our restaurants</SiteNavLink>
            <SiteNavLink href="/menu">Menus</SiteNavLink>
            <SiteNavLink href="/about">Our story</SiteNavLink>
            <SiteNavLink href="/contact">Contact</SiteNavLink>
          </nav>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/foodnbevnbeyond/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <a
              href="https://www.facebook.com/foodnbevnbeyond"
              target="_blank"
              rel="noreferrer"
            >
              Facebook <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Food N Bev &amp; Beyond Corporation</span>
          <span>See you at the table.</span>
        </div>
      </div>
    </footer>
  )
}
export function PageIntro({
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <section className="page-width page-intro">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export function SitePage({ children }: { children: React.ReactNode }) {
  // Give the router one scroll target for the page, header, and footer.
  return (
    <div>
      <SiteHeader />
      <main id="content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
export function CrossPromo({ current }: { current?: string }) {
  return (
    <section className="bg-sage px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-5xl">There’s more to try.</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {places
            .filter((place) => place.slug !== current)
            .map((place) => (
              <Link
                key={place.slug}
                href={placePath(place.slug)}
                className="group"
              >
                <PlaceLogo place={place} className="h-28 w-48" />
                <p className="mt-6 font-serif text-3xl">{place.name}</p>
                <span className="text-link mt-4">
                  Explore restaurant{' '}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
