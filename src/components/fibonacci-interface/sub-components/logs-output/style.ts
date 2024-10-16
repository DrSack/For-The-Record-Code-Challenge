import { Box, styled } from "@mui/material";

export const StyledOutputContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto'
}));

export const StyledEmptyLog = styled(Box)(() => ({
  height: '16px',
}));
