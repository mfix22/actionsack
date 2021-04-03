import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { CopyButton } from '../src'

let setData = jest.fn()
describe('<CopyButton />', () => {
  beforeEach(() => {
    window.clipboardData = { setData }
    window.prompt = () => true
    const getSelection = () => ({
      rangeCount: 0,
      addRange: () => {},
      getRangeAt: () => {},
      removeAllRanges: () => {},
    })

    window.getSelection = getSelection
    document.getSelection = getSelection
  })
  afterEach(() => {
    window.clipboardData = undefined
    window.prompt = undefined
    window.getSelection = undefined
    document.getSelection = undefined
  })

  test.each([
    { text: undefined, interval: undefined },
    { text: 'Copy Text', interval: 3000 },
  ])('should render correctly with interval: %s', async (props) => {
    jest.useFakeTimers()

    const { getByText } = render(
      <CopyButton {...props}>
        {({ onClick, copied }) => <button onClick={onClick}>{copied ? 'Copied!' : 'Click'}</button>}
      </CopyButton>
    )

    fireEvent.click(getByText('Click'))

    getByText('Copied!')

    jest.advanceTimersByTime(props.interval || 1000) // 1 second is the default
    await waitFor(() => true)

    getByText('Click')

    expect(window.clipboardData.setData).toHaveBeenCalledWith('text', props.text)
  })
})
