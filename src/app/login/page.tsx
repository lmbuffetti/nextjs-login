import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/images/logo.png'

import AuthForm from '@/components/Form/AuthForm/AuthForm'

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src={Logo}
              priority
              alt="Logo"
              className="w-10"
              width={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">Login</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <AuthForm type="login" />
      </div>
    </div>
  )
}
