import '@testing-library/jest-dom'
import { FIRST_1000_FIBONACCI_NUMBERS } from '@/app/constants'
import { act, fireEvent, render, RenderResult, within } from '@testing-library/react'
import { FibonacciInterface } from './index'


const testBase = ({ getByTestId }: Pick<RenderResult, 'getByTestId'>) => {
  const inputOuter = getByTestId('fibonacci-interface-textfield')
  const inputInner = inputOuter.querySelector('input')

  expect(inputOuter).toHaveTextContent('Please input the number of time in seconds between emitting numbers and their frequency')
  expect(inputInner).toHaveAttribute('placeholder', 'Number of Seconds')

  const buttonControls = getByTestId('fibonacci-interface-button-container')

  expect(within(buttonControls).getByText('Submit'))
  expect(within(buttonControls).getByText('Halt'))
  expect(within(buttonControls).getByText('Resume'))
  expect(within(buttonControls).getByText('Quit'))
}

const onButtonClick = ({ dataTestId, getByTestId }: Pick<RenderResult, 'getByTestId'> & { dataTestId: string }) => {
  const submitButton = getByTestId(dataTestId)
  fireEvent.click(submitButton)
}

const onChangeInput = ({ value, getByTestId }: Pick<RenderResult, 'getByTestId'> & { value: string }) => {
  const input = getByTestId('fibonacci-interface-textfield').querySelector('input')
  if (input) fireEvent.change(input, { target: { value } });

  onButtonClick({ dataTestId: 'fibonacci-interface-submit-button', getByTestId })
}

describe('Test FibonacciInterface Component', () => {
  it('Test initial render', () => {
    const { getByTestId } = render(<FibonacciInterface fibonacciNumbersToCompare={FIRST_1000_FIBONACCI_NUMBERS} />)
    testBase({ getByTestId });
  })

  it('Test inputting 2 seconds, inserting 1 and inserting 4 then wait 2 seconds, halt, resume, then inserting 1, quit', async () => {
    const { getByTestId } = render(<FibonacciInterface fibonacciNumbersToCompare={FIRST_1000_FIBONACCI_NUMBERS} />)
    testBase({ getByTestId });

    onChangeInput({ value: '2', getByTestId })
    onChangeInput({ value: '1', getByTestId })
    onChangeInput({ value: '4', getByTestId })

    await act(async () => await new Promise(res => setTimeout(res, 2000)))

    onButtonClick({ dataTestId: 'fibonacci-interface-halt-button', getByTestId })
    onButtonClick({ dataTestId: 'fibonacci-interface-resume-button', getByTestId })
    onChangeInput({ value: '1', getByTestId })
    onButtonClick({ dataTestId: 'fibonacci-interface-quit-button', getByTestId })

    const [
      log1,
      log2,
      log3,
      log4,
      log5,
      log6,
      log7,
      log8,
      log9,
      log10,
      log11,
    ] = [...getByTestId('fibonacci-interface-output-container').children]

    expect(log1.textContent).toBe('Please input the number of time in seconds between emitting numbers and their frequency >> 2')
    expect(log2.textContent).toBe('Please enter the first number >> 1')
    expect(log3.textContent).toBe('FIB')
    expect(log4.textContent).toBe('Please enter the next number >> 4')
    expect(log5.textContent).toBe('1:1, 4:1')
    expect(log6.textContent).toBe('timer halted')
    expect(log7.textContent).toBe('timer resumed')
    expect(log8.textContent).toBe('Please enter the next number >> 1')
    expect(log9.textContent).toBe('FIB')
    expect(log10.textContent).toBe('quit')
    expect(log11.textContent).toBe('1:2, 4:1')

    const quitDialog = getByTestId('fibonacci-interface-quit-dialog')
    expect(quitDialog).toContainHTML('Terminate App')
    expect(quitDialog).toContainHTML('Thank you for playing')
  })

  describe('Test Error Inputs', () => {
    it('Test empty input', () => {
      const { getByTestId } = render(<FibonacciInterface fibonacciNumbersToCompare={FIRST_1000_FIBONACCI_NUMBERS} />)
      onChangeInput({ value: 'test1234', getByTestId })
      const logs = getByTestId('fibonacci-interface-output-container').children
      expect(logs.length).toEqual(0)
    })

    it('Test invalid input', async () => {
      const { getByTestId } = render(<FibonacciInterface fibonacciNumbersToCompare={FIRST_1000_FIBONACCI_NUMBERS} />)
      onChangeInput({ value: 'test1234', getByTestId })
      const logs = getByTestId('fibonacci-interface-output-container').children
      expect(logs.length).toEqual(0)
    })
  })
})