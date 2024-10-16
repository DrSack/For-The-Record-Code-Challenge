'use client';

import { Input } from '@/components';
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useRef } from 'react';
import { FIRST_1000_FIBONACCI_NUMBERS } from './constants';
import { StyledInputContainer, StyledMainContainer, StyledOutputContainer } from './styles';
import { useIntervalTimer } from '@/hooks/use-interval-timer';
import { UseFibonacci } from '@/hooks/use-fibonacci';

export default function Home() {
  const ref = useRef<HTMLSpanElement | null>(null);

  const {
    fibonacciNumbers,
    logs,
    mode,
    input,
    onInputChange,
    onSetLogs,
    onSubmit
  } = UseFibonacci({
    fibonacciNumbersCompare: FIRST_1000_FIBONACCI_NUMBERS
  })

  const { onHalt, onResume } = useIntervalTimer({
    fibonacciNumbers,
    logs,
    onSetLogs
  })


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
          <Typography key={`log-message-${index}`} ref={index === logs.length - 1 ? ref : undefined}>{log}</Typography>
        )}
      </StyledOutputContainer>
    </StyledMainContainer>
  );
}
