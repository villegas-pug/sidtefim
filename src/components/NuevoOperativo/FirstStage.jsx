import React, { useMemo } from 'react'
import {
   Paper,
   Box,
   Divider,
   Button, 
   Typography, 
   TextField,
   Tooltip
} from '@material-ui/core'
import { NavigateNext, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import Flash from 'react-reveal/Flash'
import * as Yup from 'yup'

import FormGroup from 'components/Styled/FormGroup'
import MyTextField from 'components/Formik/MyTextField'
import MyAutocomplete from 'components/Formik/Autocomplete'
import MyButton from 'components/MuiButton'
import MySelect from 'components/Formik/MySelect'


import useEmpresa from 'hooks/useEmpresa'
import useOperativo from 'hooks/useOperativo'
import useDistrito from 'hooks/useDistrito'
import useStages from 'hooks/useStages'
import useBreakpoints from 'hooks/useBreakpoints'
import { useEffect } from 'react'
import useAuth from 'hooks/useAuth'

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`

const optModalidadOperativo = [
   { id: 'Presencial', description: 'Presencial' },
   { id: 'Remoto', description: 'Remoto' },
]

const useStyles = makeStyles({
   paper: {
      width: ({ currentScreen, screens }) => currentScreen == screens.desktop ? 700 : 600,
      padding: '12px 25px',
   },
   box: {
      flexWrap: ({ currentScreen, screens }) => currentScreen == screens.desktop && 'wrap',
      flexDirection: ({ currentScreen, screens }) => currentScreen == screens.desktop && 'row',
      justifyContent: ({ currentScreen, screens }) => currentScreen == screens.desktop && 'space-between'
   },
   textField: {
      width: '27rem'
   }

})

const DEPENDENCIA_LIMA = 'LIMA'

export default function FirstStage() {
   
   /*» HOOKS  */
   const { currentScreen, screens, unsuscribeScreenResizeListener } = useBreakpoints()
   const classes = useStyles({ currentScreen, screens })

   /*» CUSTOM HOOK'S  */
   const { inputValues, handleChangeInputControlled, handleChangeInputUncontrolled, handleInputsOnReset } = useOperativo()
   const { distritoDb } = useDistrito()
   const { entidadSolicitaOpeDb } = useEmpresa()
   const { handleNextStage } = useStages('NuevoOperativoSubMod')
   const { userCredentials: { dependencia: { nombre: dependenciaAuth } } } = useAuth()

   /*» EFFECT'S  */
   useEffect(() => () => { unsuscribeScreenResizeListener() }, [])

   /*» DEPENDENCY'S  */
   const optFrm = useMemo(() => ({
      initialValues: inputValues,
      validationSchema: Yup.object({
         fechaOperativo: Yup.string().required('¡Requerido!'),
         dependencia: Yup.string().required('¡Requerido!').nullable(),
         modalidadOperativo: Yup.string().required('¡Requerido!'),
         entidadSolicitaOperativo: Yup.string().required('¡Requerido!').nullable(),
      }),
      onSubmit: () => { handleNextStage() }
   }), [inputValues])

   return (
      <>
         <Formik {...optFrm} >
            {({ ...rest }) => (
               <Flash>
                  <Form
                     onChange={handleChangeInputControlled}
                  >
                     <Container>
                        <Paper elevation={5} className={classes.paper}>
                           <Typography gutterBottom variant="h4" color='primary'>NUEVO OPERATIVO</Typography>
                           <Divider style={{ marginBottom: 20 }} />
                           <Box display='flex' flexDirection='column' className={classes.box}>

                              <FormGroup>
                                 <MyTextField type='date' name='fechaOperativo' size={10} label="Fecha operativo" focused />
                              </FormGroup>
                              {
                                 dependenciaAuth === DEPENDENCIA_LIMA
                                    ? (
                                       <FormGroup>
                                          <MyAutocomplete
                                             name='dependencia'
                                             label='¿Dónde se realizó el Operativo?'
                                             width={27}
                                             opt={distritoDb}
                                             handleChangeUncontrolled={handleChangeInputUncontrolled}
                                             {...rest} />
                                       </FormGroup>
                                    ):(
                                       <FormGroup>
                                          <TextField
                                             label='¿Dónde se realiza el Operativo?'
                                             value={dependenciaAuth}
                                             color='primary'
                                             disabled
                                             className={classes.textField}
                                          />
                                       </FormGroup>

                                    )
                              }

                              <FormGroup>
                                 <MySelect
                                    name='modalidadOperativo'
                                    width={25}
                                    label='Modalidad operativo'
                                    opt={optModalidadOperativo}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>

                              <FormGroup>
                                 <MyTextField type='text' name='numeroInforme' size={8} label="Número Informe" />
                              </FormGroup>

                              <FormGroup>
                                 <MyAutocomplete
                                    name='entidadSolicitaOperativo'
                                    label='Tipo Operativo'
                                    width={30}
                                    opt={entidadSolicitaOpeDb}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest} 
                                 />
                              </FormGroup>

                              <FormGroup>
                                 <Tooltip 
                                    title={<Typography variant='h5' color='initial'>¡Utilice comas para separar los establecimientos!</Typography>} 
                                    arrow
                                 >
                                    <MyTextField
                                       name='establecimientoVisitado' 
                                       label="Lugar o establecimiento visitado"
                                       size={currentScreen === screens.desktop ? 40 : 33}
                                       multiline
                                    />
                                 </Tooltip>
                              </FormGroup>

                           </Box>
                           <Divider style={{ margin: '10px 0' }} />
                           <Box display='flex' justifyContent='space-between'>
                              <MyButton
                                 variant='outlined'
                                 type='reset'
                                 color='secondary'
                                 startIcon={<Cancel />}
                                 onClick={handleInputsOnReset}
                              >
                                 CANCELAR
                              </MyButton>
                              <Button
                                 type='submit'
                                 variant='contained'
                                 startIcon={<NavigateNext />}
                              >
                                 SIGUIENTE
                              </Button>
                           </Box>
                        </Paper>
                     </Container>
                  </Form>
               </Flash>
            )}
         </Formik>
      </>
   )
}
