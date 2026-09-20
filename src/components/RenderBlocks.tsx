import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { Page } from '@/payload-types'
import type { IconName } from './Icon'

import { getDictionary } from '@/i18n/dictionaries'
import { isSafeHref, resolveHref } from '@/lib/links'
import { resolveMedia } from '@/lib/media'
import { getFaqs, getTestimonials } from '@/lib/queries'

import { FAQAccordion } from './FAQAccordion'
import { Icon } from './Icon'
import { MediaImage } from './MediaImage'
import { PhotoHero } from './PhotoHero'
import { RichText } from './RichText'
import { TestimonialCard } from './TestimonialCard'

type PageBlock = NonNullable<Page['blocks']>[number]
type BlockOf<T extends PageBlock['blockType']> = Extract<PageBlock, { blockType: T }>

const featureIcons: Record<string, IconName> = {
  battery: 'battery',
  chargeTime: 'charge',
  cost: 'wallet',
  eco: 'eco',
  range: 'range',
  service: 'service',
  speed: 'speed',
  warranty: 'warranty',
}

const HeroBlock = ({ block, locale }: { block: BlockOf<'hero'>; locale: Locale }) => {
  const image = resolveMedia(block.backgroundImage, 'hero')
  const ctaHref = isSafeHref(block.cta?.url) ? resolveHref(block.cta.url!, locale) : null

  return (
    <PhotoHero
      ctaHref={ctaHref ?? undefined}
      ctaLabel={block.cta?.label ?? undefined}
      media={image}
      sub={block.subheading ?? undefined}
      title={block.heading}
    />
  )
}

const RichTextBlock = ({ block }: { block: BlockOf<'richText'> }) => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-[760px] px-6">
      <RichText data={block.content} />
    </div>
  </section>
)

