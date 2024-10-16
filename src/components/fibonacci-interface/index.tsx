'use client'

import { StyledFibonacciInterfaceContainer, StyledInputContainer } from './styles';
import { LogsOutput } from './sub-components/logs-output';
import { Input } from './sub-components/input';
import { ButtonControls } from './sub-components';
import { UseFibonacci, useIntervalTimer } from './hooks';
import { QuitDialog } from './sub-components/quit-dialog';

interface FibonacciInterfaceProps {
  fibonacciNumbersToCompare: number[];
}

export const FibonacciInterface = ({ fibonacciNumbersToCompare }: FibonacciInterfaceProps) => {
  const {
    mode,
    logs,
    input,
    intervalTime,
    fibonacciNumbers,
    onSubmit,
    onSetLog,
    onQuitLog,
    onInputChange,
  } = UseFibonacci({
    fibonacciNumbersToCompare
  })

  const { quit, onHalt, onResume, onQuit } = useIntervalTimer({
    logs,
    intervalTime,
    fibonacciNumbers,
    onSetLog,
    onQuitLog,
  })

  return (
    <>
      <StyledFibonacciInterfaceContainer>
        <StyledInputContainer>
          <Input
            {...mode}
            value={input}
            onChange={onInputChange}
            onSubmit={onSubmit}
          />
          <ButtonControls
            onSubmit={onSubmit}
            onQuit={onQuit}
            onHalt={onHalt}
            onResume={onResume}
          />
        </StyledInputContainer>
        <LogsOutput logs={logs} />
      </StyledFibonacciInterfaceContainer>
      <QuitDialog quit={quit} />
    </>
  );
}