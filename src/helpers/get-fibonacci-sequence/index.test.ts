import '@testing-library/jest-dom'
import { getFibonacciSequence, getFibonacciSequenceString } from '.';

describe('Test fibonacci sequence helpers', () => {
  it('Test getFibonacciSequence', () => {
    const first10FibonacciNumbers = getFibonacciSequence(10);

    expect(first10FibonacciNumbers).toEqual([
      0,
      1,
      1,
      2,
      3,
      5,
      8,
      13,
      21,
      34,
    ])
  })

  it('Test getFibonacciSequenceString', () => {
    const fibonacciString = getFibonacciSequenceString({ 10: 2, 11: 1, 2: 5, 23: 3 });

    expect(fibonacciString).toEqual("2:5, 10:2, 11:1, 23:3")
  })
})