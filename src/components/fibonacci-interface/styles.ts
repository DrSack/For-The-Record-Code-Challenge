'use client'

import { Box, styled } from "@mui/material";

export const StyledFibonacciInterfaceContainer = styled(Box)(() => ({
  background: 'white',
  border: '1px solid black',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column-reverse'
}));

export const StyledInputContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row'
}));