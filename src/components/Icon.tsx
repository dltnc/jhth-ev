import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'arrowRight'
  | 'battery'
  | 'charge'
  | 'check'
  | 'chevronDown'
  | 'chevronRight'
  | 'close'
  | 'download'
  | 'eco'
  | 'facebook'
  | 'globe'
  | 'instagram'
  | 'linkedin'
  | 'location'
  | 'mail'
  | 'menu'
  | 'phone'
  | 'range'
  | 'service'
  | 'speed'
  | 'star'
  | 'tiktok'
  | 'wallet'
  | 'warranty'
  | 'whatsapp'
  | 'x'
  | 'youtube'

/** Inline stroke icons — no icon dependency, so nothing is fetched at build. */
const paths: Record<IconName, ReactNode> = {
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  battery: (
    <>
      <rect height="9" rx="2" width="14" x="2" y="7.5" />
      <path d="M19 10.5v3" />
    </>
  ),
  charge: <path d="M13 3L5 14h5l-1 7 8-11h-5l1-7z" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  chevronRight: <path d="M9 5.5l6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  download: <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />,
  eco: <path d="M20 4C10 4 4 9.5 4 20c10.5 0 16-6 16-16zM5 19L15 9" />,
  facebook: <path d="M14.5 8.5H17V5.5h-2.5A4 4 0 0010.5 9.5V11.5H8.5v3h2V21.5h3v-7h2.5l.8-3H13.5V9.8c0-.7.4-1.3 1-1.3z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  instagram: (
    <>
      <rect height="16" rx="4.5" width="16" x="4" y="4" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.4v.01" />
    </>
  ),
  linkedin: (
    <>
      <path d="M7 10.5V18M7 6.6v.01M12 18v-4.2a2.4 2.4 0 014.8 0V18M12 10.5V18" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-6.2 7-11A7 7 0 105 10c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  mail: (
    <>
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </>
  ),
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  phone: (
    <path d="M6 3h3.5l1.8 4.5-2.4 1.6a11.5 11.5 0 005.9 5.9l1.6-2.4L21 14.5V18a2.5 2.5 0 01-2.7 2.5A16.5 16.5 0 013.5 5.7A2.5 2.5 0 016 3z" />
  ),
  range: <path d="M3 17.5l5.5-5.5 3.5 3.5L21 6.5M21 6.5h-5m5 0v5" />,
  service: <path d="M4.5 19.5l6-6M14 4.6a4.5 4.5 0 105.8 5.8l-8.4 8.4a2 2 0 01-2.8 0l-2.4-2.4a2 2 0 010-2.8L14 4.6z" />,
  speed: (
    <>
      <path d="M4 18a8 8 0 1116 0" />
      <path d="M12 18l4.5-5" />
    </>
  ),
  star: <path d="M12 3.5l2.8 5.8 6.2.9-4.5 4.3 1.1 6.1L12 17.7l-5.6 2.9 1.1-6.1L3 10.2l6.2-.9L12 3.5z" />,
  tiktok: <path d="M15 4v9.5a4 4 0 11-4-4M15 4a4.5 4.5 0 004.5 4.5" />,
  wallet: (
    <>
      <path d="M3 8a2 2 0 012-2h13a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      <path d="M3 8l12-3.5V6M16.5 12.5v.01" />
    </>
  ),
  warranty: (
    <>
      <path d="M12 3l8 3v6.2c0 4.7-3.6 7.6-8 8.8-4.4-1.2-8-4.1-8-8.8V6l8-3z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  whatsapp: <path d="M21 12a8.5 8.5 0 01-12.5 7.5L3.5 21l1.6-4.8A8.5 8.5 0 1121 12zM9 9.5c0 3.3 2.2 5.5 5.5 5.5" />,
  x: <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />,
  youtube: (
    <>
      <rect height="13" rx="3.5" width="18" x="3" y="5.5" />
      <path d="M11 9.5l4.5 2.5L11 14.5z" />
    </>
  ),
}

export type IconProps = {
  className?: string
  name: IconName
  size?: number
} & Omit<SVGProps<SVGSVGElement>, 'children' | 'name'>

export const Icon = ({ className, name, size = 20, ...rest }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    focusable="false"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.7}
    viewBox="0 0 24 24"
    width={size}
    {...rest}
  >
    {paths[name]}
  </svg>
)
