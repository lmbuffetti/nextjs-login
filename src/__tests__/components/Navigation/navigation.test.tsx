import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import Navigation from '@/components/Navigation/Navigation'
jest.mock('next-auth/react')

describe('Main Navigation Component', () => {
  it('Links logged user as Admin', async () => {
    const mockSession: any = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c', role: 'admin' },
    }

    ;(useSession as jest.Mock).mockReturnValueOnce([mockSession, false])

    const lang = 'en'
    const loggedUser = mockSession.user

    // @ts-ignore
    render(
      <Navigation
        lang={lang}
        loggedUser={loggedUser}
      />,
    )

    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })
})
