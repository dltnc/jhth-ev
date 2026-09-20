'use client'

import { useActionState } from 'react'

import type { LeadState } from '@/actions/leads'
import type { Locale } from '@/i18n/config'

import { initialLeadState, submitTestRide } from '@/actions/leads'
import { getDictionary } from '@/i18n/dictionaries'

import { Icon } from './Icon'

type Option = { id: string; label: string }

type Props = {
  bikes: Option[]
  dealers: Option[]
  defaultModel?: string
  locale: Locale
}

export const TestRideForm = ({ bikes, dealers, defaultModel, locale }: Props) => {
  const dict = getDictionary(locale)
  const [state, formAction, pending] = useActionState<LeadState, FormData>(
    submitTestRide,
    initialLeadState,
  )

  if (state.status === 'success') {
    return (
      <div className="rounded-lg bg-[var(--accent-tint)] px-6 py-12 text-center" role="status">
        <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <Icon name="check" size={26} />
        </span>
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-[26px] font-bold text-[var(--accent)]">
          {dict.forms.testRideHeading}
        </h2>
        <p className="mx-auto max-w-[420px] text-[15px] leading-[1.75] text-[var(--body)]">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input name="locale" type="hidden" value={locale} />

      {/* Honeypot — hidden from users, filled by naive bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="tr-company">Company</label>
        <input autoComplete="off" id="tr-company" name="company" tabIndex={-1} type="text" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="tr-name">
            {dict.forms.name} *
          </label>
          <input
            autoComplete="name"
            className="field"
            id="tr-name"
            maxLength={120}
            name="name"
            required
            type="text"
          />
        </div>
        <div>
          <label className="label" htmlFor="tr-phone">
            {dict.forms.phone} *
          </label>
          <input
            autoComplete="tel"
            className="field"
            id="tr-phone"
            inputMode="tel"
            name="phone"
            placeholder="01712345678"
            required
            type="tel"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="tr-email">
            {dict.forms.email}
          </label>
          <input autoComplete="email" className="field" id="tr-email" name="email" type="email" />
        </div>
        <div>
          <label className="label" htmlFor="tr-city">
            {dict.forms.city}
          </label>
          <input className="field" id="tr-city" name="city" type="text" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="tr-model">
            {dict.forms.model} *
          </label>
          <select
            className="field"
            defaultValue={defaultModel ?? ''}
            id="tr-model"
            name="model"
            required
          >
            <option disabled value="">
              {dict.forms.selectPlaceholder}
            </option>
            {bikes.map((bike) => (
              <option key={bike.id} value={bike.id}>
                {bike.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="tr-dealer">
            {dict.forms.dealer}
          </label>
          <select className="field" defaultValue="" id="tr-dealer" name="dealer">
            <option value="">{dict.forms.selectPlaceholder}</option>
            {dealers.map((dealer) => (
              <option key={dealer.id} value={dealer.id}>
                {dealer.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="tr-date">
          {dict.forms.preferredDate}
        </label>
        <input className="field" id="tr-date" name="preferredDate" type="datetime-local" />
      </div>

      <div>
        <label className="label" htmlFor="tr-notes">
          {dict.forms.notes}
        </label>
        <textarea className="field min-h-24" id="tr-notes" maxLength={1000} name="notes" />
      </div>

      {state.status === 'error' ? (
        <p className="text-sm text-[#c0392b]" role="alert">
          {state.message}
        </p>
      ) : null}

      <button className="btn btn-primary mt-1 w-full" disabled={pending} type="submit">
        {pending ? dict.actions.submitting : dict.actions.bookTestRide}
      </button>

      <p className="text-center text-[11px] leading-[1.7] text-[var(--muted)]">
        {dict.forms.consent}
      </p>
    </form>
  )
}
