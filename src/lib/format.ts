import type { Locale } from '@/i18n/config'

/**
 * Bangladesh uses the lakh/crore grouping (2,48,000), which `en-IN` produces.
 * Bangla renders Bengali digits via `bn-BD`.
 */
const intlLocale = (locale: Locale) => (locale === 'bn' ? 'bn-BD' : 'en-IN')

export const formatNumber = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 0 }).format(value)

/** Prices are always BDT, shown with the taka sign rather than the `BDT` code. */
export const formatPrice = (value: number, locale: Locale): string =>
  `৳${formatNumber(value, locale)}`

export const formatDate = (value: null | string | undefined, locale: Locale): string => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
  }).format(date)
}

export type EmiInput = {
  annualRate: number
  downPayment: number
  months: number
  price: number
}

export type EmiResult = {
  interest: number
  monthly: number
  principal: number
  total: number
}

/** Standard reducing-balance instalment. Indicative only — see PRD §5.7. */
export const calculateEmi = ({ annualRate, downPayment, months, price }: EmiInput): EmiResult => {
  const principal = Math.max(0, price - downPayment)
  const tenure = Math.max(1, Math.round(months))
  const monthlyRate = annualRate / 100 / 12

  const monthly =
    monthlyRate === 0
      ? principal / tenure
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1)

  const total = monthly * tenure

  return {
    interest: Math.round(total - principal),
    monthly: Math.round(monthly),
    principal: Math.round(principal),
    total: Math.round(total),
  }
}
