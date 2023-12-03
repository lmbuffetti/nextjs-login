'use client'

import { signOut } from 'next-auth/react'

import { LanguageList } from '@/@types/i18n'
import { getDictionary } from '@/i18n/config'

export default function SignOut({ lang }: LanguageList) {
  const translation = (key: string, defaultValue: string) =>
    getDictionary(lang, key, 'signOut', defaultValue)

  return (
    <button
      className="text-stone-400 transition-all hover:text-stone-200"
      onClick={() => signOut({ callbackUrl: '/en' })}
    >
      {translation('signOut0001', 'Sign Out')}
    </button>
  )
}
