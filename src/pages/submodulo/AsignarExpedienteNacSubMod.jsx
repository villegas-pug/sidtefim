/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { 
   Box,
   Tooltip,
   IconButton,
   Divider,
   CircularProgress,
   Stepper,
   Step,
   StepLabel,
   StepContent,
   Typography, 
   Button, 
   TextField
} from '@material-ui/core'
import { 
   Check,
   Cancel,
   Cached,
   AttachFile,
   Search,
   PersonAdd,
   PersonRemove,
   FormatListNumbered,
   Visibility,
   Edit,
   Save
} from '@mui/icons-material'
import { Stack } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import Fade from 'react-reveal/Fade'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Table from 'components/Table'
import SpeedDial from 'components/SpeedDial'
import DialogAppBar from 'components/DialogAppBar'
import MyTextField from 'components/Formik/MyTextField'
import InfoCard from 'components/InfoCard'
import ModalLoader from 'components/Styled/ModalLoader'
import SimpleModal from 'components/SimpleModal'
import MyAutocomplete from 'components/Formik/Autocomplete'

import useNuevoTramiteNac from 'hooks/useNuevoTramiteNac'
import useAuth from 'hooks/useAuth'

import { etapas } from 'constants/etapasNacionalizacion'

const isDisabledUnassignedAction = (isAssigned, isRead) => {
   let isDisabled = true
   if(isAssigned) isDisabled = false
   if(isAssigned && isRead) isDisabled = true
   return isDisabled
}

