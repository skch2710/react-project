import React from 'react'
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import theme from './theme/theme'
import App from './App'

const ThemeProvider = () => {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider