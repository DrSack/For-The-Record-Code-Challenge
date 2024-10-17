'use client'

import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
}));

export const StyledLayoutBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

