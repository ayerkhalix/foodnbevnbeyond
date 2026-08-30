import { Analytics } from '@vercel/analytics/next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const displayFont = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Food N Bev & Beyond Corporation — More places. More experiences.',
  description: 'A premium hospitality ecosystem bringing together restaurants and unforgettable experiences in El Nido, Palawan.',
  generator: 'v0.app',
  icons: {
    icon: '/logos/food%20n%20bev%20transparent.png',
    apple: '/logos/food%20n%20bev%20transparent.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-sand">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
