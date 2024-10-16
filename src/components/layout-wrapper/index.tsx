'use client'
import { PropsWithChildren } from "react"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { StyledLayoutWrapper } from "./style";

export const LayoutWrapper = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ToastContainer />
      <StyledLayoutWrapper>{children}</StyledLayoutWrapper>
    </>
  )
}