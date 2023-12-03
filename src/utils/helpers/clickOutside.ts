import { MutableRefObject, useEffect } from 'react'

type Action = {
  action: 'push' | 'function'
  history?: string[]
  loc?: string
  func?: () => void
}

export default function useOutsideAlerter(
  ref: MutableRefObject<HTMLDivElement | null>,
  action: Action,
) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: MouseEvent) {
    const getClass = document.getElementsByClassName('brixel-notification')
    const getClassMore = document.getElementsByClassName('block-click')
    if (getClass.length + getClassMore.length === 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (ref?.current && !(ref?.current).contains(event?.target as Element)) {
        if (action?.action === 'push' && action.history) {
          action.history.push(action.loc || '')
        }
        if (action?.action === 'function' && action.func) {
          action.func()
        }
      }
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
