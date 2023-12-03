import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import Sidebar from '@/components/Navigation/Sidebar'
jest.mock('next-auth/react')

import {
  sidebarNavigation,
  sidebarNavigationAdmin,
  sidebarNavigationGuest,
  sidebarNavigationLoggedIn,
  sidebarNavigationLoggedInAdmin,
} from '@/components/Navigation/NavigationRoute'

describe('Sidebar Navigation', () => {
  it('Links logged user as Admin', async () => {
    const mockSession: any = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c', role: 'admin' },
    }

    ;(useSession as jest.Mock).mockReturnValueOnce([mockSession, false])

    const isAdmin = false
    const lang = 'en'
    const loggedUser = mockSession.user
    const isOpenSidebar = false

    // @ts-ignore
    render(
      <Sidebar
        isAdmin={isAdmin}
        lang={lang}
        loggedUser={loggedUser}
        isOpen={isOpenSidebar}
      />,
    )

    sidebarNavigation(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationLoggedIn(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationLoggedInAdmin(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
  })

  it('Links logged user as User', async () => {
    const mockSession: any = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c', role: 'user' },
    }

    ;(useSession as jest.Mock).mockReturnValueOnce([mockSession, false])

    const isAdmin = false
    const lang = 'en'
    const loggedUser = mockSession.user
    const isOpenSidebar = false

    // @ts-ignore
    render(
      <Sidebar
        isAdmin={isAdmin}
        lang={lang}
        loggedUser={loggedUser}
        isOpen={isOpenSidebar}
      />,
    )
    sidebarNavigation(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationAdmin(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
    sidebarNavigationGuest(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
    sidebarNavigationLoggedIn(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationLoggedInAdmin(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
  })

  it('Links not logged in user', async () => {
    const isAdmin = false
    const lang = 'en'
    const loggedUser = undefined
    const isOpenSidebar = false

    // @ts-ignore
    render(
      <Sidebar
        isAdmin={isAdmin}
        lang={lang}
        loggedUser={loggedUser}
        isOpen={isOpenSidebar}
      />,
    )
    sidebarNavigation(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationAdmin(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
    sidebarNavigationGuest(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationLoggedIn(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
    sidebarNavigationLoggedInAdmin(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
  })

  it('Links logged user as Admin in Admin', async () => {
    const mockSession: any = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c', role: 'admin' },
    }

    ;(useSession as jest.Mock).mockReturnValueOnce([mockSession, false])

    const isAdmin = true
    const lang = 'en'
    const loggedUser = mockSession.user
    const isOpenSidebar = false

    // @ts-ignore
    render(
      <Sidebar
        isAdmin={isAdmin}
        lang={lang}
        loggedUser={loggedUser}
        isOpen={isOpenSidebar}
      />,
    )

    sidebarNavigation(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationAdmin(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeInTheDocument()
    })
    sidebarNavigationGuest(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
    sidebarNavigationLoggedIn(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })
    sidebarNavigationLoggedInAdmin(lang).forEach(({ label }) => {
      expect(screen.queryByText(label[lang])).toBeNull()
    })

    expect(screen.getByTestId('logo-sidebar-closed')).toBeInTheDocument()
  })
})
