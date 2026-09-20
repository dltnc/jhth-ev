import { draftMode, headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { getPayloadClient } from '@/lib/payload'

/**
 * Enables Next draft mode for an authenticated editor, then sends them to the
 * requested page. Collection `preview` / `livePreview.url` functions point here
 * instead of appending `?draft=true`, so public routes never read search params
 * and stay statically renderable.
 */
export const GET = async (request: NextRequest): Promise<Response> => {
  const path = request.nextUrl.searchParams.get('path')

  // Only app-relative paths: `//evil.com` and `https://evil.com` are open redirects.
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid preview path', { status: 400 })
  }

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (!user) return new Response('Unauthorised', { status: 401 })

  const roles = user.roles ?? []
  if (!roles.includes('admin') && !roles.includes('editor')) {
    return new Response('Forbidden', { status: 403 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
