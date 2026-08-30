'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Menu, Sparkles, Utensils, Waves, X } from 'lucide-react'
import { useState } from 'react'
import { CompanyLogo, PlaceLogo } from '@/components/site-shell'
import { places, placePath } from '@/lib/places'

const ventureHighlights = [
  { slug: 'coco-resto-filipino-restaurant', name: 'Coco Resto Filipino Restaurant', type: 'Dine', text: 'Filipino comfort food, family-style plates.' },
  { slug: 'the-lighthouse-seafood-restaurant', name: 'The Lighthouse Seafood Restaurant', type: 'Dine', text: 'Sea-to-table dining above El Nido Bay.' },
  { slug: 'moringa-tree-mediterranean-restaurant-pizzeria', name: 'Moringa Tree Mediterranean Restaurant & Pizzeria', type: 'Dine', text: 'Handmade pizzas and Mediterranean plates.' },
  { slug: 'sa-kurbada-hapag-karaenan', name: 'Sa Kurbada Hapag-Karaenan', type: 'Dine', text: 'Authentic Filipino flavors served together.' },
] as const

const ventures = ventureHighlights.map((venture) => ({
  ...venture,
  place: places.find((place) => place.slug === venture.slug)!,
}))

const experiences = [
  ['01', 'Island hopping', 'Limestone lagoons, hidden beaches, a day that belongs entirely to the water.', Waves],
  ['02', 'Slow mornings', 'Coffee on the terrace. Bare feet on warm stone. Nothing scheduled until sunset.', Sparkles],
  ['03', 'Local tables', 'The catch of the day, shared generously, with stories that last longer than dinner.', Utensils],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-sand text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-ink/20 text-white backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <Link href="/" className="flex items-center gap-1" aria-label="Food N Bev & Beyond home">
            <CompanyLogo className="h-12 w-32 md:w-44" priority />
            <span className="relative z-10 -ml-2 font-serif text-xl leading-none text-white md:text-2xl">Food N Bev &amp; Beyond</span>
          </Link>
          <nav className="hidden items-center gap-9 text-[10px] font-semibold uppercase tracking-[0.22em] md:flex">
            <Link className="transition hover:text-coral" href="#our-world">Our world</Link>
            <Link className="transition hover:text-coral" href="#experiences">Experiences</Link>
            <Link className="transition hover:text-coral" href="#journal">Journal</Link>
            <Link className="transition hover:text-coral" href="#contact">Contact</Link>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex size-10 items-center justify-center rounded-full border border-white/50 md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 bg-ink px-6 py-7 text-sm uppercase tracking-[0.18em] md:hidden"><Link href="#our-world" onClick={() => setMenuOpen(false)}>Our world</Link><Link href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</Link><Link href="#journal" onClick={() => setMenuOpen(false)}>Journal</Link><Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link></nav>}
      </header>

      <section className="relative flex min-h-[760px] items-end overflow-hidden bg-ink px-5 pb-14 pt-32 text-white md:min-h-screen md:px-10 md:pb-20">
        <Image src="/images/hero-home.png" alt="El Nido lagoon and limestone cliffs at golden hour" fill priority className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/25" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/75"><span className="h-px w-8 bg-coral" /> Made for the curious</p>
            <h1 className="font-serif text-6xl leading-[.92] tracking-[-0.045em] text-balance md:text-8xl lg:text-[9.5rem]">More places.<br /><em className="font-normal text-coral">More experiences.</em></h1>
            <p className="mt-8 max-w-md text-base leading-7 text-white/80 md:text-lg">Discover exceptional dining and unique experiences across our collection of restaurants.</p>
          </div>
          <div className="mt-16 flex items-end justify-between border-t border-white/30 pt-5"><span className="text-[10px] uppercase tracking-[0.25em] text-white/70">11° 11′ N · 119° 23′ E</span><a href="#our-world" className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em]">Explore <ArrowDown className="size-4" /></a></div>
        </div>
      </section>

      <section id="our-world" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-12 md:grid-cols-[.75fr_1.25fr] md:gap-24">
          <div><p className="eyebrow">Our world</p><h2 className="mt-5 max-w-md font-serif text-5xl leading-[.98] tracking-[-.04em] md:text-7xl">Four restaurants.<br /><em className="font-normal text-coral">Countless experiences.</em></h2></div>
          <div className="max-w-xl pt-1"><p className="text-xl leading-8 text-ink/75 md:text-2xl">We believe the best kind of travel is the kind that leaves a little of itself with you.</p><p className="mt-7 leading-7 text-ink/60">Food N Bev & Beyond is a small collection of thoughtfully made restaurants and culinary experiences in Palawan — long lunches, shared plates, and slow garden dinners.</p><Link href="#experiences" className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 text-[10px] font-semibold uppercase tracking-[0.22em]">Find your way in <ArrowRight className="size-4" /></Link></div>
        </div>
        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{ventures.map((v) => <Link href={placePath(v.place.slug)} key={v.name} className="group"><div className="relative aspect-[.82] overflow-hidden bg-stone"><Image src={v.place.image} alt={v.name} fill className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" /><div className="absolute left-5 top-5"><PlaceLogo place={v.place} className="h-20 w-28 shadow-sm" /></div><div className="absolute inset-x-5 bottom-5 text-white"><p className="mb-2 text-[9px] uppercase tracking-[.25em] text-coral">{v.type}</p><h3 className="font-serif text-3xl">{v.name}</h3><p className="mt-2 text-sm text-white/75">{v.text}</p></div></div></Link>)}</div>
      </section>

      <section id="experiences" className="bg-ink px-5 py-24 text-white md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow text-coral">The El Nido feeling</p><h2 className="mt-5 max-w-2xl font-serif text-5xl leading-[.96] tracking-[-.04em] md:text-7xl">Come for the view.<br /><em className="font-normal text-sand">Dine for the in-between.</em></h2></div><p className="max-w-xs text-sm leading-6 text-white/60">The moments you don&apos;t plan for are usually the ones you remember.</p></div><div className="mt-20 grid border-t border-white/20 md:grid-cols-3">{experiences.map(([number, title, text, Icon]) => <div key={number as string} className="border-b border-white/20 py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><div className="flex items-start justify-between"><span className="font-mono text-xs text-coral">{number as string}</span><Icon className="size-5 text-sand" strokeWidth={1.2} /></div><h3 className="mt-14 font-serif text-3xl">{title as string}</h3><p className="mt-4 max-w-xs text-sm leading-6 text-white/60">{text as string}</p></div>)}</div></div></section>

      <section id="journal" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36"><div className="flex items-end justify-between border-b border-ink/20 pb-6"><div><p className="eyebrow">From the journal</p><h2 className="mt-4 font-serif text-5xl tracking-[-.04em] md:text-6xl">Notes from here</h2></div><Link href="#contact" className="hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] md:flex">View all <ArrowRight className="size-4" /></Link></div><div className="mt-10 grid gap-8 md:grid-cols-3"><article><div className="relative aspect-[1.15] overflow-hidden"><Image src="/images/dish-shrimp.png" alt="Grilled garlic butter shrimp" fill className="object-cover transition duration-700 hover:scale-105" /></div><p className="eyebrow mt-6">Eat</p><h3 className="mt-3 font-serif text-3xl leading-tight">The taste of a day well spent</h3><p className="mt-3 text-sm leading-6 text-ink/60">A few things we learned about cooking with what the sea gives us.</p></article><article><div className="relative aspect-[1.15] overflow-hidden"><Image src="/images/moringa-room-1.png" alt="Moringa garden dining" fill className="object-cover transition duration-700 hover:scale-105" /></div><p className="eyebrow mt-6">Moments</p><h3 className="mt-3 font-serif text-3xl leading-tight">A morning with nowhere to be</h3><p className="mt-3 text-sm leading-6 text-ink/60">Inside the gentle rituals of a Moringa kind of morning.</p></article><article><div className="relative aspect-[1.15] overflow-hidden"><Image src="/images/coco-room-2.png" alt="Coco Resto private terrace" fill className="object-cover transition duration-700 hover:scale-105" /></div><p className="eyebrow mt-6">Go</p><h3 className="mt-3 font-serif text-3xl leading-tight">The quiet side of the island</h3><p className="mt-3 text-sm leading-6 text-ink/60">Our favourite places to disappear for an afternoon.</p></article></div></section>

      <section id="contact" className="bg-coral px-5 py-20 md:px-10 md:py-28"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-14 md:flex-row md:items-end"><div><p className="eyebrow text-ink/60">Keep in touch</p><h2 className="mt-5 max-w-xl font-serif text-5xl leading-none tracking-[-.04em] md:text-7xl">A little more<br />El Nido, <em>occasionally.</em></h2></div><form onSubmit={(e) => { e.preventDefault(); setJoined(true) }} className="w-full max-w-sm">{joined ? <p className="font-serif text-2xl">You&apos;re on the list. See you in El Nido.</p> : <><label htmlFor="email" className="sr-only">Your email address</label><div className="flex border-b border-ink/50 pb-3"><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink/55" /><button className="text-[10px] font-semibold uppercase tracking-[.2em]" type="submit">Sign up <ArrowRight className="ml-2 inline size-4" /></button></div><p className="mt-4 text-xs text-ink/60">Occasional notes, never noise.</p></>}</form></div></section>

      <footer className="bg-ink px-5 py-12 text-white md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-end md:justify-between"><div><CompanyLogo className="h-16 w-48" /><p className="mt-5 max-w-xs text-xs leading-5 text-white/50">Places to eat, wander, and come back to. El Nido, Palawan.</p></div><div className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] uppercase tracking-[.2em] text-white/60"><Link href="#our-world" className="hover:text-coral">Our world</Link><Link href="#experiences" className="hover:text-coral">Experiences</Link><Link href="#journal" className="hover:text-coral">Journal</Link><Link href="#contact" className="hover:text-coral">Contact</Link><span aria-label="Instagram" className="text-xs">ig</span></div></div><div className="mt-12 flex justify-between border-t border-white/15 pt-5 text-[9px] uppercase tracking-[.2em] text-white/40"><span>© 2026 Food N Bev & Beyond</span><span>Made with care in Palawan</span></div></footer>
    </main>
  )
}
