
// interface UseIntervalTimerProps {

// }

// const useIntervalTimer = () => {

//   useEffect(() => {
//     if (intervalTime) {
//       const intervalId = setInterval(() => {
//         const totalFibonacciEntries = Object.entries(fibonacciNumbers)
//         const fibonacciString = totalFibonacciEntries
//           .sort((a, b) => Number(a[0]) - Number(b[0]))
//           .reduce((previous, [key, value], index) => {
//             const isLastIndex = totalFibonacciEntries.length - 1 === index
//             return `${previous}${key}:${value}${isLastIndex ? '' : ', '}`
//           }, '')

//         onSetLogs(fibonacciString)
//         setTick((e) => e + 1)
//       }, (intervalTime * 1000))

//       if (halt) clearInterval(intervalId);
//       return () => clearInterval(intervalId)
//     }
//   }, [intervalTime, logs, fibonacciNumbers, tick, halt])

// }