type Item = { label: string; value: string }

/** Green counter band, four across on desktop and two on small screens. */
export const StatsBand = ({ items }: { items: Item[] }) => {
  if (!items.length) return null

  return (
    <div className="bg-[var(--accent)]">
      <dl className="shell grid grid-cols-2 md:grid-cols-4">
        {items.map((item, index) => (
          <div
            className={`px-5 py-7 text-center ${
              index < items.length - 1 ? 'md:border-r md:border-white/20' : ''
            }`}
            key={item.label}
          >
            <dd className="num text-4xl leading-none text-white">{item.value}</dd>
            <dt className="mt-1 text-xs tracking-[0.3px] text-white/75">{item.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}
