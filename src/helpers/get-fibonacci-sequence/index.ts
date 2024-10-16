import { FibonacciNumbers } from "@/components/fibonacci-interface/type"

export const getFibonacciSequenceString = (fibonacciNumbers: FibonacciNumbers) => {
  const totalFibonacciEntries = Object.entries(fibonacciNumbers)
  const fibonacciString = totalFibonacciEntries
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .reduce((previous, [key, value], index) => {
      const isLastIndex = totalFibonacciEntries.length - 1 === index
      return `${previous}${key}:${value}${isLastIndex ? '' : ', '}`
    }, '')
  return fibonacciString;
}

export const getFibonacciSequence = (numbers: number) => {
  return Array.from(Array(numbers)).reduce((previousArray: number[], _, index) => {
    if (index === 0) return [...previousArray, 0];
    if (index === 1) return [...previousArray, 1];
    const value = previousArray[previousArray.length - 1] + previousArray[previousArray.length - 2]
    return [...previousArray, value]
  }, [] as number[]);
}