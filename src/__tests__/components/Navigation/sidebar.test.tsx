import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import Sidebar from '@/components/Navigation/Sidebar'
jest.mock('next-auth/react')

import {
  sidebarNavigation,
  sidebarNavigationGuest,
  sidebarNavigationLoggedIn,
} from '@/components/Navigation/NavigationRoute'

describe('Sidebar Navigation', () => {

  it('Links logged user as User', async () => {
    const mockSession: any = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c', role: 'user' },
    }

    ;(useSession as jest.Mock).mockReturnValueOnce([mockSession, false])
    const loggedUser = mockSession.user

    // @ts-ignore
    render(
      <Sidebar
        loggedUser={loggedUser}
      />,
    )
    sidebarNavigation.forEach(({ label }) => {
      expect(screen.queryByText(label)).toBeInTheDocument()
    })
    sidebarNavigationGuest.forEach(({ label }) => {
      expect(screen.queryByText(label)).toBeNull()
    })
    sidebarNavigationLoggedIn.forEach(({ label }) => {
      expect(screen.queryByText(label)).toBeInTheDocument()
    })
  })

  it('Links not logged in user', async () => {
    const loggedUser = undefined

    // @ts-ignore
    render(
      <Sidebar
        loggedUser={loggedUser}
      />,
    )
    sidebarNavigation.forEach(({ label }) => {
      expect(screen.queryByText(label)).toBeInTheDocument()
    })
    sidebarNavigationGuest.forEach(({ label }) => {
      expect(screen.queryByText(label)).toBeInTheDocument()
    })
    sidebarNavigationLoggedIn.forEach(({ label }) => {
      expect(screen.queryByText(label)).toBeNull()
    })
  })
})
