import type { MenuItem } from '@/lib/places'

export default function BestSellerCard({
  item,
  badge,
}: {
  item: MenuItem
  badge?: string
}) {
  return (
    <article className="border-t border-border py-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-2xl leading-tight font-semibold">
          {item.name}
        </h3>
        {item.price && (
          <span className="shrink-0 pt-1 text-sm font-semibold">
            {item.price}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm font-medium text-olive-dark">
        {badge ?? item.label ?? item.category}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {item.description}
      </p>
    </article>
  )
}
