'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import handler from '@/api/controllers/frontend/apiCall'

export default function AuthForm({ type }: { type: 'login' | 'register' }) {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const router = useRouter()

  const submitForm = async (e) => {
    e.preventDefault()
    if (type === 'login') {
      signIn('credentials', {
        redirect: false,
        email: formValue.email,
        password: formValue.password,
      }).then(res => {
        if (res.status === 200) {
          router.refresh()
          router.push(`/`)
          setLoading(false)
        } else {
          setFormError(res.error)
        }
      })

    } else {
      const userData = handler('login', 'POST', formValue)
      userData
        .then(() => {
          router.push(`/login`)
        })
        .catch(err => {
          setFormError(err.message)
        })
    }
  }

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {type === 'register' && (
        <div>
          <label
            htmlFor="name"
            className="block text-xs uppercase text-gray-600"
          >
            Name
          </label>
          <input
            onChange={e => setFormValue({ ...formValue, name: e.target.value })}
            value={formValue.name}
            id="name"
            name="name"
            type="text"
            placeholder="name"
            autoComplete="name"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-xs uppercase text-gray-600"
        >
          Email
        </label>
        <input
          onChange={e => setFormValue({ ...formValue, email: e.target.value })}
          value={formValue.email}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs uppercase text-gray-600"
        >
          password
        </label>
        <input
          onChange={e =>
            setFormValue({ ...formValue, password: e.target.value })
          }
          value={formValue.password}
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      {formError && <div className="text-red-600">{formError}</div>}

      <button
        type="submit"
        disabled={loading}
        className={`${
          loading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? '...' : <>{type === 'login' ? 'Sign in' : 'Sign up'}</>}
      </button>
      {type === 'login' ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="mx-1 font-semibold text-gray-800"
          >
            Sign up
          </Link>
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link
            href="/login"
            className="ml-1 font-semibold text-gray-800"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  )
}
