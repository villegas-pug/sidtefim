import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { Grid, Button } from '@material-ui/core'
import * as Yup from 'yup'
import MyAutocomplete from 'components/Formik/Autocomplete'

const usuarioDb = [
   { login: 'rguevarav', nombre: 'Cristopher Guevara Villegas' },
   { login: 'rguevarav', nombre: 'Hector Lavoe' },
]

const initialValues = {
   usuario: ''
}

const handleValidation = Yup.object({
   usuario: Yup.string().required('¡Campo requerido!').nullable('¡Campo requerido!')
})

export default function AsignarProcToEval({ sendSubmit, setSendSubmit, handleOnSubmit }) {

   const submitRef = useRef()

   useEffect(() => {/*-> Escuho el estado del submit desde el Modal  */
      console.log(sendSubmit)
      sendSubmit && submitRef.current.click()
      return () => setSendSubmit(false)
   }, [sendSubmit])



   return (
      <Formik
         initialValues={initialValues}
         onSubmit={handleOnSubmit}
         validationSchema={handleValidation}
      >
         {
            ({ values, setFieldValue, errors }) => (
               <Form>
                  <Grid container>
                     <Grid item xs={12}>
                        <MyAutocomplete
                           name='usuario'
                           label='Usuario'
                           width={29}
                           opt={usuarioDb}
                           setFieldValue={setFieldValue}
                           errors={errors}
                           values={values} />
                     </Grid>
                  </Grid>
                  <Button type='submit' ref={submitRef} hidden />
               </Form>
            )
         }
      </Formik>
   )
}

AsignarProcToEval.propTypes = {
   sendSubmit: PropTypes.func.isRequired, 
   setSendSubmit: PropTypes.func.isRequired, 
   handleOnSubmit: PropTypes.func.isRequired
}