'use client'

import { useState } from 'react'

import type { Locale } from '@/i18n/config'

import { getDictionary } from '@/i18n/dictionaries'
import { calculateEmi, formatPrice } from '@/lib/format'

type Props = {
  defaultPrice?: number
  locale: Locale
}

const TENURES = [6, 12, 18, 24, 36]

export const EMICalculator = ({ defaultPrice = 150000, locale }: Props) => {
  const dict = getDictionary(locale)

  const [price, setPrice] = useState(defaultPrice)
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2))
  const [months, setMonths] = useState(12)
  const [annualRate, setAnnualRate] = useState(12)

  // The slider caps at the current price, so a stale value can never overshoot.
  const down = Math.min(downPayment, price)
  const result = calculateEmi({ annualRate, downPayment: down, months, price })

  const changePrice = (next: number) => {
    setPrice(next)
    setDownPayment(Math.round(next * 0.2))
  }

  return (
    <div className="grid gap-8 rounded-lg border border-[var(--border-soft)] bg-white p-6 shadow-card nav:grid-cols-2 nav:p-8">
      <div className="flex flex-col gap-5">
        <div>
          <label className="label" htmlFor="emi-price">
            {dict.financing.price}
          </label>
          <input
            className="field"
            id="emi-price"
            min={0}
            onChange={(event) => changePrice(Number(event.target.value))}
            step={1000}
            type="number"
            value={price}
          />
        </div>

        <div>
          <label className="label" htmlFor="emi-down">
            {dict.financing.downPayment}: {formatPrice(down, locale)}
          </label>
          <input
            className="w-full accent-[var(--accent)]"
            id="emi-down"
            max={price}
            min={0}
            onChange={(event) => setDownPayment(Number(event.target.value))}
            step={1000}
            type="range"
            value={down}
          />
        </div>

        <div>
          <label className="label" htmlFor="emi-tenure">
            {dict.financing.tenure}
          </label>
          <select
            className="field"
            id="emi-tenure"
            onChange={(event) => setMonths(Number(event.target.value))}
            value={months}
          >
            {TENURES.map((value) => (
              <option key={value} value={value}>
                {value} {dict.financing.months}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="emi-rate">
            {dict.financing.rate}: {annualRate}%
          </label>
          <input
            className="w-full accent-[var(--accent)]"
            id="emi-rate"
            max={24}
            min={0}
            onChange={(event) => setAnnualRate(Number(event.target.value))}
            step={0.5}
            type="range"
            value={annualRate}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-lg bg-[var(--accent-tint)] px-6 py-8">
        <p className="text-[13px] tracking-[0.3px] text-[var(--body)]">{dict.financing.monthly}</p>
        <p aria-live="polite" className="num mt-1.5 text-[42px] leading-none text-[var(--accent)]">
          {formatPrice(result.monthly, locale)}
          <span className="ml-1 font-sans text-sm font-normal text-[var(--muted)]">
            {dict.common.perMonth}
          </span>
        </p>

        <dl className="mt-7 flex flex-col gap-2.5 border-t border-[var(--accent)]/15 pt-5 text-[13px]">
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--body)]">{dict.financing.totalPayable}</dt>
            <dd className="num">{formatPrice(result.total, locale)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--body)]">{dict.financing.totalInterest}</dt>
            <dd className="num">{formatPrice(result.interest, locale)}</dd>
          </div>
        </dl>

        <p className="mt-6 text-[11px] leading-[1.7] text-[var(--muted)]">
          {dict.financing.disclaimer}
        </p>
      </div>
    </div>
  )
}
