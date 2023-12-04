import { MetadataRoute } from 'next'

import { SITE_URL } from '@/url'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/*/register/*', '/*/login/*', '/api-doc/*'],
    },
    sitemap: `${SITE_URL}sitemap.xml`,
  }
}
