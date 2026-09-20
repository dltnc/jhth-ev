'use client'

import { useActionState } from 'react'

import type { LeadState } from '@/actions/leads'
import type { Locale } from '@/i18n/config'

import { initialLeadState, submitReservation } from '@/actions/leads'
import { getDictionary } from '@/i18n/dictionaries'

import { Icon } from './Icon'

type Option = { id: string; label: string }

type Props = {
  bikes: Option[]
  defaultModel?: string
  locale: Locale
  /** Variant / colour names for the selected model, when known. */
  variants?: string[]
}

export const ReserveForm = ({ bikes, defaultModel, locale, variants }: Props) => {
  const dict = getDictionary(locale)
  const [state, formAction, pending] = useActionState<LeadState, FormData>(
    submitReservation,
    initialLeadState,
  )

  if (state.status === 'success') {
    return (
      <div className="rounded-lg bg-[var(--accent-tint)] px-6 py-12 text-center" role="status">
        <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <Icon name="check" size={26} />
        </span>
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-[26px] font-bold text-[var(--accent)]">
          {dict.forms.reserveHeading}
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
        <label htmlFor="rv-company">Company</label>
        <input autoComplete="off" id="rv-company" name="company" tabIndex={-1} type="text" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="rv-name">
            {dict.forms.name} *
          </label>
          <input
            autoComplete="name"
            className="field"
            id="rv-name"
            maxLength={120}
            name="name"
            required
            type="text"
          />
        </div>
        <div>
          <label className="label" htmlFor="rv-phone">
            {dict.forms.phone} *
          </label>
          <input
            autoComplete="tel"
            className="field"
            id="rv-phone"
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
          <label className="label" htmlFor="rv-email">
            {dict.forms.email}
          </label>
          <input autoComplete="email" className="field" id="rv-email" name="email" type="email" />
        </div>
        <div>
          <label className="label" htmlFor="rv-model">
            {dict.forms.model} *
          </label>
          <select
            className="field"
            defaultValue={defaultModel ?? ''}
            id="rv-model"
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
      </div>

      <div>
        <label className="label" htmlFor="rv-variant">
          {dict.forms.variant}
        </label>
        {variants?.length ? (
          <select className="field" defaultValue="" id="rv-variant" name="variant">
            <option value="">{dict.forms.selectPlaceholder}</option>
            {variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        ) : (
          <input className="field" id="rv-variant" maxLength={120} name="variant" type="text" />
        )}
      </div>

      <div>
        <label className="label" htmlFor="rv-notes">
          {dict.forms.notes}
        </label>
        <textarea className="field min-h-24" id="rv-notes" maxLength={1000} name="notes" />
      </div>

      <label className="flex items-start gap-3 text-[13px] text-[var(--body)]">
        <input
          className="mt-0.5 size-4 accent-[var(--accent)]"
          name="depositInterest"
          type="checkbox"
        />
        <span>{dict.forms.depositInterest}</span>
      </label>

      {state.status === 'error' ? (
        <p className="text-sm text-[#c0392b]" role="alert">
          {state.message}
        </p>
      ) : null}

      <button className="btn btn-primary mt-1 w-full" disabled={pending} type="submit">
        {pending ? dict.actions.submitting : dict.actions.reserveNow}
      </button>

      <p className="text-center text-[11px] leading-[1.7] text-[var(--muted)]">
        {dict.forms.consent}
      </p>
    </form>
  )
}
