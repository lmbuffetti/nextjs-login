// These styles apply to every route in the application
import '@/assets/styles/globals.css'

import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'

import { UserClass } from '@/api/Models/Users'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Sidebar from '@/components/Navigation/Sidebar'
import NextTopLoader from 'nextjs-toploader';

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
  const session: UserClass = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.variable} suppressHydrationWarning={true}>
        <NextTopLoader />
        <div className="flex">
          <Sidebar loggedUser={session} />
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  )
}
