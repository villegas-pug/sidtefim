import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { 
   Box, 
   Button, 
   makeStyles, 
   Paper, 
   Typography,
   CircularProgress,
   IconButton,
   Tooltip
} from '@material-ui/core'
import { 
   NavigateNext, 
   Save, 
   DeleteForever, 
   Search,
   ArrowBackIos,
   FormatListNumbered,
   GroupAdd,
   GroupRemove,
} from '@mui/icons-material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import SimpleAutocomplete from 'components/Formik/SimpleAutocomplete'
import MyTextField from 'components/Formik/MyTextField'
import SpeedDial from 'components/SpeedDial'
import MyTable from 'components/Table'

import usePais from 'hooks/usePais'
import useDistrito from 'hooks/useDistrito'
import useFiscalizacionPosterior from 'hooks/useFiscalizacionPosterior'

import { organigrama, tipoDocumento } from 'db'
import ModalLoader from 'components/Styled/ModalLoader'

const useStyle = makeStyles({
   paper: {
      height: '100%',
      padding: 20
   }
})

const BANDEJA_ENTRADA = 'BANDEJA DE ENTRADA'
const BANDEJA_ASIGNACION = 'BANDEJA DE ASIGNACION'

export default function RecepcionAsignacionSFMSubMod () {

   /*» HOOK'S  */
   const [bandeja, setBandeja] = useState(BANDEJA_ENTRADA)

   /*» CUSTOM-HOOK'S  */
   const classes = useStyle()
   const { 
      solicitudValuesDbLoading,
      bandejaEntradaDbLoading
   } = useFiscalizacionPosterior()

   /*» HANDLERS ...  */
   const handleChangeBandeja = (bandeja) => { setBandeja(bandeja) }

   /*» RENDERING-CONDITIONAL ... */
   if(solicitudValuesDbLoading) return <ModalLoader />
   if(bandejaEntradaDbLoading) return <ModalLoader />

   return (
      <Fade zoom duration={3000}>
         <Box 
            height='85vh'
            overflow='hidden'
         >
            <Paper
               variant='outlined'
               className={ classes.paper }
            >
               <Fade 
                  right
                  mirror
                  collapse
                  duration={250}
                  when={ bandeja === BANDEJA_ENTRADA }
               >
                  <BandejaEntradaSFM handleChangeBandeja={handleChangeBandeja} />
               </Fade>
               <Fade 
                  left
                  mirror
                  duration={250}
                  when={ bandeja === BANDEJA_ASIGNACION }
               >
                  <BandejaAsignaciónSFM handleChangeBandeja={handleChangeBandeja} />
               </Fade>
            </Paper>
         </Box>
      </Fade>
   )
}

