'use client'

import '@/styles/components/header.css'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { UserClass } from '@/api/Models/Users'
import Header from '@/components/Navigation/Header'
import Sidebar from '@/components/Navigation/Sidebar'

type Navigation = {
  loggedUser: UserClass
}

export default function Navigation({ loggedUser }: Navigation) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const pathname = usePathname()
  return (
    <div data-testid="navigation-bar">
      <Header
        loggedUser={loggedUser}
        handleOpenSidebar={() => setIsOpenSidebar(!isOpenSidebar)}
      />
      <Sidebar loggedUser={loggedUser} />
    </div>
  )
}
