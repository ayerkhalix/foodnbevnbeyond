import Image from 'next/image'
import type { MenuItem } from '@/lib/places'

export default function BestSellerCard({ item, badge }: { item: MenuItem; badge?: string }) {
  return (
    <article className="group overflow-hidden rounded border border-ink/10 bg-white transition-shadow hover:shadow-md">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-coral">{badge ?? item.label ?? item.category}</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl leading-tight">{item.name}</h3>
          {item.price && <span className="pt-1 text-sm font-semibold text-ink/70">{item.price}</span>}
        </div>
        <p className="mt-3 text-sm leading-6 text-ink/60">{item.description}</p>
      </div>
    </article>
  )
}
