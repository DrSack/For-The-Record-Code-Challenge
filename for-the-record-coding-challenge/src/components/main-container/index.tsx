'use client'

import { Box, styled } from "@mui/material"
import { PropsWithChildren } from "react"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const StyledMainContainer = styled(Box)(({ theme }) => ({
  height: '90vh',
  paddingLeft:  theme.spacing(8),
  paddingRight:  theme.spacing(8),
  marginTop: theme.spacing(10)
}));

export const MainContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <ToastContainer />
      <StyledMainContainer>{children}</StyledMainContainer>
    </>
  )
}