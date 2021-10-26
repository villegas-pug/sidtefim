import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import { inputTheme } from 'config/muiTheme'

export default function MyButton({ children, ...rest}) {

   return (
      <ThemeProvider theme={inputTheme}>
         <Button
            {...rest}
         >
            {children}
         </Button>
      </ThemeProvider>
   )
}

MyButton.propTypes = {
   children: PropTypes.any.isRequired,
}