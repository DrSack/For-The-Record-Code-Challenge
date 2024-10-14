'use client';

import { Input } from '@/components';
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react';
import { isFinite } from 'lodash';
import { toast } from 'react-toastify'
import { FibonacciNumbers, Mode, ModeEnum } from './type';
import { MODE } from './constants';
import { StyledInputContainer, StyledMainContainer, StyledOutputContainer } from './styles';
import { getFibonacciSequence } from '@/helpers';

const FIRST_1000_FIBONACCI_NUMBERS = getFibonacciSequence(1000)

export default function Home() {
  const ref = useRef<any>();

  // add hooks in next iteration. Refactor. Add tests then deploy.

  const [mode, setMode] = useState<Mode>(MODE.initial)
  const [input, setInput] = useState<string | undefined>(undefined)
  const [intervalTime, setIntervalTime] = useState<number | undefined>(undefined);
  const [fibonacciNumbers, setFibonacciNumbers] = useState<FibonacciNumbers>({})
  const [logs, setLogs] = useState<string[]>([]);
  const [tick, setTick] = useState(0);
  const [halt, setHalt] = useState(false);

  const onInputChange = (value: string) => setInput(value)
  const onInputClear = () => setInput('')

  const onHalt = () => {
    onSetLogs('timer halted')
    setHalt(true)
  }

  const onResume = () => {
    onSetLogs('timer resumed')
    setHalt(false)
  }

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

    if (FIRST_1000_FIBONACCI_NUMBERS.includes(value)) {
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

  useEffect(() => {
    if (intervalTime) {
      const intervalId = setInterval(() => {
        const totalFibonacciEntries = Object.entries(fibonacciNumbers)
        const fibonacciString = totalFibonacciEntries
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .reduce((previous, [key, value], index) => {
            const isLastIndex = totalFibonacciEntries.length - 1 === index
            return `${previous}${key}:${value}${isLastIndex ? '' : ', '}`
          }, '')

        onSetLogs(fibonacciString)
        setTick((e) => e + 1)
      }, (intervalTime * 1000))

      if (halt) clearInterval(intervalId);
      return () => clearInterval(intervalId)
    }
  }, [intervalTime, logs, fibonacciNumbers, tick, halt])

  useEffect(() => {
    ref?.current?.scrollIntoView?.();
  }, [logs])

  return (
    <StyledMainContainer>
      <StyledInputContainer>
        <Input
          {...mode}
          value={input}
          onChange={onInputChange}
          onSubmit={onSubmit}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, padding: 1 }}>
          <Button onClick={onSubmit} variant='contained'>Submit</Button>
          <Button color='success' onClick={onHalt} variant='contained'>Halt</Button>
          <Button color='warning' onClick={onResume} variant='contained'>Resume</Button>
          <Button color='error' onClick={() => { }} variant='contained'>Quit</Button>
        </Box>
      </StyledInputContainer>
      <StyledOutputContainer>
        {logs.map((log, index) =>
          <Typography ref={index === logs.length - 1 ? ref : undefined}>{log}</Typography>
        )}
      </StyledOutputContainer>
    </StyledMainContainer>
  );
}
