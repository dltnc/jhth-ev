import type { Locale } from '@/i18n/config'
import type { Homepage, SiteSetting, VehicleType } from '@/payload-types'

import { cache } from 'react'

import { getPayloadClient } from './payload'

/**
 * Site chrome (nav, footer, contact details). Deliberately fault-tolerant: a
 * fresh install has no saved global yet, and the header should still render.
 * De-duped per request with `cache`.
 */
export const getSiteSettings = cache(async (locale: Locale): Promise<null | SiteSetting> => {
  try {
    const payload = await getPayloadClient()

    return await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
      locale,
    })
  } catch (error) {
    console.error('[site-settings] could not be loaded', error)

    return null
  }
})

/**
 * Editable home page copy. Every field is optional in the CMS, so callers treat
 * a `null` global and an empty field the same way: fall back to the dictionary.
 */
export const getHomepage = cache(async (locale: Locale): Promise<null | Homepage> => {
  try {
    const payload = await getPayloadClient()

    return await payload.findGlobal({ slug: 'homepage', depth: 2, locale })
  } catch (error) {
    console.error('[homepage] could not be loaded', error)

    return null
  }
})

/** Copy and artwork for the three vehicle-family landing pages. */
export const getVehicleTypes = cache(async (locale: Locale): Promise<null | VehicleType> => {
  try {
    const payload = await getPayloadClient()

    return await payload.findGlobal({ slug: 'vehicle-types', depth: 1, locale })
  } catch (error) {
    console.error('[vehicle-types] could not be loaded', error)

    return null
  }
})
