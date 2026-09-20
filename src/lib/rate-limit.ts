type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

/** Keeps the map from growing without bound on a long-lived server. */
const prune = (now: number) => {
  if (buckets.size < 500) return

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export type RateLimitResult = { ok: boolean; retryAfterSeconds: number }

/**
 * Fixed-window limiter for the public lead forms (PRD §7.3).
 *
 * In-process only: it protects a single Node instance and resets on deploy.
 * Behind multiple instances or a serverless platform this needs to move to a
 * shared store (Redis / Upstash) to be effective.
 */
export const rateLimit = ({
  key,
  limit = 5,
  windowMs = 10 * 60 * 1000,
}: {
  key: string
  limit?: number
  windowMs?: number
}): RateLimitResult => {
  const now = Date.now()
  prune(now)

  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })

    return { ok: true, retryAfterSeconds: 0 }
  }

  bucket.count += 1

  if (bucket.count > limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  return { ok: true, retryAfterSeconds: 0 }
}

/** Best-effort client IP from proxy headers; falls back to a shared bucket. */
export const clientIp = (headers: Headers): string => {
  const forwarded = headers.get('x-forwarded-for')

  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }

  return headers.get('x-real-ip')?.trim() || 'unknown'
}
