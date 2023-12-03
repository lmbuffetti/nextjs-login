import Image from 'next/image'
import Link from 'next/link'

import { LanguageList } from '@/@types/i18n'
import AuthForm from '@/components/Form/AuthForm/AuthForm'
import { getDictionary } from '@/i18n/config'

export default function Register({
  params: { lang },
}: {
  params: LanguageList
}) {
  const translation = (key: string, defaultValue: string) =>
    getDictionary(lang, key, 'register', defaultValue)
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">
            {translation('register0001', 'Sign Up')}
          </h3>
          <p className="text-sm text-gray-500">
            {translation(
              'register0002',
              'Create an account with your email and password',
            )}
          </p>
        </div>
        <AuthForm
          type="register"
          lang={lang}
        />
      </div>
    </div>
  )
}
