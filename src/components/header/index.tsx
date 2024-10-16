import { AppBar, Typography } from "@mui/material"
import { StyledToolbar, StyledTypography } from "./style"

export const Header = () => {
  return (
    <AppBar data-testid='main-header'>
      <StyledToolbar>
        <StyledTypography>
          FTR Code Assessment
        </StyledTypography>
      </StyledToolbar>
    </AppBar>
  )
}