import { Box, styled } from "@mui/material";

export const StyledMainContainer = styled(Box)(() => ({
  background: 'white',
  border: '1px solid black',
  height: '100%',
  display: 'flex',
  flexDirection: 'column-reverse'
}));

export const StyledOutputContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto'
}));

export const StyledInputContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row'
}));