import React from 'react'
import { render, act } from '@testing-library/react'

import { TimeWindow } from '../src'

jest.useFakeTimers()

describe('<TimeWindow />', () => {
  test('should render children only during given window', async () => {
    const { getByText } = render(
      <TimeWindow showAfter={1000} showUntil={2000}>
        Shown
      </TimeWindow>
    )

    act(() => {
      expect(() => getByText('Shown')).toThrow()

      jest.advanceTimersByTime(1500)

      getByText('Shown')

      jest.advanceTimersByTime(1000)

      expect(() => getByText('Shown')).toThrow()
    })
  })
})
