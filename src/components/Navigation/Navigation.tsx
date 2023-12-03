'use client'

import '@/styles/components/header.css'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { LanguageList } from '@/@types/i18n'
import { UserClass } from '@/api/Models/Users'
import Header from '@/components/Navigation/Header'
import Sidebar from '@/components/Navigation/Sidebar'

type Navigation = {
  lang: LanguageList['lang']
  loggedUser: UserClass
}

export default function Navigation({ lang, loggedUser }: Navigation) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const pathname = usePathname()
  return (
    <div data-testid="navigation-bar">
      <Header
        loggedUser={loggedUser}
        handleOpenSidebar={() => setIsOpenSidebar(!isOpenSidebar)}
      />
      <Sidebar
        isAdmin={pathname?.includes('/admin')}
        lang={lang}
        loggedUser={loggedUser}
        isOpen={isOpenSidebar}
      />
    </div>
  )
}
