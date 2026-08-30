import Link from 'next/link'
import { ExternalLink, Mail, Phone } from 'lucide-react'
import type { RestaurantContact } from '@/lib/places'

export default function RestaurantContactLinks({ contact }: { contact?: RestaurantContact }) {
  if (!contact?.phone && !contact?.email && !contact?.socials?.length) return null

  return (
    <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[.18em] text-white/75">
      {contact.phone && (
        <Link
          href={`tel:${contact.phone.replace(/\s/g, '')}`}
          className="inline-flex items-center gap-2 border border-white/25 bg-ink/30 px-4 py-3 transition hover:border-coral hover:text-coral"
        >
          <Phone className="size-4" />
          {contact.phone}
        </Link>
      )}
      {contact.email && (
        <Link
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 border border-white/25 bg-ink/30 px-4 py-3 transition hover:border-coral hover:text-coral"
        >
          <Mail className="size-4" />
          Email
        </Link>
      )}
      {contact.socials?.map((social) => (
        <Link
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-white/25 bg-ink/30 px-4 py-3 transition hover:border-coral hover:text-coral"
        >
          <ExternalLink className="size-4" />
          {social.label}
        </Link>
      ))}
    </div>
  )
}
