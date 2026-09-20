'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { Locale } from '@/i18n/config'
import type { Bike } from '@/payload-types'

import { localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

type Props = {
  bikes: Bike[]
  locale: Locale
}

const MAX_SLOTS = 3

export const CompareTool = ({ bikes, locale }: Props) => {
  const dict = getDictionary(locale)

  // Fixed slots: an empty string keeps a column open rather than shifting the
  // later picks left, so clearing slot 1 does not promote slot 2 into it.
  const [selected, setSelected] = useState<string[]>(() =>
    Array.from({ length: MAX_SLOTS }, (_, index) => bikes[index]?.id ?? '').map((id, index) =>
      index < 2 ? id : '',
    ),
  )

  const chosen = selected
    .filter(Boolean)
    .map((id) => bikes.find((bike) => bike.id === id))
    .filter((bike): bike is Bike => Boolean(bike))

  /** Selecting a model that already sits in another slot moves it, never duplicates it. */
  const setSlot = (index: number, id: string) => {
    setSelected((current) =>
      current.map((value, slot) => {
        if (slot === index) return id
        return id && value === id ? '' : value
      }),
    )
  }

  // Union of the free-form spec labels across the chosen models.
  const specLabels = Array.from(
    new Set(chosen.flatMap((bike) => bike.specs.map((spec) => spec.label))),
  )

  const fixedRows: { label: string; value: (bike: Bike) => string }[] = [
    { label: dict.detail.range, value: (bike) => bike.range ?? '—' },
    { label: dict.detail.topSpeed, value: (bike) => bike.topSpeed ?? '—' },
    { label: dict.detail.motor, value: (bike) => bike.motor ?? '—' },
    { label: dict.detail.battery, value: (bike) => bike.battery ?? '—' },
    { label: dict.detail.chargeTime, value: (bike) => bike.chargeTime ?? '—' },
    { label: dict.models.filterCategory, value: (bike) => dict.models[bike.category] },
    { label: dict.models.filterType, value: (bike) => dict.models[bike.vehicleType] },
  ]

  return (
    <div>
      <div className="grid gap-4 rounded-lg border border-[var(--border-soft)] bg-white px-6 py-6 shadow-card sm:grid-cols-3">
        {Array.from({ length: MAX_SLOTS }).map((_, index) => (
          <div key={index}>
            <label className="label" htmlFor={`compare-slot-${index}`}>
              {dict.compare.pick} {index + 1}
            </label>
            <select
              className="field"
              id={`compare-slot-${index}`}
              onChange={(event) => setSlot(index, event.target.value)}
              value={selected[index] ?? ''}
            >
              <option value="">{dict.forms.selectPlaceholder}</option>
              {bikes.map((bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {chosen.length < 2 ? (
        <p className="mt-10 text-[15px] text-[var(--muted)]">{dict.compare.empty}</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-2xl border-collapse text-[13px]">
              <caption className="sr-only">{dict.compare.heading}</caption>
              <thead>
                <tr className="bg-[var(--accent)] text-left text-white">
                  <th
                    className="px-5 py-4 font-[family-name:var(--font-display)] text-[15px] font-bold"
                    scope="col"
                  >
                    {dict.compare.spec}
                  </th>
                  {chosen.map((bike) => (
                    <th
                      className="px-5 py-4 font-[family-name:var(--font-display)] text-[15px] font-bold"
                      key={bike.id}
                      scope="col"
                    >
                      <Link
                        className="transition-opacity duration-200 hover:opacity-80"
                        href={localePath(locale, `/models/${bike.slug}`)}
                      >
                        {bike.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fixedRows.map((row) => (
                  <tr className="border-b border-[#f0f0f0]" key={row.label}>
                    <th
                      className="border-r border-[#f0f0f0] bg-[var(--surface-faint)] px-5 py-4 text-left text-[13px] font-semibold text-[var(--body)]"
                      scope="row"
                    >
                      {row.label}
                    </th>
                    {chosen.map((bike) => (
                      <td className="px-5 py-4 text-[13px] text-[#333]" key={bike.id}>
                        {row.value(bike)}
                      </td>
                    ))}
                  </tr>
                ))}
                {specLabels.map((label) => (
                  <tr className="border-b border-[#f0f0f0]" key={label}>
                    <th
                      className="border-r border-[#f0f0f0] bg-[var(--surface-faint)] px-5 py-4 text-left text-[13px] font-semibold text-[var(--body)]"
                      scope="row"
                    >
                      {label}
                    </th>
                    {chosen.map((bike) => (
                      <td className="px-5 py-4 text-[13px] text-[#333]" key={bike.id}>
                        {bike.specs.find((spec) => spec.label === label)?.value ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
