import Image from 'next/image'

import type { ResolvedMedia } from '@/lib/media'

type Props = {
  className?: string
  /** Absolutely positioned to fill the nearest positioned ancestor. */
  fill?: boolean
  height?: number
  media: null | ResolvedMedia
  priority?: boolean
  sizes?: string
  width?: number
}

/**
 * Renders a Payload upload through `next/image`, or a neutral placeholder when
 * the field is empty — cards keep their aspect ratio either way.
 * `alt` always comes from the Media doc, which requires it (WCAG 2.1 AA).
 */
export const MediaImage = ({
  className,
  fill,
  height,
  media,
  priority,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  width,
}: Props) => {
  if (!media) {
    return (
      <div
        aria-hidden="true"
        className={`bg-gradient-to-br from-[var(--bg-subtle)] to-[var(--card)] ${fill ? 'absolute inset-0' : 'aspect-4/3 w-full'} ${className ?? ''}`}
      />
    )
  }

  if (fill) {
    return (
      <Image
        alt={media.alt}
        className={className}
        fill
        priority={priority}
        sizes={sizes}
        src={media.url}
      />
    )
  }

  return (
    <Image
      alt={media.alt}
      className={className}
      height={height ?? media.height ?? 900}
      priority={priority}
      sizes={sizes}
      src={media.url}
      width={width ?? media.width ?? 1200}
    />
  )
}
