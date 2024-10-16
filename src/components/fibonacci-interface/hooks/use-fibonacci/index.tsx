import { getFibonacciSequenceString } from "@/helpers";
import { useState } from "react"
import { toast } from "react-toastify";
import { MODE } from "../../constants";
import { FibonacciNumbers, Mode, ModeEnum } from "../../type";

interface UseFibonacciProps {
  fibonacciNumbersToCompare: number[];
}

export const UseFibonacci = ({ fibonacciNumbersToCompare }: UseFibonacciProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>(MODE.initial)
  const [input, setInput] = useState<string | undefined>(undefined)
  const [fibonacciNumbers, setFibonacciNumbers] = useState<FibonacciNumbers>({})
  const [intervalTime, setIntervalTime] = useState<number | undefined>(undefined);

  const onInputChange = (value: string) => setInput(value)

  const onFIBLog = (input: string) => {
    const newLogs: string[] = [...logs, input as string, 'FIB'];
    setLogs(newLogs)
  }

  const onSetLog = (input: string) => {
    const newLogs: string[] = [...logs, input as string];
    setLogs(newLogs)
  }

  const onQuitLog = () => {
    const fibonacciString = getFibonacciSequenceString(fibonacciNumbers)
    const newLogs: string[] = [
      ...logs,
      `${mode.label} >> quit`,
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
    const newFibonacciNumbers = fibonacciNumbers;
    if (newFibonacciNumbers[value]) {
      newFibonacciNumbers[value] += 1
      setFibonacciNumbers(newFibonacciNumbers)
    } else {
      const newFibonacciNumbers = { ...fibonacciNumbers, [value]: 1 }
      setFibonacciNumbers(newFibonacciNumbers)
    }

    if (fibonacciNumbersToCompare.includes(value)) {
      onFIBLog(`${mode.label} >> ${value}`)
    } else {
      onSetLog(`${mode.label} >> ${value}`)
    } onInputChange('')

    const isNextNumber = Object.values(fibonacciNumbers).length > 0 && mode.type === ModeEnum.IN_PROGRESS
    if (isNextNumber) setMode(MODE.inProgress2)
  }

  const onSubmit = () => {
    if (!input) {
      toast.error('Please provide an input')
      return;
    }

    const value = Number(input)
    if (!isFinite(value)) {
      toast.error('Value must be numeric')
      return;
    }

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