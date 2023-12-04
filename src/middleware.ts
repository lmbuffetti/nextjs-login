import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const locales = ['en', 'it']

export default async function middleware(request: NextRequest) {

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
