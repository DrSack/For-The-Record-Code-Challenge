import { FibonacciNumbers } from "@/app/type";
import { useEffect, useState } from "react"

interface UseIntervalTimerProps {
    intervalTime?: number;
    fibonacciNumbers: FibonacciNumbers;
    logs: string[];
    onSetLogs: (value: string) => void;
}

export const useIntervalTimer = ({ intervalTime, fibonacciNumbers, logs, onSetLogs }: UseIntervalTimerProps) => {
    const [tick, setTick] = useState(0);
    const [halt, setHalt] = useState(false);

    const onHalt = () => {
        onSetLogs('timer halted')
        setHalt(true)
    }

    const onResume = () => {
        onSetLogs('timer resumed')
        setHalt(false)
    }

    const onIntervalTick = (fibonacciNumbers: FibonacciNumbers) => {
        const totalFibonacciEntries = Object.entries(fibonacciNumbers)
        const fibonacciString = totalFibonacciEntries
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .reduce((previous, [key, value], index) => {
                const isLastIndex = totalFibonacciEntries.length - 1 === index
                return `${previous}${key}:${value}${isLastIndex ? '' : ', '}`
            }, '')
        onSetLogs(fibonacciString)
        setTick((e) => e + 1)
    }

    useEffect(() => {
        if (intervalTime) {
            const intervalId = setInterval(() => {
                onIntervalTick(fibonacciNumbers)
            }, (intervalTime * 1000))

            if (halt) clearInterval(intervalId);
            return () => clearInterval(intervalId)
        }
    }, [intervalTime, logs, fibonacciNumbers, tick, halt])

    return { onHalt, onResume }
}