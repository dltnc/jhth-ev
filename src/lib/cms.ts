import type { Locale } from '@/i18n/config'

import { isInternalHref, isSafeHref, resolveHref } from './links'

/**
 * Every field on the editable globals is optional, so a value can arrive as
 * `undefined` (global never saved), `null` (cleared) or `''` (saved blank).
 * `??` only catches the first two — anything blank has to fall back to the
 * translated default in `src/i18n/dictionaries.ts`.
 */
export const text = (value: null | string | undefined, fallback: string): string =>
  value?.trim() ? value : fallback

/** Like `text`, but with no default: `undefined` when the field is blank. */
export const optionalText = (value: null | string | undefined): string | undefined =>
  value?.trim() ? value : undefined

/** Numbers keep a deliberate `0`; only missing or non-finite values fall back. */
export const numberOr = (value: null | number | undefined, fallback: number): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

/** Array fields come back as `null` until the editor adds the first row. */
export const rows = <T>(value: null | T[] | undefined): T[] => value ?? []

/**
 * `hasMany` relationships are ID strings at depth 0 and documents deeper down.
 * Keeps the populated documents only, and drops anything that was never
 * published so a hand-picked list cannot leak a draft document.
 */
export const publishedDocs = <T extends { _status?: ('draft' | 'published') | null }>(
  value: (string | T)[] | null | undefined,
): T[] =>
  rows(value).filter(
    (entry): entry is T => typeof entry === 'object' && entry !== null && entry._status !== 'draft',
  )

/**
 * An editor-typed link that must stay on this site (the field asks for
 * `/test-ride`). Unsafe schemes and off-site URLs fall back to the default.
 */
export const internalHref = (
  value: null | string | undefined,
  locale: Locale,
  fallback: string,
): string => {
  const href = value?.trim()

  return href && isSafeHref(href) && isInternalHref(href) ? resolveHref(href, locale) : fallback
}

/** An editor-typed outbound link (app stores). `undefined` when unusable. */
export const externalHref = (
  value: null | string | undefined,
  locale: Locale,
): string | undefined => {
  const href = value?.trim()

  return href && isSafeHref(href) ? resolveHref(href, locale) : undefined
}
