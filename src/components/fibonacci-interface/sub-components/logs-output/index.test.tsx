import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { LogsOutput } from './index'

describe('Test LogsOutput Component', () => {
  it('Test initial render', () => {
    const testLogs = ['test1', 'test2', 'test3', 'test4']

    const { getByTestId } = render(<LogsOutput logs={testLogs} />)

    const [
      log1,
      log2,
      log3,
      log4,
    ] = [...getByTestId('fibonacci-interface-output-container').children]

    expect(log1.textContent).toBe('test1')
    expect(log2.textContent).toBe('test2')
    expect(log3.textContent).toBe('test3')
    expect(log4.textContent).toBe('test4')
  })
})