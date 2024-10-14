'use client';

import { Input } from '@/components';
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { isFinite } from 'lodash';
import { toast } from 'react-toastify'
import { FibonacciNumbers, Mode, ModeEnum } from './type';
import { MODE } from './constants';
import { StyledInputContainer, StyledMainContainer, StyledOutputContainer } from './styles';

export default function Home() {
  const [mode, setMode] = useState<Mode>(MODE.initial)
  const [input, setInput] = useState<string | undefined>(undefined)
  const [intervalTime, setIntervalTime] = useState<number | undefined>(undefined);
  const [fibonacciNumbers, setFibonacciNumbers] = useState<FibonacciNumbers>({})
  const [logs, setLogs] = useState<string[]>([]);

  const [tick, setTick] = useState(0);

  const onInputChange = (value: string) => setInput(value)
  const onInputClear = () => setInput('')

  const onSetLogs = (input: string) => {
    const newLogs: string[] = [...logs, input as string];
    setLogs(newLogs)
  }

  const onSubmit = () => {
    if (!input) toast.error('Please provide an input')

    switch (mode.type) {
      case ModeEnum.INITIAL:
        const initialValue = Number(input)
        if (isFinite(initialValue)) {
          setIntervalTime(initialValue)
          onInputClear()
          onSetLogs(input as string)
          setMode(MODE.inProgress)
        }
        else toast.error('Value must be numeric')
        break;
      case ModeEnum.IN_PROGRESS:
        const inProgressValue = Number(input)
        if (isFinite(inProgressValue)) {
          const newFibonacciNumbers = fibonacciNumbers;

          if (newFibonacciNumbers[inProgressValue]) {
            newFibonacciNumbers[inProgressValue] += 1
            setFibonacciNumbers(newFibonacciNumbers)
          } else {
            const newFibonacciNumbers = { ...fibonacciNumbers, [inProgressValue]: 1 }
            setFibonacciNumbers(newFibonacciNumbers)
          }

          // setMode(MODE.inProgress)
          onInputClear()
          onSetLogs(input as string)
        }
        else toast.error('Value must be numeric')
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (intervalTime) {
      const intervalId = setInterval(() => {
        const totalFibonacciEntries = Object.entries(fibonacciNumbers)
        const fibonacciString = totalFibonacciEntries
          .reduce((previous, [key, value], index) => {
            const isLastIndex = totalFibonacciEntries.length - 1 === index
            return `${previous}${key}:${value}${isLastIndex ? '' : ', '}`
          }, '')

        onSetLogs(fibonacciString)
        setTick((e) => e + 1)
      }, (intervalTime * 1000))

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [intervalTime, fibonacciNumbers, tick])


  return (
    <StyledMainContainer>
      <StyledInputContainer>
        <Input
          {...mode}
          value={input}
          onChange={onInputChange}
          onSubmit={onSubmit}
        />
        <Button onClick={onSubmit} variant='contained'>Submit</Button>
        <Button onClick={onSubmit} variant='contained'>Reset</Button>
      </StyledInputContainer>
      <StyledOutputContainer>
        {logs.map((log) =>
          <Typography>{log}</Typography>
        )}
      </StyledOutputContainer>
    </StyledMainContainer>
  );
}
