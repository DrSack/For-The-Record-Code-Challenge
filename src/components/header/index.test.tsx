import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Header } from './index'

describe('Test Header Component', () => {
  it('Test render', () => {
    const { getByTestId } = render(<Header />)

    const header = getByTestId('main-header')
    expect(header).toContainHTML('FTR Code Assessment')
  })
})