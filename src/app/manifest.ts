import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Recipe Book',
    short_name: 'Recipe Book',
    description: 'Recipe Book',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
  }
}
