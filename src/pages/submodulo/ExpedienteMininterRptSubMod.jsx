import React, { useEffect } from 'react'
import {
   Paper,
   Box, 
   Typography,
   Divider,
   Button
} from '@material-ui/core'
import { Print } from '@material-ui/icons'
import Fade from 'react-reveal'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import MyAutocomplete from 'components/Formik/Autocomplete'
import useExpedienteMininter from 'hooks/useExpedienteMininter'

const useStyle = makeStyles({
   paper:{
      width: 430,
      padding: 10
   }
})

export default function ExpedienteMininterRptSubmod(){

   /*» HOOK'S  */
   const classes = useStyle()
   const { 
      ubicacionMininterDb, 
      handleFindAllUbicacionMininter,
      handleGetRptByUbicacionExpeMininter
   } = useExpedienteMininter()

   useEffect(() => { handleFindAllUbicacionMininter() }, [])

   return (
      <>
         <Fade>
            <Box display='flex' height='80vh' justifyContent='center' alignItems='center'>
               <Paper variant='outlined' className={classes.paper}>
                  <Typography gutterBottom variant='h4' color='primary'>REPORTE DE EXPEDIENTES MININTER</Typography>
                  <Divider />
                  <Formik
                     initialValues={{
                        ubicacion: ''
                     }}
                     validationSchema={Yup.object({
                        ubicacion: Yup.object().required('¡Requerido!').nullable()
                     })}
                     onSubmit={(values, { resetForm }) => {
                        handleGetRptByUbicacionExpeMininter(values)
                        resetForm()
                     }}
                  >
                     {
                        ({...rest}) => (
                           <Form>
                              <Box display='flex' m={1} height={100} justifyContent='space-between' alignItems='center' >
                                 <MyAutocomplete 
                                    name='ubicacion' 
                                    label='Ubicación expediente' 
                                    width={20}
                                    opt={ubicacionMininterDb}
                                    {...rest}
                                 />
                                 <Button
                                    type='submit'
                                    variant='contained'
                                 >
                                    <Print />
                                 </Button>
                              </Box>
                           </Form>
                        )
                     }
                  </Formik>
               </Paper>
            </Box>
         </Fade>
      </>
   )
}