const BandejaEntradaSFM = ( { handleChangeBandeja } ) => {

   /*» HOOK'S  */
   const submitRef = useRef({})
   const resetRef = useRef({})

   /*» CUSTOM-HOOK'S  */
   const { nacionalidadDb, handleListPais } = usePais()
   const { simpleDistritoDb, handleListDistrito } = useDistrito()
   const { 
      simpleTipoTramiteDb,
      solicitudValuesDbLoading,
      solicitudValuesDb,
      handleFindAllTipoTramite, 
      handleFindSolicitudByNumeroExpe,
      handleResetSolicitudValues,
      handleSaveDocInBandejaEntrada
   } = useFiscalizacionPosterior()

   /*» EFFECT'S  */
   useEffect(() => { handleListPais() }, [])
   useEffect(() => { handleListDistrito() }, [])
   useEffect(() => { handleFindAllTipoTramite() }, [])
     
   /*» HANDLER'S  */
   const handleFindByNumeroExpediente = ( { values } ) => { 
      if(values?.numeroExpediente.trim() === '') return
      handleFindSolicitudByNumeroExpe(values) 
   }

   /*» DEP'S  */
   /*» ARGUMENT : `optSpeedDialAction`  */
   const optSpeedDialAction = [
      {
         icon: <Save />,
         tooltip: 'Registrar',
         handleOnClick: () => { submitRef.current.click() }
      }, {
         tooltip: 'Limpiar',
         icon: <DeleteForever />,
         handleOnClick: () => { resetRef.current.click() }
      },
   ]

   const optFrm = useMemo(() => ({
      initialValues: {
         tipoDocumento: '',
         numeroDocumento: '',
         unidadSolicitante: '',
         numeroExpediente: '',
         fechaInicioTramite: '',
         fechaIngresoSFM: '',
         tipoDocumentoIdentidad: '',
         numeroDocIdentidad: '',
         administrado: '',
         nacionalidad: '',
         domicilio: '',
         distrito: '',
         procedimiento: '',
         subtipoProcedimiento: '',
         ...solicitudValuesDb,
      },
      validationSchema: Yup.object({
         tipoDocumento: Yup.string().required('¡Requerido!'),
         numeroDocumento: Yup.string().required('¡Requerido!'),
         unidadSolicitante: Yup.string().required('¡Requerido!'),
         numeroExpediente: Yup.string().required('¡Requerido!'),
         fechaInicioTramite: Yup.date().required('¡Requerido!'),
         fechaIngresoSFM: Yup.date().required('¡Requerido!'),
         tipoDocumentoIdentidad: Yup.string().required('¡Requerido!'),
         numeroDocIdentidad: Yup.string().required('¡Requerido!'),
         administrado: Yup.string().required('¡Requerido!'),
         nacionalidad: Yup.string().required('¡Requerido!'),
         domicilio: Yup.string().required('¡Requerido!'),
         distrito: Yup.string().required('¡Requerido!'),
         procedimiento: Yup.string().required('¡Requerido!'),
         subtipoProcedimiento: Yup.string().required('¡Requerido!'),
      }),
      onSubmit: (values) => { handleSaveDocInBandejaEntrada(values) },
      onReset: () => { handleResetSolicitudValues() }
   }), [solicitudValuesDb])
   
   return(
      <>
         <Box
            display='flex'
            flexDirection='column'
         >
            <Button
               style={{ marginLeft: 'auto' }}
               variant='contained'
               endIcon={ <NavigateNext fontSize='large' />  }
               onClick={ () => { handleChangeBandeja(BANDEJA_ASIGNACION) } }
            >
               <Typography variant='h4'>Ir a Asignación</Typography>
            </Button>
            <Formik {...optFrm}>
               {
                  ( { ...rest } ) => (
                     <Form>
                        <Box
                           mt={1}
                           height={420}
                           display='flex'
                           flexWrap='wrap'
                           justifyContent='space-between'
                        >
                           <Box 
                              width={310}
                              display='flex'
                              justifyContent='space-between'
                              alignItems='flex-start'
                           >
                              <MyTextField name='numeroExpediente' label='Número Expediente' size={15} focused />
                              <Button 
                                 variant='contained'
                                 onClick={ () => handleFindByNumeroExpediente(rest) }
                              >
                                 { solicitudValuesDbLoading ? <CircularProgress size={24} color='inherit' /> : <Search fontSize='medium' /> }
                              </Button>
                           </Box>
                           <SimpleAutocomplete name='tipoDocumento' label='Tipo Documento' width={20} opt={tipoDocumento} { ...rest } />
                           <MyTextField name='numeroDocumento' label='Número Documento' size={15} />
                           <SimpleAutocomplete name='unidadSolicitante' label='Unidad Solicitante' width={30} opt={organigrama} { ...rest }  />
                           <MyTextField name='fechaInicioTramite' type='date' label='Fecha Inicio Tramite' size={15}  />
                           <MyTextField name='fechaIngresoSFM' type='date' label='Fecha Ingreso SFM' size={15}  />
                           <SimpleAutocomplete name='tipoDocumentoIdentidad' label='Tipo Documento Identidad' width={20} opt={tipoDocumento} { ...rest }  />
                           <MyTextField name='numeroDocIdentidad' label='Número Doc. Identidad' size={15}  />
                           <MyTextField name='administrado' label='Administrado' size={40}  />
                           <SimpleAutocomplete name='nacionalidad' label='Nacionalidad' width={15} opt={nacionalidadDb} { ...rest }  />
                           <MyTextField name='domicilio' label='Dirección Domiciliaria' size={35}  />
                           <SimpleAutocomplete name='distrito' label='Distrito' width={20} opt={simpleDistritoDb} { ...rest }  />
                           <SimpleAutocomplete name='procedimiento' label='Tipo Solicitud' width={30} opt={simpleTipoTramiteDb} { ...rest }  />
                           <MyTextField name='subtipoProcedimiento' label='Subtipo Solicitud' size={20}  />
                        </Box>
                        <input ref={ submitRef } type='submit' hidden />
                        <input ref={ resetRef } type='reset' hidden />
                     </Form>
                  )
               }
            </Formik>

         </Box>
      
         {/*» FLOAT-PANEL  */}
         <SpeedDial 
            direction='right' 
            optSpeedDialAction={optSpeedDialAction}
            opt={{ bottom: 10 }}
         />
      </>
   )
}

