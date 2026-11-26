import type { Metadata } from 'next'
import { PageIntro, SitePage } from '@/components/site-shell'
import { RestaurantCollection } from '@/components/restaurant-collection'

export const metadata: Metadata = { title: 'Restaurants' }

export default function RestaurantsPage() {
  return (
    <SitePage>
      <PageIntro
        title="Find your kind of table."
        description="From Filipino family meals to Mediterranean plates and fresh seafood. Explore our four restaurants in El Nido."
      />
      <section className="page-width page-end" aria-label="Restaurants">
        <RestaurantCollection headingLevel="h2" />
      </section>
    </SitePage>
  )
}
