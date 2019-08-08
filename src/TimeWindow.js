import React from 'react'

export function useTimeWindow({ showAfter, showUntil }) {
  const [show, setShow] = React.useState(showAfter == null)

  React.useEffect(() => {
    if (showAfter != null) {
      const timeoutId = setTimeout(setShow, showAfter, true)
      return () => clearTimeout(timeoutId)
    }
  }, [showAfter])

  React.useEffect(() => {
    if (showUntil != null) {
      const timeoutId = setTimeout(setShow, showUntil, false)
      return () => clearTimeout(timeoutId)
    }
  }, [showUntil])

  return show
}

export function TimeWindow({ children, showAfter, showUntil }) {
  const show = useTimeWindow({ showAfter, showUntil })

  if (!show) {
    return null
  }

  return children
}
