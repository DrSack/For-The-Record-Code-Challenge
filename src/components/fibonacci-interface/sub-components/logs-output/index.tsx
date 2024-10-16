import { Typography } from "@mui/material"
import { useEffect, useRef } from "react"
import { StyledOutputContainer } from "./style"

interface LogsOutputProps {
  logs: string[]
}

export const LogsOutput = ({ logs }: LogsOutputProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    ref?.current?.scrollIntoView?.();
  }, [logs])

  return (
    <StyledOutputContainer data-testid='fibonacci-interface-output-container'>
      {logs.map((log, index) =>
        <Typography
          key={`log-message-${index}`}
          ref={index === logs.length - 1 ? ref : undefined}>
          {log}
        </Typography>
      )}
    </StyledOutputContainer>
  )
}