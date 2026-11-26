'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

const links = [
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/menu', label: 'Menus' },
  { href: '/about', label: 'Our story' },
  { href: '/contact', label: 'Contact' },
]

export function SiteNavLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href' | 'onNavigate'> & {
  href: string
}) {
  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        const { pathname, search, hash } = window.location
        if (pathname !== href || search || hash) return

        event.preventDefault()
        document.getElementById('content')?.focus({ preventScroll: true })
        window.scrollTo({ top: 0, behavior: 'instant' })
      }}
    />
  )
}

export function SiteNavigation() {
  const pathname = usePathname()
  const section = pathname.endsWith('/menu')
    ? '/menu'
    : pathname.startsWith('/places/') || pathname === '/explore'
      ? '/restaurants'
      : pathname
  return (
    <nav aria-label="Main navigation" className="nav-links">
      {links.map((link) => (
        <SiteNavLink
          key={link.href}
          href={link.href}
          aria-current={
            section === link.href
              ? pathname === link.href
                ? 'page'
                : 'location'
              : undefined
          }
        >
          {link.label}
        </SiteNavLink>
      ))}
    </nav>
  )
}
