import '@testing-library/jest-dom'

import { fireEvent, render } from '@testing-library/react'

import Header from '@/components/Navigation/Header' // your component path

describe('Header Component', () => {
  it('calls handleOpenSidebar when the button is clicked', () => {
    const handleOpenSidebarMock = jest.fn()

    const { getByRole } = render(
      <Header handleOpenSidebar={handleOpenSidebarMock} />,
    )

    const button = getByRole('button')
    fireEvent.click(button)

    expect(handleOpenSidebarMock).toHaveBeenCalledTimes(1)
  })
})
