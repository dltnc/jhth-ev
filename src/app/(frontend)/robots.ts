import type { MetadataRoute } from 'next'

import { serverURL } from '@/lib/seo'

const robots = (): MetadataRoute.Robots => ({
  rules: {
    // The admin UI, REST/GraphQL API and draft-preview handlers are private.
    disallow: ['/admin', '/api', '/next'],
    userAgent: '*',
  },
  sitemap: `${serverURL}/sitemap.xml`,
})

export default robots
