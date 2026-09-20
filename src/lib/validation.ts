/** Bangladeshi mobile numbers: 11 digits starting `01[3-9]`, optional +880. */
const BD_MOBILE = /^(?:\+?880|0)1[3-9]\d{8}$/

export const normalisePhone = (raw: string): string => raw.replace(/[\s\-().]/g, '')

export const isValidBdPhone = (raw: null | string | undefined): boolean =>
  Boolean(raw) && BD_MOBILE.test(normalisePhone(raw!))

export const isValidEmail = (raw: null | string | undefined): boolean =>
  Boolean(raw) && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw!.trim())

/** Trim, collapse whitespace and cap length before anything reaches the DB. */
export const cleanText = (value: FormDataEntryValue | null, maxLength = 500): string => {
  if (typeof value !== 'string') return ''

  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export const toIsoDate = (value: FormDataEntryValue | null): null | string => {
  if (typeof value !== 'string' || !value.trim()) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}
