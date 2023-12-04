import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import APIDoc from 'src/api/Swagger/index.json'
import ReactSwagger from 'src/app/api-doc/react-swagger'

import { UserClass } from '@/api/Models/Users'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function IndexPage() {
  return (
    <section className="container">
      <ReactSwagger spec={APIDoc} />
    </section>
  )
}
