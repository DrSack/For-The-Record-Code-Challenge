import { AppBar, Toolbar, Typography } from "@mui/material"

export const Header = () => {
  return (
    <AppBar>
      <Toolbar sx={{
        backgroundColor: 'white',
        color: 'black'
      }}>
        <Typography component="div" sx={{ fontSize: 20 }}>
          FTR Code Assessment
        </Typography>
      </Toolbar>
    </AppBar>
  )
}