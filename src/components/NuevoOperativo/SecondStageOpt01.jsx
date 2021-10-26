import React, { useMemo } from 'react'
import {
   Paper,
   Box,
   Divider,
   Button, Typography
} from '@material-ui/core'
import { Done, NavigateBefore, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import Flash from 'react-reveal/Flash'
import * as Yup from 'yup'

import FormGroup from 'components/Styled/FormGroup'
import MyTextField from 'components/Formik/MyTextField'
import MyAutocomplete from 'components/Formik/Autocomplete'
import MyButton from 'components/MuiButton'

import useTipoOperativo from 'hooks/useTipoOperativo'
import useOperativo from 'hooks/useOperativo'
import useTipoDocumento from 'hooks/useTipoDocumento'
import MySelect from 'components/Formik/MySelect'
import useStages from 'hooks/useStages'
import useBreakpoints from 'hooks/useBreakpoints'
import { useEffect } from 'react'
import useTipoInfraccion from 'hooks/useTipoInfraccion'
import usePais from 'hooks/usePais'

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`
const optSexo = [
   { key: 'Femenido', value: 'Femenido' },
   { key: 'Masculino', value: 'Masculino' },
]

const optConfirm = [
   { key: 'Si', value: 'Si' },
   { key: 'No', value: 'No' },
]

const useStyles = makeStyles({
   paper: {
      width: ({ currentScreen, screens }) => currentScreen != screens.desktop && 600,
      padding: 20
   }
})

export default function ThirdStage() {

   /*» HOOK'S STORE...  */
   const { tipoOpertativoDb } = useTipoOperativo()
   const { tipoInfraccionDb } = useTipoInfraccion()
   const { paisDb } = usePais()
   const { inputValues, handleChangeInputControlled, handleChangeInputUncontrolled } = useOperativo()
   const { handlePrevStage, handleResetStages } = useStages()

   const { unsuscribeScreenResizeListener, ...rest } = useBreakpoints()

   /*» HOOK'S  */
   const stylesMui = useStyles(rest)
   const { tipoDocumentoDb } = useTipoDocumento()

   /*» EFFECT'S  */
   useEffect(() => () => { unsuscribeScreenResizeListener() }, [])/*» Llamada cuando el componente es demontado...  */

   /*» DEPENDENCY'S  */
   const optFrm = useMemo(() => ({
      initialValues: inputValues,
      validationSchema: Yup.object({
         nombres: Yup.string().required('¡Campo requerido!'),
         tipoDocumento: Yup.string().required('¡Campo requerido!').nullable('¡Campo requerido!'),
         numeroDocumento: Yup.string().required('¡Campo requerido!'),
         pais: Yup.string().required('¡Campo requerido!').nullable('¡Campo requerido!'),
         sexo: Yup.string().required('¡Campo requerido!'),
         infraccion: Yup.string().required('¡Campo requerido!'),
         tipoInfraccion: Yup.string().required('¡Campo requerido!').nullable('¡Campo requerido!'),
         disposicionPNP: Yup.string().required('¡Campo requerido!'),
         situacionMigratoria: Yup.string().required('¡Campo requerido!'),
         refugiado: Yup.string().required('¡Campo requerido!'),
         conMenor: Yup.string().required('¡Campo requerido!'),
         datosMenor: Yup.string().required('¡Campo requerido!'),
         observaciones: Yup.string().required('¡Campo requerido!'),
      })

   }), [inputValues])

   /*»  HANDLER'S*/

   return (
      <>
         <Formik
            {...optFrm}
         >
            {({ ...rest }) => (
               <Flash>
                  <Form
                     onChange={handleChangeInputControlled}
                  >
                     <Container>
                        <Paper elevation={5} className={stylesMui.paper}>
                           <Typography variant="h3" color="initial">» DETALLE OPERATIVO</Typography>
                           <Divider style={{ marginBottom: 20 }} />
                           <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                              <FormGroup>
                                 <MyTextField name='nombres' size={20} label="Nombres" focused />
                              </FormGroup>
                              <FormGroup>
                                 <MySelect
                                    name='tipoDocumento'
                                    width={13}
                                    label='Tipo documento'
                                    opt={tipoDocumentoDb}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MyTextField name='numeroDocumento' size={10} label="#Documento" />
                              </FormGroup>
                              <FormGroup>
                                 <MySelect
                                    name='sexo'
                                    width={10}
                                    label='Sexo'
                                    opt={optSexo}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MyAutocomplete
                                    name='pais'
                                    label='Pais'
                                    width={14}
                                    opt={paisDb}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest} />
                              </FormGroup>
                              <FormGroup>
                                 <MySelect
                                    name='infraccion'
                                    label='Infracción'
                                    width={7}
                                    opt={optConfirm}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MyAutocomplete
                                    name='tipoInfraccion'
                                    label='Tipo infracción'
                                    width={50}
                                    opt={tipoInfraccionDb}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MySelect
                                    name='disposicionPNP'
                                    width={12}
                                    label='¿Disposición PNP?'
                                    opt={optConfirm}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MySelect
                                    name='situacionMigratoria'
                                    width={13}
                                    label='¿Situacion migratoria?'
                                    opt={tipoOpertativoDb}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MySelect
                                    name='refugiado'
                                    width={8}
                                    label='¿Refugiado?'
                                    opt={optConfirm}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MySelect
                                    name='conMenor'
                                    width={9}
                                    label='¿Con menor?'
                                    opt={optConfirm}
                                    handleChangeUncontrolled={handleChangeInputUncontrolled}
                                    {...rest}
                                 />
                              </FormGroup>
                              <FormGroup>
                                 <MyTextField name='datosMenor' size={30} label="Datos menor" />
                              </FormGroup>
                              <FormGroup>
                                 <MyTextField name='observaciones' size={30} label="Observaciones" />
                              </FormGroup>
                           </Box>

                           <Divider style={{ marginBottom: 15 }} />
                           <Box display='flex' flex justifyContent='space-between'>
                              <MyButton
                                 variant='outlined'
                                 color='secondary'
                                 startIcon={<Cancel />}
                                 onClick={handleResetStages}
                              >
                                 CANCELAR
                              </MyButton>
                              <Button
                                 style={{ marginLeft: 'auto', marginRight: 5 }}
                                 variant='contained'
                                 startIcon={<NavigateBefore />}
                                 onClick={handlePrevStage}
                              >
                                 REGRESAR
                              </Button>
                              <Button
                                 type='submit'
                                 variant='contained'
                                 startIcon={<Done />}
                              >
                                 TERMINAR
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