import Image from 'next/image'
import Link from 'next/link'

import LogoWhite from '@/images/logo.png'

type Header = {
  loggedUser?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  handleOpenSidebar: () => void
}

export default function Header({ handleOpenSidebar }: Header) {
  return (
    <header>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => handleOpenSidebar()}
              >
                <svg
                  className="size-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link
                href="/"
                className="ml-2 flex md:mr-24"
              >
                <Image
                  alt="Logo Nonna Jaia"
                  src={LogoWhite}
                  width={100}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
