type Props = {
  align?: 'center' | 'left'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  /** Small label rendered above the heading. */
  eyebrow?: string
  subtitle?: null | string
  title: string
}

/** Display-font section header matching the design's eyebrow + title pairing. */
export const SectionHeading = ({
  align = 'left',
  as: Tag = 'h2',
  className,
  eyebrow,
  subtitle,
  title,
}: Props) => (
  <div
    className={`${align === 'center' ? 'mx-auto max-w-[820px] text-center' : 'max-w-[720px]'} ${
      className ?? ''
    }`}
  >
    {eyebrow ? <p className="eyebrow mb-2.5">{eyebrow}</p> : null}
    <Tag
      className={`font-[family-name:var(--font-display)] font-bold ${
        Tag === 'h1' ? 'page-title' : 'section-title'
      }`}
    >
      {title}
    </Tag>
    {subtitle ? (
      <p className="mt-3.5 text-[15px] leading-[1.75] text-[var(--body)]">{subtitle}</p>
    ) : null}
  </div>
)
