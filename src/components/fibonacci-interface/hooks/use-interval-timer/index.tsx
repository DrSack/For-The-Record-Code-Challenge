import { FibonacciNumbers } from "@/components/fibonacci-interface/types";
import { getFibonacciSequenceString } from "@/helpers";
import { useEffect, useState } from "react"

interface UseIntervalTimerProps {
  intervalInput?: number;
  fibonacciNumbers: FibonacciNumbers;
  logs: string[];
  onQuitLog: () => void;
  onSetLog: (value: string) => void;
}

export const useIntervalTimer = ({ logs, intervalInput, fibonacciNumbers, onSetLog, onQuitLog }: UseIntervalTimerProps) => {
  const [tick, setTick] = useState(0);
  const [halt, setHalt] = useState(false);
  const [quit, setQuit] = useState(false);

  const onHalt = () => {
    onSetLog('timer halted')
    setHalt(true)
  }

  const onResume = () => {
    onSetLog('timer resumed')
    setHalt(false)
  }

  const onQuit = () => {
    onQuitLog();
    setQuit(true);
  }

  const onIntervalTick = (fibonacciNumbers: FibonacciNumbers) => {
    const fibonacciString = getFibonacciSequenceString(fibonacciNumbers)
    onSetLog(fibonacciString)
    setTick((e) => e + 1)
  }

  useEffect(() => {
    if (intervalInput) {
      const intervalId = setTimeout(() => onIntervalTick(fibonacciNumbers), (intervalInput * 1000))

      if (halt || quit) clearTimeout(intervalId);
      return () => clearTimeout(intervalId)
    }
  }, [intervalInput, logs, fibonacciNumbers, tick, halt, quit])

  return { quit, onHalt, onResume, onQuit }
}