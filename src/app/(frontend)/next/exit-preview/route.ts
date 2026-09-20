import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { defaultLocale } from '@/i18n/config'

/** Leaves draft mode and returns to the requested page (or the home page). */
export const GET = async (request: NextRequest): Promise<Response> => {
  const path = request.nextUrl.searchParams.get('path')
  const safe = path && path.startsWith('/') && !path.startsWith('//') ? path : `/${defaultLocale}`

  const draft = await draftMode()
  draft.disable()

  redirect(safe)
}