const BandejaAsignaciónSFM = ( { handleChangeBandeja } ) => {

   /*» HOOK'S  */

   /*» CUSTOM-HOOK'S  */
   const { bandejaEntradaDb } = useFiscalizacionPosterior()

   /*» EFFECT'S  */
     
   /*» HANDLER'S  */

   /*» DEP'S  */
   /*» ARGUMENT : `optSpeedDialAction`  */
   
   /*» DEPENDENCY'S  */
   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Tipo.Doc.', field: 'tipoDocumento', width: 30 },
         { title: 'Num.Doc.', field: 'numeroDocumento', width: 30 },
         { title: 'U.Solicitante', field: 'unidadSolicitante', width: 40 },
         { title: 'Expediente', field: 'numeroExpediente', width: 20 },
         { title: 'Fec.Trámite', field: 'fechaInicioTramite', type: 'date', width: 30 },
         { title: 'Fec.Ingreso SFM', field: 'fechaIngresoSFM', type: 'date', width: 30 },
         { title: 'Administrado', field: 'administrado', width: 100 },
      ],
      data: bandejaEntradaDb
   }),[bandejaEntradaDb])

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Asignar' }, { icon: 'Reasignar' }, { icon: 'Detalle' } ],
      components: ({ action: { icon }, data }) => {
         if (icon === 'Asignar')
            return (
               <Tooltip
                  title='Asignar'
                  arrow
               >
                  <IconButton
                     onClick={() => { console.log('Descargando...', data) }}
                  >
                     <GroupAdd />
                  </IconButton>
               </Tooltip>)
         else if(icon === 'Reasignar')
            return (
               <Tooltip
                  title='Reasignar'
                  arrow
               >
                  <IconButton
                     onClick={() => { console.log('Descargando...') }}
                  >
                     <GroupRemove />
                  </IconButton>
               </Tooltip>)
         else if(icon === 'Detalle')
            return (
               <Tooltip
                  title='Detalle'
                  arrow
               >
                  <IconButton
                     onClick={() => { console.log('Descargando...') }}
                  >
                     <FormatListNumbered />
                  </IconButton>
               </Tooltip>)
      }
   }), [bandejaEntradaDb])

   return(
      <>
         <Box
            display='flex'
            flexDirection='column'
         >
            <Button
               style={{ marginRight: 'auto' }}
               variant='contained'
               startIcon={ <ArrowBackIos fontSize='large' />  }
               onClick={ () => { handleChangeBandeja(BANDEJA_ENTRADA) } }
            >
               <Typography variant='h4'>Ir a Recepción</Typography>
            </Button>
            <Box
               height={170}
               mt={1}
            >
               <MyTable
                  dataTable={dataTable} 
                  configTable={configTable} 
                  pageSize={5}
               />
            </Box>
         </Box>
      
         {/*» FLOAT-PANEL  */}
         
      </>
   )
}

BandejaEntradaSFM.propTypes = {
   handleChangeBandeja: PropTypes.func.isRequired
}

BandejaAsignaciónSFM.propTypes = {
   handleChangeBandeja: PropTypes.func.isRequired
}