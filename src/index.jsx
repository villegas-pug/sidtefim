import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'

import { Provider } from 'react-redux'
import store from 'redux/store'

import { ThemeProvider } from '@material-ui/core'
import { rootTheme } from 'config/muiTheme'

ReactDOM.render(
   <Provider store={store}>
      <ThemeProvider theme={rootTheme}>
         <App />
      </ThemeProvider>
   </Provider>,
   document.getElementById('root')
)