import { serverURL } from './seo'

/**
 * Admin "preview" and live-preview links go through the draft-mode handler at
 * `/next/preview`, which authenticates the editor and sets the Next draft
 * cookie. Public routes therefore never need to read a `?draft=true` param —
 * which would opt every page out of static rendering.
 */
export const previewUrl = (path: string): string =>
  `${serverURL}/next/preview?path=${encodeURIComponent(path)}`
