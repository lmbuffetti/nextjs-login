import { getServerSession } from 'next-auth/next'

import { UserClass } from '@/api/Models/Users'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
  const session: UserClass = await getServerSession(authOptions)
  return (
    <section className="p-8">
      <h1 className="text-xl">Dear {session?.name || 'Guest'},</h1>

      <p className="mt-4 text-lg">
        This is an example login/logout page made with NextJs (
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="text-primary-400 hover:underline"
          rel="noreferrer"
        >
          Official Page
        </a>
        ) and NextAuth (
        <a
          href="https://next-auth.js.org/"
          className="text-primary-400 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Official Page
        </a>
        ), for the design was integrated Talwind (
        <a
          href="https://tailwindcss.com/"
          className="text-primary-400 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Official Page
        </a>
        ) and for the database was used MongoBd (
        <a
          href="https://www.mongodb.com/"
          className="text-primary-400 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Official Page
        </a>
        ){' '}
      </p>

      <p className="mt-4 text-lg">
        The documention of API (visible only for logged users) is available{' '}
        <a
          href="/login"
          className="text-primary-400 hover:underline"
        >
          here
        </a>
        , it was made using Swagger (
        <a
          href="https://swagger.io/"
          target="_blank"
          className="text-primary-400 hover:underline"
          rel="noreferrer"
        >
          Official Page
        </a>
        )
      </p>
    </section>
  )
}
