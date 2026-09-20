'use server'

import { headers } from 'next/headers'

import type { Locale } from '@/i18n/config'

import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPayloadClient } from '@/lib/payload'
import { clientIp, rateLimit } from '@/lib/rate-limit'
import { cleanText, isValidBdPhone, isValidEmail, normalisePhone, toIsoDate } from '@/lib/validation'

export type LeadState = {
  message: string
  status: 'error' | 'idle' | 'success'
}

export const initialLeadState: LeadState = { message: '', status: 'idle' }

const readLocale = (formData: FormData): Locale => {
  const value = formData.get('locale')

  return isLocale(value) ? value : defaultLocale
}

/**
 * Shared guards for both public lead forms (PRD §7.3): a hidden honeypot field
 * and a per-IP fixed window. A tripped honeypot returns the success message on
 * purpose — a bot that sees an error just retries with the field cleared.
 */
const guard = async (
  formData: FormData,
  locale: Locale,
  bucket: string,
): Promise<LeadState | null> => {
  const dict = getDictionary(locale)

  if (cleanText(formData.get('company'))) {
    return { message: dict.forms.successTestRide, status: 'success' }
  }

  const requestHeaders = await headers()
  const { ok } = rateLimit({ key: `${bucket}:${clientIp(requestHeaders)}`, limit: 5 })

  if (!ok) return { message: dict.forms.rateLimited, status: 'error' }

  return null
}

export const submitTestRide = async (
  _previous: LeadState,
  formData: FormData,
): Promise<LeadState> => {
  const locale = readLocale(formData)
  const dict = getDictionary(locale)

  const blocked = await guard(formData, locale, 'test-ride')
  if (blocked) return blocked

  const name = cleanText(formData.get('name'), 120)
  const phone = cleanText(formData.get('phone'), 32)
  const email = cleanText(formData.get('email'), 160)
  const model = cleanText(formData.get('model'), 64)
  const dealer = cleanText(formData.get('dealer'), 64)
  const city = cleanText(formData.get('city'), 120)
  const notes = cleanText(formData.get('notes'), 1000)
  const preferredDate = toIsoDate(formData.get('preferredDate'))

  if (!name || !phone || !model) return { message: dict.forms.required, status: 'error' }
  if (!isValidBdPhone(phone)) return { message: dict.forms.invalidPhone, status: 'error' }
  if (email && !isValidEmail(email)) return { message: dict.forms.error, status: 'error' }

  try {
    const payload = await getPayloadClient()

    // Only whitelisted fields are passed, so `status` keeps its `new` default
    // and nothing from the request can promote a lead.
    await payload.create({
      collection: 'test-ride-bookings',
      data: {
        name,
        city: city || undefined,
        dealer: dealer || undefined,
        email: email || undefined,
        model,
        notes: notes || undefined,
        phone: normalisePhone(phone),
        preferredDate: preferredDate ?? undefined,
        status: 'new',
      },
      locale,
      overrideAccess: false,
    })

    return { message: dict.forms.successTestRide, status: 'success' }
  } catch (error) {
    console.error('[test-ride] submission failed', error)

    return { message: dict.forms.error, status: 'error' }
  }
}

export const submitReservation = async (
  _previous: LeadState,
  formData: FormData,
): Promise<LeadState> => {
  const locale = readLocale(formData)
  const dict = getDictionary(locale)

  const blocked = await guard(formData, locale, 'reserve')
  if (blocked) return blocked

  const name = cleanText(formData.get('name'), 120)
  const phone = cleanText(formData.get('phone'), 32)
  const email = cleanText(formData.get('email'), 160)
  const model = cleanText(formData.get('model'), 64)
  const variant = cleanText(formData.get('variant'), 120)
  const notes = cleanText(formData.get('notes'), 1000)
  const depositInterest = formData.get('depositInterest') === 'on'

  if (!name || !phone || !model) return { message: dict.forms.required, status: 'error' }
  if (!isValidBdPhone(phone)) return { message: dict.forms.invalidPhone, status: 'error' }
  if (email && !isValidEmail(email)) return { message: dict.forms.error, status: 'error' }

  try {
    const payload = await getPayloadClient()

    // `depositPaid` is never accepted from the browser — it is admin-only
    // (Phase 2 payments), enforced by field access plus this whitelist.
    await payload.create({
      collection: 'reservations',
      data: {
        name,
        depositInterest,
        email: email || undefined,
        model,
        notes: notes || undefined,
        phone: normalisePhone(phone),
        status: 'new',
        variant: variant || undefined,
      },
      locale,
      overrideAccess: false,
    })

    return { message: dict.forms.successReserve, status: 'success' }
  } catch (error) {
    console.error('[reserve] submission failed', error)

    return { message: dict.forms.error, status: 'error' }
  }
}
