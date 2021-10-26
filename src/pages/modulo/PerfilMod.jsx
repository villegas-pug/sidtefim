import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
   Box,
   Paper, 
   Typography,
   Divider,
   InputAdornment,
   Button,
   Tooltip,
   CircularProgress
} from '@material-ui/core'
import {
   AccountCircle,
   VisibilityOff,
   Update,
   DeleteSweep
} from '@material-ui/icons'
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import MyFormGroup from 'components/Styled/FormGroup'
import MyTextField from 'components/Formik/MyTextField'
import useAuth from 'hooks/useAuth'


const useStyle = makeStyles({
   paper: {
      padding: 10,
      width: 280,
   },
   divider: {
      marginBottom: 20
   }
})

export default function PerfilMod(){
   /*» HOOK'S  */
   const classes = useStyle()
  
   /*» CUSTOM HOOK'S  */
   const { 
      authLoading, 
      userCredentials: { login: userAuth },
      handleUpdatePasswordByLogin
   } = useAuth()
   
   /*» HANDLER'S  */

   /*» DEP'S  */
   const optForm = {
      initialValues:{
         login: userAuth,
         password: '',
         repeatPassword: '',
      },
      validationSchema: Yup.object({
         password: Yup.string()
            .required('¡Requerido!')
            .min(5, '¡Almenos 5 caracteres!')
            .matches(/[a-zA-Z]/, '¡La contraseña debe contener solo letras!'),
         repeatPassword: Yup.string()
            .required('¡Requerido!')
            .oneOf([Yup.ref('password')], '¡Las contraseñas deben coincidir!')
      }),
      onSubmit: (values, meta) => (handleUpdatePasswordByLogin(values), meta.resetForm())
   }

   return (
      <Box display='flex' height='85%' justifyContent='center' alignItems='center'>
         <Formik
            {...optForm}
         >
            {
               () => (
                  <Form>
                     <Fade>
                        <Paper elevation={1} className={classes.paper}>
                           <Typography 
                              gutterBottom
                              variant='h4' 
                              color='primary' 
                           >
                              ACTUALIZAR CREDENCIALES
                           </Typography>
                           <Divider className={classes.divider}/>
                        
                           <MyFormGroup>
                              <MyTextField 
                                 name='login' 
                                 size={15}
                                 label='usuario'
                                 focused
                                 disabled
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position='end'>
                                          <AccountCircle />
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </MyFormGroup>
                           <MyFormGroup>
                              <MyTextField 
                                 name='password'
                                 type='password'
                                 size={15} 
                                 label='contraseña' 
                                 focused 
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position='end'>
                                          <VisibilityOff />
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </MyFormGroup>
                           <MyFormGroup>
                              <MyTextField 
                                 name='repeatPassword' 
                                 type='password'
                                 size={15} 
                                 label='repetir contraseña'
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position='end'>
                                          <VisibilityOff />
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </MyFormGroup>
                           <Box display='flex' justifyContent='space-between'>
                              <Tooltip
                                 title={<Typography variant='h6' color='initial'>Actualizar</Typography>}
                                 placement='right-start' 
                                 arrow
                              >
                                 <Button
                                    type='submit'
                                    variant='contained'
                                    size='small'
                                 >
                                    {
                                       authLoading
                                          ? <CircularProgress size={20} color='inherit' />
                                          : <Update color='inherit' fontSize='large' />
                                    }
                                 </Button>
                              </Tooltip>
                              <Tooltip
                                 title={<Typography variant='h6' color='initial'>Limpiar</Typography>}
                                 placement='left-start' 
                                 arrow
                              >
                                 <Button
                                    type='reset'
                                    variant='contained'
                                    color='inherit'
                                    size='small'
                                 >
                                    <DeleteSweep color='inherit' fontSize='large' />
                                 </Button>
                              </Tooltip>
                           </Box>
                        </Paper>
                     </Fade>
                  </Form>         
               )
            }
         </Formik>
      </Box>
   )
}
