// These styles apply to every route in the application
import '@/assets/styles/globals.css'

import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { LanguageList } from '@/@types/i18n'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const title = 'NextJS Login'
const description = 'NextJS Login'

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
