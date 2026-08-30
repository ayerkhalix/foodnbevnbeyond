import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { companyLogo, places, placePath } from '@/lib/places'

type Place = (typeof places)[number]

export function CompanyLogo({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`relative block shrink-0 p-1 ${className}`}>
      <Image src={companyLogo.src} alt={companyLogo.alt} fill priority={priority} sizes="(min-width: 768px) 168px, 128px" className="object-contain" />
    </span>
  )
}

export function PlaceLogo({ place, className = '', priority = false }: { place: Place; className?: string; priority?: boolean }) {
  return (
    <span className={`relative block shrink-0 bg-white p-3 ${className}`}>
      <Image src={place.logo} alt={`${place.name} logo`} fill priority={priority} sizes="(min-width: 768px) 180px, 140px" className="object-contain" />
    </span>
  )
}

export function SiteHeader() {
  return <header className="border-b border-ink/10 bg-sand/95 px-5 md:px-10"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between"><Link href="/" className="flex items-center gap-1" aria-label="Food N Bev & Beyond home"><CompanyLogo className="h-12 w-32 md:w-44" /><span className="relative z-10 -ml-2 font-serif text-xl leading-none md:text-2xl">Food N Bev &amp; Beyond</span></Link><nav className="flex gap-5 text-[10px] font-semibold uppercase tracking-[.18em] md:gap-9"><Link href="/explore">Explore</Link><Link href="/restaurants">Restaurants</Link><Link className="hidden md:block" href="/about">About us</Link><Link className="hidden md:block" href="/contact">Contact</Link></nav></div></header>
}

export function SiteFooter() {
  return <footer className="bg-ink px-5 py-12 text-white md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between"><div><CompanyLogo className="h-16 w-48" /><p className="mt-5 max-w-xs text-sm leading-6 text-white/55">A connected collection of restaurants and culinary experiences in El Nido, Palawan.</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[.2em] text-white/65"><Link href="/explore">Explore</Link><Link href="/restaurants">Restaurants</Link><Link href="/contact">Contact</Link></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-5 text-[9px] uppercase tracking-[.2em] text-white/40">© 2026 Food N Bev & Beyond Corporation</div></footer>
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28"><p className="eyebrow">{eyebrow}</p><h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[.92] tracking-[-.05em] md:text-8xl">{title}</h1><p className="mt-8 max-w-xl text-lg leading-7 text-ink/65">{description}</p></section>
}

export function CrossPromo({ current }: { current?: string }) {
  return <section className="bg-coral px-5 py-20 md:px-10"><div className="mx-auto max-w-7xl"><p className="eyebrow">Explore more from Food N Bev & Beyond</p><h2 className="mt-4 font-serif text-5xl">Your next experience is nearby.</h2><div className="mt-10 flex gap-4 overflow-x-auto pb-3">{places.filter((place) => place.slug !== current).map((place) => <Link key={place.slug} href={placePath(place.slug)} className="min-w-72 border border-ink/20 p-5 transition hover:bg-sand"><PlaceLogo place={place} className="h-24 w-36" /><p className="mt-8 font-serif text-2xl">{place.name}</p><span className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em]">Discover <ArrowRight className="size-4" /></span></Link>)}</div></div></section>
}
