import React from 'react'

import PropTypes from 'prop-types'

import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'

export default function SimpleAutocomplete({ label, width, opt, ...rest }) {

   const { name, touched, errors, values, focused, setValues, setTouched } = rest

   /*» HANDLERS ...  */ 
   const handleChange = (_, value) => { setValues({ ...values, [name]: value ?? '' }) }
   const handleBlur = () => { setTouched({ ...touched, [name]: true }) }

   /*» DEP'S  */
   const isErr = errors[name] && touched[name] ? errors[name] : ''

   return (
      <Autocomplete
         {...rest}
         freeSolo
         options={opt}
         noOptionsText='¡No hay registros!'
         loadingText='Cargando...'
         value={values[name]}
         style={{ width: `${width}rem`}}
         renderInput={(params) => (
            <TextField
               autoFocus={focused}
               {...params}
               label={label}
               variant='outlined'
               error={Boolean(isErr)}
               size='small'
               helperText={isErr}
            />
         )}
         onChange={ handleChange }
         onInputChange={ handleChange }
         onBlur={ handleBlur }
      />
   )
}

SimpleAutocomplete.propTypes = {
   label: PropTypes.string.isRequired, 
   width: PropTypes.string.isRequired, 
   opt: PropTypes.object.isRequired, 
   handleChangeUncontrolled: PropTypes.func.isRequired
}