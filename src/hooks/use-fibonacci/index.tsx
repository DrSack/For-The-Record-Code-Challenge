import { MODE } from "@/app/constants";
import { FibonacciNumbers, Mode, ModeEnum } from "@/app/type";
import { useState } from "react"
import { toast } from "react-toastify";

interface UseFibonacciProps {
    fibonacciNumbersCompare: number[];
}

export const UseFibonacci = ({ fibonacciNumbersCompare }: UseFibonacciProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>(MODE.initial)
  const [input, setInput] = useState<string | undefined>(undefined)
  const [fibonacciNumbers, setFibonacciNumbers] = useState<FibonacciNumbers>({})
  const [intervalTime, setIntervalTime] = useState<number | undefined>(undefined);

  const onInputChange = (value: string) => setInput(value)
  const onInputClear = () => setInput('')

  const onFIB = (input: string) => {
    const newLogs: string[] = [...logs, input as string, 'FIB'];
    setLogs(newLogs)
  }

  const onSetLogs = (input: string) => {
    const newLogs: string[] = [...logs, input as string];
    setLogs(newLogs)
  }

  const onInitial = (value: number) => {
    setIntervalTime(value)
    onSetLogs(`${mode.label} >> ${value}`)
    setMode(MODE.inProgress)
    onInputClear()
  }

  const onInProgress = (value: number, isFirstProgress?: boolean) => {
    const newFibonacciNumbers = fibonacciNumbers;
    if (newFibonacciNumbers[value]) {
      newFibonacciNumbers[value] += 1
      setFibonacciNumbers(newFibonacciNumbers)
    } else {
      const newFibonacciNumbers = { ...fibonacciNumbers, [value]: 1 }
      setFibonacciNumbers(newFibonacciNumbers)
    }

    if (fibonacciNumbersCompare.includes(value)) {
      onFIB(`${mode.label} >> ${value}`)
    } else {
      onSetLogs(`${mode.label} >> ${value}`)
    } onInputClear()

    if (isFirstProgress) setMode(MODE.inProgress2)
  }

  const onSubmit = () => {
    if (!input) toast.error('Please provide an input')
    const value = Number(input)
    if (!isFinite(value)) toast.error('Value must be numeric')

    switch (mode.type) {
      case ModeEnum.INITIAL:
        onInitial(value)
        break;
      case ModeEnum.IN_PROGRESS:
        onInProgress(value)
        break;
      default:
        onInProgress(value)
        break;
    }
  }

  return { mode, logs, input, fibonacciNumbers, intervalTime, onSubmit, onInputChange, onSetLogs }
}