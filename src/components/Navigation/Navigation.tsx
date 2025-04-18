'use client'

import '@/styles/components/header.css'

import { useState } from 'react'

import { UserClass } from '@/api/Models/Users'
import Header from '@/components/Navigation/Header'
import Sidebar from '@/components/Navigation/Sidebar'

type NavigationType = {
  loggedUser: UserClass
}

export default function Navigation({ loggedUser }: NavigationType) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
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