export default function AsignarExpedienteNacSubMod() {

   /*» HOOK'S  */
   const refFile = useRef([])
   const refSubmitSearch = useRef()
   const refRecordNuevoExpedienteNac = useRef({})
   const [openSearchDialog, setOpenSearchDialog] = useState(false)
   const [openModalEditar, setOpenModalEditar] = useState(false)
   const [openModalAsignar, setOpenModalAsignar] = useState(false)
   const [openModalReasignar, setOpenModalReasignar] = useState(false)
   const [openModalEtapas, setOpenModalEtapas] = useState(false)
   
   /*» CUSTOM-HOOK'S  */
   const { evaluadorSgtmDb, handleFindAllUser } = useAuth()
   const { 
      commonDb,
      nuevoTramiteDbLoading,
      inputsFilter,
      countTramitesNuevos,
      countTramitesNoLeidos,
      countTramitesLeidos,
      countTramitesFueraPlazo,
      handleFindAllNuevoTramiteNac,
      handleUploadNuevoTramiteNac,
      handleTramiteNacToAssignRevisor,
      handleChangeInputsFilter,
      handleSearchByInputs,
      handleTramitesNuevos,
      handleTramitesNoLeidos,
      handleTramitesLeidos,
      handleTramitesFueraPlazo,
      handleSaveFechaMPNuevoTramiteNac,
      handleToAssignRevisor,
      handleUnassignRevisor
   } = useNuevoTramiteNac()

   /*» EFFECT'S  */
   useEffect(() => { handleFindAllNuevoTramiteNac() }, [])
   useEffect(() => { handleTramiteNacToAssignRevisor() }, [])
   useEffect(() => { handleFindAllUser() }, [])
   useEffect(() => { 
      !nuevoTramiteDbLoading && setOpenModalEditar(false) 
   }, [nuevoTramiteDbLoading])/*» Auto-Close Modal-Edit ... */
   useEffect(() => { 
      !nuevoTramiteDbLoading && setOpenModalAsignar(false) 
   }, [nuevoTramiteDbLoading])/*» Auto-Close Modal-Asignar ... */
   useEffect(() => { 
      !nuevoTramiteDbLoading && setOpenModalReasignar(false) 
   }, [nuevoTramiteDbLoading])/*» Auto-Close Modal-Reasignar ... */
   
   /*» HANDLER'S  */
   const handleSubmitSearch = () => refSubmitSearch.current.click()
   
   /*» DEP'S  */
   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Nro.Trámite', field: 'numeroTramite', width: 10 },
         { title: 'Fec.Rec.MP', field: 'fechaRecepcionMP', type: 'date', width: 10 },
         { title: 'Fec.Trámite', field: 'fechaTramite', type: 'date', width: 10 },
         { title: 'Fec.Venc.A', field: 'fecVencAtencion', type: 'date', width: 10 },
         { title: 'Tipo.Trámite', field: 'tipoTramite', width: 220 },
         { title: 'Solicitante', field: 'administrado', width: 170 },
         { title: 'Dependencia', field: 'dependencia', width: 20 },
         { title: 'Estado', field: 'estadoTramite', width: 10},
         { title: '¿Asignado?', width: 10, render: ({ evaluarTramiteNac }) => (
            evaluarTramiteNac 
               ? <Check color='primary' /> 
               : <Cancel color='error' />
         )},
         { title: '¿Leido?', width: 10, render: ({ evaluarTramiteNac }) => (
            evaluarTramiteNac?.leido 
               ? <Check color='primary' /> 
               : <Cancel color='error' />) 
         },
      ],
      data: commonDb
   }), [commonDb])

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Editar' }, { icon: 'Asignar' }, { icon: 'Reasignar' }, { icon: 'Etapas' }, { icon: 'Detalle' }],
      components: ({ action: { icon }, data }) => {
         let isAssigned = Boolean(data.evaluarTramiteNac)
         let isRead = data.evaluarTramiteNac?.leido
         if (icon === 'Editar')
            return (
               <Tooltip
                  title='Fecha recepción'
                  arrow
               >
                  <IconButton
                     onClick={() => { 
                        refRecordNuevoExpedienteNac.current = data
                        setOpenModalEditar(true)
                     }}
                  >
                     <Edit fontSize='small' />
                  </IconButton>
               </Tooltip>)
         else if (icon === 'Asignar')
            return (
               <Tooltip
                  title='Asignar'
                  arrow
               >
                  <IconButton
                     onClick={() => {
                        refRecordNuevoExpedienteNac.current = data
                        setOpenModalAsignar(true)
                     }}
                     disabled={isAssigned}
                  >
                     <PersonAdd fontSize='small' />
                  </IconButton>
               </Tooltip>)
         else if (icon === 'Reasignar')
            return (
               <Tooltip
                  title='Eliminar asignación'
                  arrow
               >
                  <IconButton
                     onClick={() => {
                        refRecordNuevoExpedienteNac.current = data
                        setOpenModalReasignar(true)
                     }}
                     disabled={ isDisabledUnassignedAction(isAssigned, isRead) }
                  >
                     <PersonRemove fontSize='small' />
                  </IconButton>
               </Tooltip>)
         else if (icon === 'Etapas')
            return (
               <Tooltip
                  title='Etapas'
                  arrow
               >
                  <IconButton
                     onClick={() => {
                        refRecordNuevoExpedienteNac.current = data
                        setOpenModalEtapas(true)
                     }}
                  >
                     <FormatListNumbered fontSize='small' />
                  </IconButton>
               </Tooltip>)
         else if (icon === 'Detalle')
            return (
               <Tooltip
                  title='Ver detalle'
                  arrow
               >
                  <IconButton
                     onClick={() => {
                        console.log(data)
                     }}
                  >
                     <Visibility fontSize='small' />
                  </IconButton>
               </Tooltip>)
      }
   }), [])

   /*» ARGUMENT : `optSpeedDialAction`  */
   const optSpeedDialAction = [
      {
         icon: <Cached />,
         tooltip: 'Refrescar',
         handleOnClick: () => { handleTramiteNacToAssignRevisor() }
      }, {
         icon: <AttachFile />,
         tooltip: 'Cargar trámites nuevos',
         handleOnClick: () => { refFile.current.click() },
      }, {
         icon: <Search />,
         tooltip: 'Buscar',
         handleOnClick: () => { setOpenSearchDialog(true) },
      },
   ]

   return (
      <>
         {/*» HEADER: `INFO-CARD'S`  */}
         <Fade when={!nuevoTramiteDbLoading} >
            <Stack 
               mb={2}
               justifyContent='space-around'
               direction='row' 
               spacing={2}
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               <InfoCard iconName='SendAndArchive' title='Nuevos' value={countTramitesNuevos} handleShowDetail={handleTramitesNuevos} />
               <InfoCard iconName='MarkEmailUnread' title='No leidos' value={countTramitesNoLeidos} handleShowDetail={handleTramitesNoLeidos} />
               <InfoCard iconName='MarkEmailRead' title='Leidos' value={countTramitesLeidos} handleShowDetail={handleTramitesLeidos} />
               <InfoCard iconName='HourglassDisabled' title='Fuera plazo' value={countTramitesFueraPlazo} handleShowDetail={handleTramitesFueraPlazo} />
            </Stack>
         </Fade>

         {/*» BODY: TABLE  */}
         {
            <Box overflow='hidden'>
               <Fade when={!nuevoTramiteDbLoading} >
                  <Table 
                     dataTable={dataTable} 
                     configTable={configTable} 
                     isLoading={nuevoTramiteDbLoading} 
                     pageSize={6}
                  />
               </Fade>
            </Box>
         }

         {/*» input-file  */}
         <input type='file' accept='.xlsx' ref={refFile} hidden onChange={ handleUploadNuevoTramiteNac } />

         {/*» FLOAT-CONTROL  */}
         <SpeedDial 
            direction='right'
            position='fixed'
            opt={{
               bottom: 5
            }}
            optSpeedDialAction={optSpeedDialAction} 
         />

         {/*» DIALOG-SEARCH  */}
         <DialogAppBar 
            open={openSearchDialog} 
            setOpen={setOpenSearchDialog} 
            handleAction={handleSubmitSearch} 
         >
            <Box mt={15} height='100%'>
               <Formik
                  initialValues={inputsFilter}
                  onSubmit={(values) => {
                     handleSearchByInputs(values)
                     setOpenSearchDialog(false)
                  }}
               >
                  { () => (
                     <Form onChange={ handleChangeInputsFilter }>
                        <Box display='flex' justifyContent='space-around'>
                           <MyTextField name='numeroTramite' label='Número Trámite' size={20} focused />
                           <MyTextField name='administrado' label='Administrado' size={40} />
                        </Box>
                        <input type='submit' ref={refSubmitSearch}  hidden />
                     </Form>
                  )}
               </Formik>
            </Box>
         </DialogAppBar>

         {/*» MODAL-EDITAR  */}
         <SimpleModal open={openModalEditar} setOpen={setOpenModalEditar}>
            <Formik
               initialValues={{
                  fechaRecepcionMP: ''
               }}
               validationSchema={Yup.object({
                  fechaRecepcionMP: Yup.date().required('¡Fecha requerida!')
               })}
               onSubmit={(value) => { 
                  handleSaveFechaMPNuevoTramiteNac(refRecordNuevoExpedienteNac.current, value)
               }}
            >
               {() => (
                  <Form>
                     <Stack width={310} height={50} direction='row' spacing={1} alignItems='flex-start'>
                        <MyTextField type='date' name='fechaRecepcionMP' label='Fec.Recepción Mesa Partes' size={15} />
                        <Button
                           type='submit'
                           variant='contained'
                           color='primary'
                           disabled={nuevoTramiteDbLoading}
                        >
                           { 
                              nuevoTramiteDbLoading 
                                 ? <CircularProgress size={25} color='inherit' /> 
                                 : <Save /> 
                           }
                        </Button>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/*» MODAL-ASIGNAR  */}
         <SimpleModal open={openModalAsignar} setOpen={setOpenModalAsignar}>
            <Formik
               initialValues={{
                  operadorDesig: ''
               }}
               validationSchema={Yup.object({
                  operadorDesig: Yup.string().required('¡Seleccione un operador!')
               })}
               onSubmit={(value) => { 
                  handleToAssignRevisor(refRecordNuevoExpedienteNac.current, value)
               }}
            >
               {({ ...rest }) => (
                  <Form>
                     <Stack width={450} height={55} direction='row' spacing={1} alignItems='flex-start'>
                        <MyAutocomplete 
                           name='operadorDesig' 
                           label='Operador Designado' 
                           width={300}
                           opt={evaluadorSgtmDb} 
                           {...rest} 
                        />
                        <Button
                           type='submit'
                           variant='contained'
                           color='primary'
                           disabled={nuevoTramiteDbLoading}
                        >
                           { 
                              nuevoTramiteDbLoading 
                                 ? <CircularProgress size={25} color='inherit' /> 
                                 : <Save /> 
                           }
                        </Button>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/*» MODAL-REASIGNAR  */}
         <SimpleModal open={openModalReasignar} setOpen={setOpenModalReasignar} >
            <Box display='flex' width={230} flexDirection='column'>
               <Box display='flex' justifyContent='center' mb={2}>
                  <Typography variant='h5'>¡Presiona el boton aceptar, para confirmar!</Typography>
               </Box>
               <Box display='flex' justifyContent='space-between'>
                  <Button 
                     variant='contained' 
                     color='primary'
                     startIcon={
                        nuevoTramiteDbLoading 
                           ? <CircularProgress size={20} color='inherit' /> 
                           : <Save fontSize='small' />
                     }
                     disabled={nuevoTramiteDbLoading}
                     onClick={() => handleUnassignRevisor(refRecordNuevoExpedienteNac.current)}
                  >
                     <Typography variant='h4' color='initial'>Aceptar</Typography>
                  </Button>
                  <Button 
                     variant='contained' 
                     color='secondary'
                     disabled={nuevoTramiteDbLoading}
                     startIcon={<Cancel fontSize='small' />}
                     onClick={() => setOpenModalReasignar(false)}
                  >
                     <Typography variant='h4' color='initial'>Cancelar</Typography>
                  </Button>
               </Box>
            </Box>
         </SimpleModal>

         {/*» MODAL-ETAPAS  */}
         <SimpleModal open={openModalEtapas} setOpen={setOpenModalEtapas} >
            <Box display='flex' >
               <EtapasTramiteNac 
                  etapaActual={refRecordNuevoExpedienteNac.current?.etapa?.idEtapa}
                  etapas={etapas}
                  detEtapas={refRecordNuevoExpedienteNac.current?.etapaTramiteNac}
               />
            </Box>
         </SimpleModal>

         {/*» MODAL-LOADING  */}
         { nuevoTramiteDbLoading && <ModalLoader /> }
      </>
   )
}

const useStyles = makeStyles({
   root: {
      width: 950,
      marginBottom: 10
   },
   step: {
      '& .MuiStepIcon-completed, & .MuiStepIcon-active': {
         color: '#004795'
      }
   }
})

const EtapasTramiteNac = ({ etapaActual, etapas, detEtapas }) => {

   const classes = useStyles()

   const mapDetEtapas = useMemo(() => detEtapas.reduce((map, { etapa: { idEtapa }, ...rest }) => (map[idEtapa] = rest, map), {}), [detEtapas])

   return (
      <div className={classes.root}>
         <Stepper activeStep={etapaActual - 1} orientation='vertical'>
            {
               etapas?.map(({ step, title }) => (
                  <Step key={step} className={classes.step} active={ Boolean(mapDetEtapas[step]) } >
                     <StepLabel>
                        <Typography variant='h5'>{title}</Typography>
                     </StepLabel>
                     <StepContent>
                        <Box display='flex' gap={2} flexWrap='wrap' >
                           <TextField disabled label='Usuario Inicia' value={mapDetEtapas[step]?.usrInicia?.nombres} variant='standard' style={{ width: 250 }} />
                           <TextField disabled label='Fecha Inicio' value={mapDetEtapas[step]?.fechaHoraInicio} variant='standard' inputProps={{ style: { textAlign: 'center', width: 150 } }} />
                           <TextField disabled label='Usuario Finaliza' value={mapDetEtapas[step]?.usrFinaliza?.nombres} variant='standard' style={{ width: 250 }} />
                           <TextField disabled label='Fecha Fin' value={mapDetEtapas[step]?.fechaHoraFin} variant='standard' inputProps={{ style: { textAlign: 'center', width: 150 } }} />
                           <TextField disabled label='Estado' value={mapDetEtapas[step]?.estado} variant='standard' style={{ width: 40 }} inputProps={{ style: { textAlign: 'center' } }} />
                        </Box>
                     </StepContent>
                  </Step>
               ))
            }
         </Stepper>
      </div>
   )
}

EtapasTramiteNac.propTypes = {
   etapaActual: PropTypes.number.isRequired, 
   etapas: PropTypes.array.isRequired,
   detEtapas: PropTypes.array.isRequired
}