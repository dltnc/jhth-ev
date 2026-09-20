'use client'

import { useState } from 'react'

import type { Locale } from '@/i18n/config'
import type { Bike } from '@/payload-types'

import { getDictionary } from '@/i18n/dictionaries'

import { BikeCard } from './BikeCard'

type Props = {
  bikes: Bike[]
  locale: Locale
}

const CATEGORIES: Bike['category'][] = ['commuter', 'sport', 'cargo']
const TYPES: Bike['vehicleType'][] = ['ebike', 'escooter', 'ecycle']

/** Client-side filtering so the models page stays statically rendered. */
export const ModelsExplorer = ({ bikes, locale }: Props) => {
  const dict = getDictionary(locale)

  const [category, setCategory] = useState<'all' | Bike['category']>('all')
  const [vehicleType, setVehicleType] = useState<'all' | Bike['vehicleType']>('all')

  const filtered = bikes.filter(
    (bike) =>
      (category === 'all' || bike.category === category) &&
      (vehicleType === 'all' || bike.vehicleType === vehicleType),
  )

  const dirty = category !== 'all' || vehicleType !== 'all'

  const reset = () => {
    setCategory('all')
    setVehicleType('all')
  }

  // Tab counts ignore the secondary filters so the numbers stay stable.
  const tabs: { count: number; id: 'all' | Bike['vehicleType']; label: string }[] = [
    { count: bikes.length, id: 'all', label: dict.models.all },
    ...TYPES.map((type) => ({
      count: bikes.filter((bike) => bike.vehicleType === type).length,
      id: type,
      label: dict.models[type],
    })),
  ]

  return (
    <div>
      <div className="sticky top-[68px] z-50 border-b border-[var(--border)] bg-white">
        <div className="shell flex overflow-x-auto">
          {tabs.map((tab) => {
            const active = tab.id === vehicleType

            return (
              <button
                aria-pressed={active}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  active
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent text-[var(--body)] hover:text-[var(--fg)]'
                }`}
                key={tab.id}
                onClick={() => setVehicleType(tab.id)}
                type="button"
              >
                {tab.label}
                <span
                  className={`rounded-[10px] px-2 py-0.5 text-[11px] font-semibold ${
                    active
                      ? 'bg-[var(--accent-tint)] text-[var(--accent)]'
                      : 'bg-[#f0f0f0] text-[var(--muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-[var(--bg-subtle)] pt-12 pb-20">
        <div className="shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 rounded-lg border border-[var(--border-soft)] bg-white px-5 py-4">
            <div>
              <label className="label block" htmlFor="filter-category">
                {dict.models.filterCategory}
              </label>
              <select
                className="field"
                id="filter-category"
                onChange={(event) => setCategory(event.target.value as typeof category)}
                value={category}
              >
                <option value="all">{dict.models.all}</option>
                {CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {dict.models[value]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <p aria-live="polite" className="text-[13px] text-[var(--muted)]">
                {filtered.length} {dict.models.results}
              </p>
              {dirty ? (
                <button
                  className="text-[13px] font-semibold text-[var(--accent)]"
                  onClick={reset}
                  type="button"
                >
                  {dict.actions.clearFilters}
                </button>
              ) : null}
            </div>
          </div>

          {filtered.length ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {filtered.map((bike, index) => (
                <li key={bike.id}>
                  <BikeCard bike={bike} locale={locale} priority={index < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-20 text-center text-[15px] text-[var(--muted)]">
              {dict.models.noResults}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
