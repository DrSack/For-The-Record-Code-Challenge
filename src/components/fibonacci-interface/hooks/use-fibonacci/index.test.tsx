import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'
import { useFibonacci } from './index'
import { getFibonacciSequence } from '@/helpers'
import { Mode } from '../../types'
import { MODE } from '../../constants'

const testMode = (currentMode: Mode, expectedMode: Mode) => {
  expect(currentMode.label).toEqual(expectedMode.label)
  expect(currentMode.placeholder).toEqual(expectedMode.placeholder)
  expect(currentMode.type).toEqual(expectedMode.type)
}

const onInputAndSubmit = ({
  value,
  result,
}: {
  result: { current: ReturnType<typeof useFibonacci> };
  value: string
}) => {
  act(() => result.current.onInputChange(value))
  expect(result.current.input).toBe(value);
  act(() => result.current.onSubmit())
}

describe('Test useFibonacci hook', () => {
  it('Test onSetLog', async () => {
    const {
      result
    } = renderHook(() => useFibonacci({
      fibonacciNumbersToCompare: getFibonacciSequence(10)
    }))

    expect(result.current.logs.length).toBe(0)
    act(() => result.current.onSetLog('log-test'));
    expect(result.current.logs).toEqual([
      'log-test'
    ])
  })

  it('Test inserting 2 seconds, inserting 1, then onQuitLog', async () => {
    const {
      result
    } = renderHook(() => useFibonacci({
      fibonacciNumbersToCompare: getFibonacciSequence(10)
    }))

    expect(result.current.logs.length).toBe(0)

    onInputAndSubmit({ value: '2', result })
    onInputAndSubmit({ value: '1', result })

    act(() => result.current.onQuitLog());
    expect(result.current.logs).toEqual([
      'Please input the number of time in seconds between emitting numbers and their frequency >> 2',
      'Please enter the first number >> 1',
      'FIB',
      'quit',
      '1:1',
    ])
  })

  it('Test inputting 2 seconds, inserting 1 and inserting 4 then inserting 1', async () => {
    const {
      result
    } = renderHook(() => useFibonacci({
      fibonacciNumbersToCompare: getFibonacciSequence(10)
    }))

    testMode(result.current.mode, MODE.initial)
    expect(result.current.logs.length).toBe(0)
    expect(result.current.input).toBe('');
    expect(result.current.intervalInput).toBe(undefined)
    expect(result.current.fibonacciNumbers).toEqual({})

    onInputAndSubmit({ value: '2', result })
    expect(result.current.intervalInput).toBe(2)
    testMode(result.current.mode, MODE.inProgress)
    expect(result.current.logs).toEqual([
      'Please input the number of time in seconds between emitting numbers and their frequency >> 2'
    ])

    onInputAndSubmit({ value: '1', result })
    testMode(result.current.mode, MODE.inProgress2)
    expect(result.current.logs).toEqual([
      'Please input the number of time in seconds between emitting numbers and their frequency >> 2',
      'Please enter the first number >> 1',
      'FIB',
    ])

    onInputAndSubmit({ value: '4', result })
    testMode(result.current.mode, MODE.inProgress2)
    expect(result.current.logs).toEqual([
      'Please input the number of time in seconds between emitting numbers and their frequency >> 2',
      'Please enter the first number >> 1',
      'FIB',
      'Please enter the next number >> 4'
    ])

    onInputAndSubmit({ value: '1', result })
    testMode(result.current.mode, MODE.inProgress2)
    expect(result.current.logs).toEqual([
      'Please input the number of time in seconds between emitting numbers and their frequency >> 2',
      'Please enter the first number >> 1',
      'FIB',
      'Please enter the next number >> 4',
      'Please enter the next number >> 1',
      'FIB',
    ])

    expect(result.current.fibonacciNumbers).toEqual({
      '1': 2,
      '4': 1
    })
  })

  describe('Test Invalid Inputs', () => {
    test('Test empty input', () => {
      const {
        result
      } = renderHook(() => useFibonacci({
        fibonacciNumbersToCompare: getFibonacciSequence(10)
      }))

      onInputAndSubmit({ value: '', result })
      expect(result.current.logs.length).toBe(0)
    })

    test('Test string with letters and numbers input', () => {
      const {
        result
      } = renderHook(() => useFibonacci({
        fibonacciNumbersToCompare: getFibonacciSequence(10)
      }))

      onInputAndSubmit({ value: '123-test', result })
      expect(result.current.logs.length).toBe(0)
    })

    test('Test string with 0 and below', () => {
      const {
        result
      } = renderHook(() => useFibonacci({
        fibonacciNumbersToCompare: getFibonacciSequence(10)
      }))

      onInputAndSubmit({ value: '0', result })
      onInputAndSubmit({ value: '-5', result })
      expect(result.current.logs.length).toBe(0)
    })
  })
})