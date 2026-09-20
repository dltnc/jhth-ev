'use client'

import { useMemo, useState } from 'react'

import { Icon } from './Icon'

export type FaqItem = {
  answer: string
  category: string
  id: string
  question: string
}

type Props = {
  allLabel: string
  categoryLabels: Record<string, string>
  emptyLabel: string
  items: FaqItem[]
  showFilters?: boolean
}

/**
 * `<details>` keeps the accordion working without JavaScript; the category
 * filter is the only part that needs state.
 */
export const FAQAccordion = ({
  allLabel,
  categoryLabels,
  emptyLabel,
  items,
  showFilters = true,
}: Props) => {
  const [active, setActive] = useState('all')

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category).filter(Boolean))),
    [items],
  )

  const visible = active === 'all' ? items : items.filter((item) => item.category === active)

  return (
    <div>
      {showFilters && categories.length > 1 ? (
        <div className="mb-8 flex flex-wrap gap-2.5">
          {['all', ...categories].map((category) => (
            <button
              aria-pressed={active === category}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                active === category
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                  : 'border-[var(--border-strong)] bg-white text-[var(--body)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
              key={category}
              onClick={() => setActive(category)}
              type="button"
            >
              {category === 'all' ? allLabel : (categoryLabels[category] ?? category)}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length ? (
        <ul className="flex flex-col gap-3">
          {visible.map((item) => (
            <li
              className="overflow-hidden rounded-lg border border-[var(--border-soft)] bg-white"
              key={item.id}
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-[18px] text-[15px] font-medium">
                  <span>{item.question}</span>
                  <Icon
                    className="shrink-0 text-[var(--accent)] transition-transform duration-200 group-open:rotate-180"
                    name="chevronDown"
                    size={18}
                  />
                </summary>
                <p className="border-t border-[#f0f0f0] px-5 py-[18px] text-sm leading-[1.8] text-[var(--body)]">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[15px] text-[var(--muted)]">{emptyLabel}</p>
      )}
    </div>
  )
}
