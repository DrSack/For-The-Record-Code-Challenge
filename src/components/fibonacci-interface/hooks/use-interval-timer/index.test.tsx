import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'
import { useIntervalTimer } from './index'

describe('Test useintervalInputr Component', () => {
  it('Test with {1: 2, 3: 1} fibonacci props, halt, resume, and quit', async () => {
    const onQuitLog = jest.fn();
    const onSetLog = jest.fn()

    const {
      result
    } = renderHook(() => useIntervalTimer({
      intervalInput: 1,
      fibonacciNumbers: { 1: 2, 3: 1 },
      logs: [
        'Please input the number of time in seconds between emitting numbers and their frequency >> 1',
        'Please enter the first number >> 1',
        'FIB',
        'Please enter the next number >> 1',
        'FIB',
        'Please enter the next number >> 3',
      ],
      onQuitLog,
      onSetLog
    }))

    await act(async () => await new Promise(res => setTimeout(res, 1000)))

    expect(onSetLog).toHaveBeenLastCalledWith('1:2, 3:1')

    act(() => result.current.onHalt())
    await act(async () => await new Promise(res => setTimeout(res, 1000)))
    expect(onSetLog).toHaveBeenLastCalledWith('timer halted')

    act(() => result.current.onResume())
    expect(onSetLog).toHaveBeenLastCalledWith('timer resumed')
    await act(async () => await new Promise(res => setTimeout(res, 1000)))
    expect(onSetLog).toHaveBeenLastCalledWith('1:2, 3:1')

    act(() => result.current.onQuit())
    expect(onQuitLog).toHaveBeenCalled()
  })
})