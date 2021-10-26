import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { 
   Button, 
   ButtonGroup,
   Typography,
   Paper,
   Box,
   Divider
} from '@material-ui/core'
import { 
   SkipNext, 
   SkipPrevious,
   Print,
   DeleteSweep 
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import  DashboardCharts, { DashboardFilter, DashboardContent } from 'components/DashboardCharts'
import MyTextField from 'components/Formik/MyTextField'
import MyFormGroup from 'components/Styled/FormGroup'
import MySelect from 'components/Formik/MySelect'
import MyAutocomplete from 'components/Formik/Autocomplete'

import useDistrito from 'hooks/useDistrito'
import useEmpresa from 'hooks/useEmpresa'
import useOperativo from 'hooks/useOperativo'
import ModalLoader from 'components/Styled/ModalLoader'
import OperativoToExcel from 'components/OperativoToExcel'

const BodyDashboard = styled.body`
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
`

const useStyle = makeStyles({
   paper: {
      width: 580,
      padding: 10
   },
   form:{
      width: '100%'
   },
   typography:{
      display: 'inline-block',
      margin: '0 1rem',
      lineHeight: '2rem'
   }
})

const optSexo = [
   { idSexo: 'FEMENINO', descripcion: 'FEMENINO' },
   { idSexo: 'MASCULINO', descripcion: 'MASCULINO' }
]

const optModalidad = [
   { idModalidad: 'PRESENCIAL', descripcion: 'PRESENCIAL' },
   { idModalidad: 'REMOTO', descripcion: 'REMOTO' },
]

export default function OperativoGridRpt({handleCurrentNav}) {
   
   /*» CUSTOM HOOK'S  */
   const classes = useStyle()
   const { opeByCustomFilterToExcelLoading, handleFindOpeByFilterToExcel } = useOperativo()
   const { distritoDb } = useDistrito()
   const { handleListEmpresa, entidadSolicitaOpeDb } = useEmpresa()
   
   /*» HANDLER'S  */
   const handleChangeUncontrolled = (payload) => {console.log(payload)}

   /*» EFFECT'S  */
   useEffect(() => { handleListEmpresa() }, [])

   /*» DEPENDENCY'S */
   const optForm = {
      initialValues: {
         fecIni: '',
         fecFin: '',
         dependencia: '',
         tipoOperativo: '',
         sexo: '',
         modalidad: ''
      },
      validationSchema: Yup.object({
         fecIni: Yup.date()
            .required('¡Fecha inicial requerida!')
            .min('2019-01-01', ({min}) => `Debe ser mayor o igual a ${format(min, 'P', { locale: es })}`),
         fecFin: Yup.date()
            .required('¡Fecha final requerida!')
            .min(Yup.ref('fecIni'), ({min}) => `Debe ser mayor o igual a ${format(min, 'P', { locale: es })}` ),
      }),
      onSubmit: (values) => { handleFindOpeByFilterToExcel(values) }
   }
   
   return (
      <>
         <DashboardCharts>
            <DashboardFilter>
               <ButtonGroup color='inherit' variant='contained' style={{marginBottom: 20, alignSelf: 'center'}} >
                  <Button 
                     startIcon={<SkipPrevious fontSize='large' />} 
                     onClick={() => handleCurrentNav(null)} 
                  />
                  <Button endIcon={<SkipNext fontSize='large' />} disabled />
               </ButtonGroup>
            </DashboardFilter>
            <DashboardContent>
               <BodyDashboard>

                  <Formik
                     {...optForm}
                  >
                     {
                        ({...rest}) => (
                           <Paper variant='outlined' className={classes.paper}>
                              {/*» HEADER  */}
                              <Typography gutterBottom variant='h4' color='primary'>FILTRO</Typography>
                              <Divider />

                              <Form className={classes.form}>
                                 {/*» BODY  */}
                                 <Box m={2} display='flex' flexDirection='column'>
                                    <MyFormGroup>
                                       <Typography className={classes.typography} variant='h5' color='textSecondary'>DEL</Typography>
                                       <MyTextField 
                                          type='date' 
                                          name='fecIni' 
                                          size={13} 
                                          label='Fecha Inicio' 
                                          focused 
                                       />
                                       <Typography className={classes.typography} variant='h5' color='textSecondary'>AL</Typography>
                                       <MyTextField 
                                          type='date' 
                                          name='fecFin' 
                                          size={13} 
                                          label='Fecha Fin' 
                                       />
                                    </MyFormGroup>

                                    <MyFormGroup>
                                       <MySelect 
                                          name='sexo' 
                                          label='Sexo' 
                                          width={10} 
                                          opt={optSexo} 
                                          handleChangeUncontrolled={handleChangeUncontrolled}
                                          {...rest}
                                       />
                                    </MyFormGroup>

                                    <MyFormGroup>
                                       <MySelect 
                                          name='modalidad' 
                                          label='Modalidad' 
                                          width={10} 
                                          opt={optModalidad} 
                                          handleChangeUncontrolled={handleChangeUncontrolled}
                                          {...rest}
                                       />
                                    </MyFormGroup>

                                    <MyFormGroup>
                                       <MyAutocomplete 
                                          name='dependencia'
                                          label='¿Dónde se realizó el Operativo?'
                                          width={32}
                                          opt={distritoDb}
                                          handleChangeUncontrolled={handleChangeUncontrolled}
                                          {...rest}
                                       />
                                    </MyFormGroup>

                                    <MyFormGroup>
                                       <MyAutocomplete 
                                          name='tipoOperativo'
                                          label='Tipo Operativo'
                                          width={32}
                                          opt={entidadSolicitaOpeDb}
                                          handleChangeUncontrolled={handleChangeUncontrolled}
                                          {...rest}
                                       />
                                    </MyFormGroup>

                                    <Divider />{/*» FOOTER  */}
                                    <Box display='flex' justifyContent='space-around' mt={2}>
                                       <Button
                                          type='submit'
                                          variant='contained'
                                          size='large'
                                          startIcon={<Print />}
                                       >
                                          <Typography variant="h4">Generar</Typography>
                                       </Button>
                                       <Button
                                          type='reset'
                                          variant='contained'
                                          size='large'
                                          color='inherit'
                                          startIcon={<DeleteSweep />}
                                       >
                                          <Typography variant="h4">Limpiar</Typography>
                                       </Button>
                                    </Box>
                                 </Box>
                              </Form>
                           </Paper>
                        )
                     }
                  </Formik>
               </BodyDashboard>
            </DashboardContent>
         </DashboardCharts>

         {/*» DOWNLOAD FILE  */}
         <OperativoToExcel />

         {/*» LOADING  */}
         {
            opeByCustomFilterToExcelLoading && <ModalLoader />
         }
      </>
   )
}

OperativoGridRpt.propTypes = {
   handleCurrentNav: PropTypes.func.isRequired
}