import { MetadataRoute } from 'next'

import { SITE_URL } from '@/url'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/it`,
      lastModified: new Date(),
    },
  ]
}
