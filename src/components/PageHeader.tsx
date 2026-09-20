import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  eyebrow?: string
  sub?: string
  title: string
}

/**
 * The design's dark page masthead: eyebrow in light green, oversized display
 * title, muted sub-line. Sits directly under the fixed 68px header.
 */
export const PageHeader = ({ children, eyebrow, sub, title }: Props) => (
  <div className="bg-[var(--ink)]">
    <div className="shell pt-12 pb-10">
      {eyebrow ? <p className="eyebrow-light mb-2.5">{eyebrow}</p> : null}
      <h1 className="page-title font-[family-name:var(--font-display)] font-bold text-white">
        {title}
      </h1>
      {sub ? <p className="mt-2.5 text-[15px] text-white/60">{sub}</p> : null}
      {children ? <div className="mt-7">{children}</div> : null}
    </div>
  </div>
)
