import { draftMode } from 'next/headers'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Icon } from '@/components/Icon'
import { MediaImage } from '@/components/MediaImage'
import { PageHeader } from '@/components/PageHeader'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { formatDate } from '@/lib/format'
import { resolveMedia } from '@/lib/media'
import { getPosts } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return buildMetadata({
    description: dict.blog.sub,
    locale,
    path: '/blog',
    title: dict.blog.heading,
  })
}

const BlogPage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const { isEnabled: draft } = await draftMode()
  const posts = await getPosts({ draft, locale })

  return (
    <>
      <PageHeader eyebrow={dict.nav.blog} sub={dict.blog.sub} title={dict.blog.heading} />

      <section className="bg-[var(--bg-subtle)] py-20">
        <div className="shell">
          {posts.length ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {posts.map((post, index) => {
                const cover = resolveMedia(post.coverImage, 'card')
                const category = typeof post.category === 'object' ? post.category : null

                return (
                  <li
                    className="overflow-hidden rounded-lg border border-[var(--border-soft)] bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                    key={post.id}
                  >
                    <Link className="group block h-full" href={localePath(locale, `/blog/${post.slug}`)}>
                      <div className="relative aspect-4/3 overflow-hidden bg-[var(--bg-subtle)]">
                        <MediaImage
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          media={cover}
                          priority={index === 0}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      <div className="px-6 py-6">
                        <p className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.4px] text-[var(--muted)]">
                          {category ? (
                            <span className="rounded-full bg-[var(--accent-tint)] px-2.5 py-1 font-medium text-[var(--accent)]">
                              {category.title}
                            </span>
                          ) : null}
                          {post.publishDate ? (
                            <time dateTime={post.publishDate}>
                              {formatDate(post.publishDate, locale)}
                            </time>
                          ) : null}
                        </p>

                        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[21px] leading-[1.25] font-bold transition-colors duration-200 group-hover:text-[var(--accent)]">
                          {post.title}
                        </h2>

                        {post.excerpt ? (
                          <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-[1.7] text-[var(--body)]">
                            {post.excerpt}
                          </p>
                        ) : null}

                        <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)]">
                          {dict.actions.readMore}
                          <Icon name="arrowRight" size={15} />
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-[15px] text-[var(--muted)]">{dict.blog.noPosts}</p>
          )}
        </div>
      </section>
    </>
  )
}

export default BlogPage
