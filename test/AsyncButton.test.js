import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { AsyncButton } from '../src'

describe('<AsyncButton />', () => {
  test('should render children', async () => {
    const onClick = jest.fn(() => Promise.resolve('Success'))
    const { getByText, container } = render(
      <AsyncButton onClick={onClick}>
        {({ onClick, loading, data }) => (
          <button onClick={onClick}>{loading ? 'Loading' : data || 'Click'}</button>
        )}
      </AsyncButton>
    )

    expect(container.firstChild).toMatchSnapshot()

    fireEvent.click(getByText('Click'))

    expect(container.firstChild).toMatchSnapshot()

    await waitFor(() => true)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('should render error when callback throws', async () => {
    const onClick = jest.fn(() => Promise.reject('Error'))
    const { getByText, container } = render(
      <AsyncButton onClick={onClick}>
        {({ onClick, error }) => <button onClick={onClick}>{error || 'Click'}</button>}
      </AsyncButton>
    )

    fireEvent.click(getByText('Click'))
    await waitFor(() => true)

    expect(container.firstChild).toMatchSnapshot()
  })
})
