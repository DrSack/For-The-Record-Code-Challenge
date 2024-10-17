import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { LayoutWrapper } from './index'

describe('Test LayoutWrapper Component', () => {
  it('Test initial render', () => {
    const { getByTestId } = render(<LayoutWrapper>test</LayoutWrapper>)

    const layoutWrapper = getByTestId('layout-wrapper')
    expect(layoutWrapper).toHaveTextContent('test')
  })
})