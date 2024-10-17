import { getFibonacciSequenceString } from "@/helpers";
import { useState } from "react"
import { toast } from "react-toastify";
import { MODE } from "../../constants";
import { FibonacciNumbers, Mode, ModeEnum } from "../../types";

interface UseFibonacciProps {
  fibonacciNumbersToCompare: number[];
}

export const useFibonacci = ({ fibonacciNumbersToCompare }: UseFibonacciProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState<string>('')
  const [mode, setMode] = useState<Mode>(MODE.initial)
  const [fibonacciNumbers, setFibonacciNumbers] = useState<FibonacciNumbers>({})
  const [intervalTime, setIntervalTime] = useState<number | undefined>(undefined);

  const onInputChange = (value: string) => setInput(value)

  const onFIBLog = (input: string) => {
    const newLogs: string[] = [...logs, input, 'FIB'];
    setLogs(newLogs)
  }

  const onSetLog = (input: string) => {
    const newLogs: string[] = [...logs, input];
    setLogs(newLogs)
  }

  const onQuitLog = () => {
    const fibonacciString = getFibonacciSequenceString(fibonacciNumbers)
    const newLogs: string[] = [
      ...logs,
      'quit',
      fibonacciString
    ];
    setLogs(newLogs)
  }

  const onInitial = (value: number) => {
    setIntervalTime(value)
    onSetLog(`${mode.label} >> ${value}`)
    setMode(MODE.inProgress)
    onInputChange('')
  }

  const onInProgress = (value: number) => {
    // Determine to append existing number in state or create a new key and add 1
    const newFibonacciNumbers = fibonacciNumbers;
    if (newFibonacciNumbers[value]) {
      newFibonacciNumbers[value] += 1
      setFibonacciNumbers(newFibonacciNumbers)
    } else {
      const newFibonacciNumbers = { ...fibonacciNumbers, [value]: 1 }
      setFibonacciNumbers(newFibonacciNumbers)
    }
    // Check if value is part of the fibonacci sequence
    if (fibonacciNumbersToCompare.includes(value)) {
      onFIBLog(`${mode.label} >> ${value}`)
    } else {
      onSetLog(`${mode.label} >> ${value}`)
    } onInputChange('')

    // Change label if still in IN_PROGRESS mode
    const isNextNumber = mode.type === ModeEnum.IN_PROGRESS
    if (isNextNumber) setMode(MODE.inProgress2)
  }

  const onSubmit = () => {
    try {
      if (!input) throw new Error("Please provide an input");
        
      const value = Number(input)
      if (!isFinite(value)) throw new Error("Value must be numeric")

      switch (mode.type) {
        case ModeEnum.INITIAL:
          onInitial(value)
          break;
        default:
          onInProgress(value)
          break;
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message as string)
      else console.error(error)
    }
  }

  return {
    mode,
    logs,
    input,
    intervalTime,
    fibonacciNumbers,
    onSubmit,
    onSetLog,
    onQuitLog,
    onInputChange,
  }
}