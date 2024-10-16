import { Box, styled } from "@mui/material";

export const StyledLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '90vh',
  paddingLeft:  theme.spacing(8),
  paddingRight:  theme.spacing(8),
  marginTop: theme.spacing(10)
}));
