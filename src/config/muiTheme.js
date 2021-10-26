import { createMuiTheme } from '@material-ui/core'

export const rootTheme = createMuiTheme({
   palette: {
      primary: {
         main: '#004795'
      },
      secondary: {
         main: '#DD5145'
      },
      error: {
         main: '#DD5145'
      },
   },
   typography: {
      fontFamily: 'Ubuntu Condensed, sans-serif',
      fontSize: 14,
      h1: {
         fontWeight: 1000,
         fontSize: 20
      },
      h2: {
         fontWeight: 1000,
         fontSize: 18
      },
      h3: {
         fontWeight: 1000,
         fontSize: 16
      },
      h4:{
         fontWeight: 1000,
         fontSize: 14
      },
      h5:{
         fontWeight: 500,
         fontSize: 12
      },
      h6:{
         fontWeight: 500,
         fontSize: 10
      },
   },
   overrides: {
      MuiTextField: {
         root: {
            fontSize: 14
         }
      },
      MuiTabs:{
         indicator:{
            backgroundColor: '#fff'
         }
      },
   },
   props: {
      MuiButton: {
         color: 'primary',
      },
   }
})

export const inputTheme = createMuiTheme({
   ...rootTheme,
   palette: {
      primary: {
         main: '#004795'
      },
      secondary: {
         main: '#DD5145'
      },
   },
})