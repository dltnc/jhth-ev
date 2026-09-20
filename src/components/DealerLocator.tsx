'use client'

import { useState } from 'react'

import type { Locale } from '@/i18n/config'
import type { Dealer } from '@/payload-types'

import { getDictionary } from '@/i18n/dictionaries'
import { mapsHref, telHref } from '@/lib/links'

import { Icon } from './Icon'

type Props = {
  dealers: Dealer[]
  locale: Locale
}

type Division = Dealer['division']

const serviceIcons = {
  charging: 'charge',
  sales: 'wallet',
  service: 'service',
} as const

/**
 * Filterable list with Google Maps deep links rather than an embedded map —
 * no map SDK key is configured, and a list is faster and keyboard-accessible.
 */
export const DealerLocator = ({ dealers, locale }: Props) => {
  const dict = getDictionary(locale)
  const [division, setDivision] = useState<'all' | Division>('all')

  const divisions = Array.from(new Set(dealers.map((dealer) => dealer.division))).sort()
  const visible = division === 'all' ? dealers : dealers.filter((d) => d.division === division)

  return (
    <div>
      <div className="max-w-xs rounded-lg border border-[var(--border-soft)] bg-white px-5 py-4">
        <label className="label block" htmlFor="dealer-division">
          {dict.dealers.filterDivision}
        </label>
        <select
          className="field"
          id="dealer-division"
          onChange={(event) => setDivision(event.target.value as typeof division)}
          value={division}
        >
          <option value="all">{dict.models.all}</option>
          {divisions.map((value) => (
            <option key={value} value={value}>
              {dict.dealers.divisions[value] ?? value}
            </option>
          ))}
        </select>
      </div>

      {visible.length ? (
        <ul className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {visible.map((dealer) => {
            const phone = telHref(dealer.phone)

            return (
              <li
                className="flex flex-col rounded-lg border border-[var(--border-soft)] bg-white p-5 shadow-card"
                key={dealer.id}
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
                  {dealer.name}
                </h3>
                <p className="mt-1 text-xs tracking-wide text-[var(--accent)] uppercase">
                  {dict.dealers.divisions[dealer.division] ?? dealer.division} · {dealer.district}
                </p>
                <p className="mt-3 text-sm text-[var(--muted)]">{dealer.address}</p>

                {dealer.hours ? (
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    <span className="font-medium text-[var(--fg)]">{dict.dealers.hours}:</span>{' '}
                    {dealer.hours}
                  </p>
                ) : null}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {dealer.servicesOffered.map((service) => (
                    <li
                      className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]"
                      key={service}
                    >
                      <Icon
                        className="text-[var(--accent)]"
                        name={serviceIcons[service] ?? 'check'}
                        size={13}
                      />
                      {dict.dealers[service]}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {phone ? (
                    <a className="btn btn-sm btn-secondary" href={phone}>
                      <Icon name="phone" size={14} />
                      {dealer.phone}
                    </a>
                  ) : null}
                  <a
                    className="btn btn-sm btn-secondary"
                    href={mapsHref(`${dealer.name}, ${dealer.address}`, dealer.location)}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={dict.dealers.mapNote}
                  >
                    <Icon name="location" size={14} />
                    {dict.actions.getDirections}
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="mt-10 text-[var(--muted)]">{dict.dealers.noResults}</p>
      )}
    </div>
  )
}
