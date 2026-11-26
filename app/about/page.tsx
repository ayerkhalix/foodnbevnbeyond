import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { PageIntro, SitePage } from '@/components/site-shell'

export const metadata: Metadata = { title: 'Our story' }

export default function AboutPage() {
  return (
    <SitePage>
      <PageIntro
        title="One family. Four places to gather."
        description="Food N Bev & Beyond brings together restaurants and culinary experiences in El Nido, Palawan."
      />
      <section className="page-width page-end grid items-center gap-7 md:grid-cols-2 md:gap-10">
        <div className="relative aspect-[1.5] overflow-hidden rounded md:aspect-[1.15]">
          <Image
            src="/banners/the moringa tree.jpg"
            alt="A welcome from the team at Moringa Tree"
            fill
            sizes="(min-width: 768px) 50vw, 95vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Hospitality, with a sense of place.
          </h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            We believe a destination is more than a beautiful view. It is the
            welcome at the door, the meal you remember, and the people who make
            you feel at home.
          </p>
          <p className="mt-5 leading-8 text-muted-foreground">
            Across our restaurants and experiences, we create thoughtful moments
            rooted in Filipino warmth and the natural beauty of Palawan.
          </p>
          <Link href="/restaurants" className="text-link mt-6">
            Meet our restaurants <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SitePage>
  )
}
