import React, { useState } from 'react'
import { Switch, FormControlLabel } from '@material-ui/core'

export default function ({ title }) {

   const [open, setOpen] = useState(false)

   return (
      <FormControlLabel
         control={<Switch />}
         label={title}
      />
   )
}