const FeatureGridBlock = ({ block }: { block: BlockOf<'featureGrid'> }) => (
  <section className="bg-[var(--bg-subtle)] py-20">
    <div className="shell">
      {block.heading ? (
        <h2 className="mb-9 text-center font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,44px)] leading-[1.1] font-bold">
          {block.heading}
        </h2>
      ) : null}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {(block.features ?? []).map((feature) => (
          <li
            className="rounded-lg border border-[var(--border-soft)] bg-white px-7 py-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            key={feature.id ?? feature.title}
          >
            <span className="mb-5 flex size-12 items-center justify-center rounded-[10px] bg-[var(--accent-tint)] text-[var(--accent)]">
              <Icon name={featureIcons[feature.icon ?? ''] ?? 'check'} size={24} />
            </span>
            <h3 className="mb-2.5 font-[family-name:var(--font-display)] text-[22px] font-bold">
              {feature.title}
            </h3>
            {feature.description ? (
              <p className="text-sm leading-[1.75] text-[var(--body)]">{feature.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  </section>
)

const GalleryBlock = ({ block }: { block: BlockOf<'gallery'> }) => {
  const images = (block.images ?? [])
    .map((entry) => ({
      caption: entry.caption,
      id: entry.id,
      media: resolveMedia(entry.image, 'card'),
    }))
    .filter((entry) => entry.media)

  if (!images.length) return null

  return (
    <section className="bg-white py-20">
      <div className="shell">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {images.map((entry) => (
            <li key={entry.id ?? entry.media!.url}>
              <figure>
                <span className="relative block aspect-4/3 overflow-hidden rounded-lg">
                  <MediaImage className="object-cover" fill media={entry.media} />
                </span>
                {entry.caption ? (
                  <figcaption className="mt-2.5 text-[11px] text-[var(--muted)]">
                    {entry.caption}
                  </figcaption>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const CtaBlock = ({ block, locale }: { block: BlockOf<'cta'>; locale: Locale }) => (
  <section className="bg-[var(--accent-deep)] px-6 py-16 text-center">
    <h2 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(28px,4vw,44px)] leading-[1.1] font-bold text-white">
      {block.heading}
    </h2>
    {block.text ? (
      <p className="mx-auto mb-7 max-w-[560px] text-[15px] leading-[1.75] text-white/75">
        {block.text}
      </p>
    ) : null}
    <div className="flex flex-wrap justify-center gap-3">
      {(block.buttons ?? [])
        .filter((button) => isSafeHref(button.url))
        .map((button) => (
          <Link
            className={`btn ${button.style === 'secondary' ? 'btn-glass' : 'btn-light'}`}
            href={resolveHref(button.url, locale)}
            key={button.id ?? button.url}
          >
            {button.label}
          </Link>
        ))}
    </div>
  </section>
)

const SpecTableBlock = ({ block }: { block: BlockOf<'specTable'> }) => {
  const rows = block.rows ?? []
  if (!rows.length) return null

  return (
    <section className="bg-[var(--bg-subtle)] py-20">
      <div className="mx-auto max-w-[900px] px-6">
        {block.heading ? (
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-[28px] font-bold">
            {block.heading}
          </h2>
        ) : null}
        <dl className="overflow-hidden rounded-lg border border-[var(--border)] bg-white">
          {rows.map((row, index) => (
            <div
              className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] ${
                index < rows.length - 1 ? 'border-b border-[#f0f0f0]' : ''
              }`}
              key={row.id ?? row.label}
            >
              <dt className="bg-[var(--surface-faint)] px-5 py-4 text-[13px] font-semibold text-[var(--body)] sm:border-r sm:border-[#f0f0f0]">
                {row.label}
              </dt>
              <dd className="px-5 py-4 text-[13px] text-[#333]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

const TestimonialsBlock = async ({
  block,
  locale,
}: {
  block: BlockOf<'testimonialsSection'>
  locale: Locale
}) => {
  const testimonials = await getTestimonials({ locale })
  if (!testimonials.length) return null

  return (
    <section className="bg-[var(--bg-subtle)] py-20">
      <div className="shell">
        <h2 className="mb-9 text-center font-[family-name:var(--font-display)] text-[32px] font-bold">
          {block.heading ?? getDictionary(locale).home.testimonialsHeading}
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const FaqBlock = async ({ block, locale }: { block: BlockOf<'faqSection'>; locale: Locale }) => {
  const category = !block.category || block.category === 'all' ? undefined : block.category
  const faqs = await getFaqs({ category, locale })
  if (!faqs.length) return null

  const dict = getDictionary(locale)

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[860px] px-6">
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-[28px] font-bold">
          {block.heading ?? dict.faq.heading}
        </h2>
        <FAQAccordion
          allLabel={dict.faq.all}
          categoryLabels={{
            battery: dict.faq.battery,
            buying: dict.faq.buying,
            general: dict.faq.general,
            riding: dict.faq.riding,
            warranty: dict.faq.warranty,
          }}
          emptyLabel={dict.faq.empty}
          items={faqs.map((faq) => ({
            answer: faq.answer,
            category: faq.category ?? 'general',
            id: faq.id,
            question: faq.question,
          }))}
          showFilters={!category}
        />
      </div>
    </section>
  )
}

const renderBlock = (block: PageBlock, locale: Locale) => {
  switch (block.blockType) {
    case 'cta':
      return <CtaBlock block={block} locale={locale} />
    case 'faqSection':
      return <FaqBlock block={block} locale={locale} />
    case 'featureGrid':
      return <FeatureGridBlock block={block} />
    case 'gallery':
      return <GalleryBlock block={block} />
    case 'hero':
      return <HeroBlock block={block} locale={locale} />
    case 'richText':
      return <RichTextBlock block={block} />
    case 'specTable':
      return <SpecTableBlock block={block} />
    case 'testimonialsSection':
      return <TestimonialsBlock block={block} locale={locale} />
    default:
      return null
  }
}

/** Renders the `Pages.blocks` field — the whole layout-editor surface. */
export const RenderBlocks = ({
  blocks,
  locale,
}: {
  blocks: null | Page['blocks']
  locale: Locale
}) => {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => (
        <div key={block.id ?? `${block.blockType}-${index}`}>{renderBlock(block, locale)}</div>
      ))}
    </>
  )
}
