import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { TextField } from '@material-ui/core'

export default function MyTextField({ type, size, label, focused, ...rest }) {
   const [fieldProps, meta] = useField(rest)
   const err = (meta.touched && meta.error) ? meta.error : ''

   return (
      <TextField
         {...fieldProps}
         {...rest}
         type={type}
         color='primary'
         variant='outlined'
         size='small'
         autoFocus={!!focused}
         style={{ width: `${size}rem` }}
         label={label}
         error={Boolean(err)}
         InputLabelProps={{
            shrink: type === 'date' || meta.value && true
         }}
         helperText={err}
         autoComplete='off'
      />
   )
}

MyTextField.propTypes = {
   type: PropTypes.string, 
   size: PropTypes.number, 
   label: PropTypes.string.isRequired, 
   focused: PropTypes.bool
}