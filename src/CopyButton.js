import React from 'react'
import copy from 'copy-to-clipboard'

import { useAsyncCallback } from './AsyncButton'

const wait = (t) => new Promise((res) => setTimeout(res, t))

export function useCopyTextHandler(textToCopy, { interval, ...options } = {}) {
  const [onClick, { loading: copied }] = useAsyncCallback(async () => {
    copy(textToCopy, options)
    if (interval !== 0) {
      await wait(interval == null ? 1000 : interval)
    }
  }, [textToCopy, interval, options])

  return {
    onClick,
    copied,
  }
}

export const CopyButton = React.memo(function CopyButton(props) {
  return props.children(useCopyTextHandler(props.text, props))
})

CopyButton.displayName = 'CopyButton'
