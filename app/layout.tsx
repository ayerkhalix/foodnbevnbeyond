import { Analytics } from '@vercel/analytics/next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Food N Bev & Beyond — Restaurants in El Nido, Palawan',
    template: '%s | Food N Bev & Beyond',
  },
  description:
    'Find your table at Coco Resto, The Lighthouse, Moringa Tree, and Sa Kurbada. Browse menus and contact our restaurants in El Nido, Palawan.',
  icons: {
    icon: '/logos/food%20n%20bev%20transparent.png',
    apple: '/logos/food%20n%20bev%20transparent.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#596438',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-sand" data-scroll-behavior="smooth">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
