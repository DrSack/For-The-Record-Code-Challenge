import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { QuitDialog } from './index'

describe('Test QuitDialog Component', () => {
  it('Test if quit prop is false', () => {
    const { queryByTestId } = render(<QuitDialog quit={false} />)

    const quitDialog = queryByTestId('fibonacci-interface-quit-dialog')
    expect(quitDialog).toBeNull()
  })

  it('Test if quit prop is true', () => {
    const { getByTestId } = render(<QuitDialog quit />)

    const quitDialog = getByTestId('fibonacci-interface-quit-dialog')
    expect(quitDialog).toContainHTML('Terminate App')
    expect(quitDialog).toContainHTML('Thank you for playing')
  })
})