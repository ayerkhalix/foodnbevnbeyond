import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import type { RestaurantContact } from '@/lib/places'
export default function RestaurantContactLinks({
  contact,
}: {
  contact?: RestaurantContact
}) {
  if (!contact) return null
  return (
    <div className="contact-actions">
      {contact.phone && (
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
          <Phone className="size-4" aria-hidden="true" />
          {contact.phone}
        </a>
      )}
      {contact.email && (
        <a href={`mailto:${contact.email}`}>
          <Mail className="size-4" aria-hidden="true" />
          <span>{contact.email}</span>
        </a>
      )}
      {contact.socials?.map((social) => (
        <a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noreferrer"
        >
          {social.label}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
