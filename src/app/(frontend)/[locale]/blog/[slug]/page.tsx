import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Icon } from '@/components/Icon'
import { MediaImage } from '@/components/MediaImage'
import { PageHeader } from '@/components/PageHeader'
import { RichText } from '@/components/RichText'
import { StructuredData } from '@/components/StructuredData'
import { defaultLocale, isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { formatDate } from '@/lib/format'
import { resolveMedia } from '@/lib/media'
import { getPostBySlug, getPosts } from '@/lib/queries'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ locale: string; slug: string }> }

export const generateStaticParams = async () => {
  try {
    const params: { locale: string; slug: string }[] = []

    for (const locale of locales) {
      const posts = await getPosts({ locale })
      params.push(...posts.map((post) => ({ locale, slug: post.slug })))
    }

    return params
  } catch {
    return []
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale

  const post = await getPostBySlug({ locale, slug })
  if (!post) return {}

  const cover = resolveMedia(post.coverImage, 'wide')

  return buildMetadata({
    description: post.excerpt,
    image: cover?.url,
    locale,
    path: `/blog/${post.slug}`,
    publishedTime: post.publishDate ?? undefined,
    title: post.title,
    type: 'article',
  })
}

const BlogPostPage = async ({ params }: Props) => {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const { isEnabled: draft } = await draftMode()
  const post = await getPostBySlug({ draft, locale, slug })

  if (!post) notFound()

  const cover = resolveMedia(post.coverImage, 'wide')
  const category = typeof post.category === 'object' ? post.category : null
  const author = typeof post.author === 'object' ? post.author : null

  const related = (await getPosts({ limit: 4, locale }))
    .filter((item) => item.id !== post.id)
    .slice(0, 3)

  return (
    <article>
      <PageHeader
        eyebrow={category?.title ?? undefined}
        sub={post.excerpt ?? undefined}
        title={post.title}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-white/55">
          {post.publishDate ? (
            <time dateTime={post.publishDate}>
              {dict.blog.publishedOn} {formatDate(post.publishDate, locale)}
            </time>
          ) : null}
          {author?.name ? (
            <span>
              {dict.blog.by} {author.name}
            </span>
          ) : null}
          <Link
            className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-light)] transition-colors duration-200 hover:text-white"
            href={localePath(locale, '/blog')}
          >
            <Icon className="rotate-180" name="arrowRight" size={15} />
            {dict.blog.heading}
          </Link>
        </div>
      </PageHeader>

      <section className="bg-white py-16">
        <div className="shell">
          {cover ? (
            <div className="relative mx-auto mb-12 aspect-16/9 max-w-[900px] overflow-hidden rounded-lg">
              <MediaImage
                className="object-cover"
                fill
                media={cover}
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          ) : null}

          <div className="mx-auto max-w-[760px]">
            <RichText data={post.content} />

            {post.tags?.length ? (
              <ul className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    className="rounded-full border border-[var(--border-strong)] px-3 py-1 text-xs text-[var(--muted)]"
                    key={tag}
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-[var(--bg-subtle)] py-20">
          <div className="shell">
            <h2 className="mb-8 font-[family-name:var(--font-display)] text-[28px] font-bold">
              {dict.blog.related}
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {related.map((item) => (
                <li
                  className="rounded-lg border border-[var(--border-soft)] bg-white px-6 py-6 shadow-card"
                  key={item.id}
                >
                  {item.publishDate ? (
                    <p className="mb-2 text-[11px] text-[var(--muted)]">
                      {formatDate(item.publishDate, locale)}
                    </p>
                  ) : null}
                  <Link
                    className="font-[family-name:var(--font-display)] text-[19px] leading-[1.3] font-bold transition-colors duration-200 hover:text-[var(--accent)]"
                    href={localePath(locale, `/blog/${item.slug}`)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          author: author?.name ? { '@type': 'Person', name: author.name } : undefined,
          datePublished: post.publishDate ?? post.createdAt,
          dateModified: post.updatedAt,
          description: post.excerpt ?? undefined,
          headline: post.title,
          image: cover ? absoluteUrl(cover.url) : undefined,
          mainEntityOfPage: absoluteUrl(localePath(locale, `/blog/${post.slug}`)),
          publisher: { '@type': 'Organization', name: 'VoltRide' },
        }}
      />
    </article>
  )
}

export default BlogPostPage
