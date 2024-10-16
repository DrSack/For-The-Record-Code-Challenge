export const getFibonacciSequence = (numbers: number) => {
  return Array.from(Array(numbers)).reduce((previousArray: number[], _, index) => {
    if (index === 0) return [...previousArray, 0];
    if (index === 1) return [...previousArray, 1];
    const value = previousArray[previousArray.length - 1] + previousArray[previousArray.length - 2]
    return [...previousArray, value]
  }, [] as number[]);
}