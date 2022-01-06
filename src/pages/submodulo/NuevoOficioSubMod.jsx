import React, { useMemo, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { 
   Box,
   FormControl,
   InputLabel,
   Input,
   TextField,
   FormHelperText,
   Paper,
   Button,
   IconButton,
   Tooltip, 
   Typography,
   Switch,
   FormControlLabel
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
   Search,
   Edit,
   Save,
   Add,
   DeleteForever,
   Cancel,
   Mail,
   HistoryToggleOff,
   AvTimer,
   HourglassDisabled
} from '@mui/icons-material'
import Fade from 'react-reveal/Fade'
import Flash from 'react-reveal/Flash'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { differenceInBusinessDays } from 'date-fns'

import Table from 'components/Table'
import SimpleModal from 'components/SimpleModal'
import MyAutocomplete from 'components/Formik/Autocomplete'
import MyTextField from 'components/Formik/MyTextField'
import InfoCardDownload from 'components/InfoCardDownload'
import ModalLoader from 'components/Styled/ModalLoader'

import useExpedienteMininter from 'hooks/useExpedienteMininter'
import AddFilePool from 'components/AddFilePool'

const useStyle = makeStyles({
   paper:{
      marginBottom: 5
   }
})

const commonProps = {
   InputLabelProps: {shrink: true},
   color: 'primary',
   disabled: true
}

const PENDIENTE = 'PENDIENTE'
const NUMERO_OFICIO_LABEL = 'Número Oficio'
const NUMERO_EXPEDIENTE_LABEL = 'Número Expediente'
const NUMERO_OFICIO_KEY = 0
const NUMERO_EXPEDIENTE_KEY = 1

const NUEVO_KEY = 1
const BUSCAR_KEY = 0

export default function NuevoExpedienteMininterSubMod(){

   /*» HOOK'S  */
   const refNumeroTramite = useRef('')
   const refRecordDetExpMininter = useRef({})
   const [openModalAddTrace, setOpenModalAddTrace] = useState(false)
   const [openModalRemoveTrace, setOpenModalRemoveTrace] = useState(false)
   const [openModalAddMail, setOpenModalAddMail] = useState(false)
   const [filterType, setFilterType] = useState(NUMERO_EXPEDIENTE_KEY)
   const [actionType, setActionType] = useState(NUEVO_KEY)

   /*» CUSTOM HOOK'S  */
   const classes = useStyle()
   const {
      mininterDbLoading,
      nacionalizacionDb,
      detExpedienteMininterDb,
      mininterDbWarning,
      resumenPlazoOficiosDb,
      fileDownloadLoading,
      resumenPlazoOficiosLoadingDb,
      isNewToMiniter,
      isOldToMininter,
      handleFindByNumeroExpedienteAndUsr,
      handleFindAllUbicacionMininter,
      handleDeleteDetExpeMininter,
      handleSaveExpedienteMininter,
      handleAddMailToOficio,
      handleDeleteMail,
      handleDownloadMail,
      handleDownloadFileResumenPlazoOficios,
      handleFindAllResumenPlazoOficios
   } = useExpedienteMininter()

   /*»EFFECT'S  */
   useEffect(() => { handleFindAllResumenPlazoOficios() }, [])
   useEffect(() => { handleFindAllUbicacionMininter() }, [])
   useEffect(() => { /*» EXEC EFFECT, WHEN CLOSE SAVE&EDIT-MODAL ... */
      if(!openModalAddTrace) {
         refRecordDetExpMininter.current = {} 
         handleFindAllResumenPlazoOficios()
      }
   }, [openModalAddTrace])

   useEffect(() => { 
      if(!openModalRemoveTrace) {
         refRecordDetExpMininter.current = {}
         handleFindAllResumenPlazoOficios()
      }
   }, [openModalRemoveTrace])
   useEffect(() => { if(!openModalAddMail) refRecordDetExpMininter.current = {} }, [openModalAddMail])

   /*» HANDLER'S  */
   const handleChangeNumeroTramite = ({target: { value }}) => refNumeroTramite.current = value
   const handleModalAddTrace = (open) => setOpenModalAddTrace(open)
   const handleEditRecordDetExpMininter = (record) => {
      refRecordDetExpMininter.current = record
      handleModalAddTrace(true)
   }

   const handleConfirmDeleteDetExpMininter = (record) => {
      refRecordDetExpMininter.current = record
      setOpenModalRemoveTrace(true)
   }

   const handleToAcceptDeleteDetExpeMininter = () => {
      handleDeleteDetExpeMininter(refRecordDetExpMininter.current)
      setOpenModalRemoveTrace(false)
   }

   const handleOpenAddFilePool = (record) => {
      refRecordDetExpMininter.current = record
      setOpenModalAddMail(true)
   }

   const handleChangeFilterType = ({ target: { checked } }) => { 
      if(checked) setFilterType(NUMERO_EXPEDIENTE_KEY)
      else setFilterType(NUMERO_OFICIO_KEY)
   }

   const handleChangeActionType = ({ target: { checked } }) => { 
      if(checked) setActionType(NUEVO_KEY)
      else setActionType(BUSCAR_KEY)
   }

   /*» DEP'S  */
   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Nro.Ofi. M.P', field: 'numeroOficio', width: 20 },
         { title: 'Fec.Ofi. M.P', field: 'fechaOficio', type: 'date', width: 20 },
         { title: 'Fec.Acuse', field: 'fechaRecepcion', type: 'date', width: 10 },
         { title: 'Fec.Respuesta', field: 'fechaRespuesta', type: 'date', width: 10 },
         { title: 'Fec.Vencimiento', field: 'fechaVencimiento', type: 'date', width: 10 },
         { 
            title: 'Dias.Venc.', 
            width: 10, 
            render: ({ fechaOficio, fechaRecepcion, fechaVencimiento, estado }) => {
               if(estado === PENDIENTE){
                  if(fechaRecepcion) return differenceInBusinessDays(new Date(fechaVencimiento), new Date(fechaRecepcion))
                  else return differenceInBusinessDays(new Date(fechaVencimiento), new Date(fechaOficio))
               }
            } },
         { title: 'Estado', field: 'estado', width: 10 },
         { title: 'Asunto', field: 'accionesRealizadas', width: 290 },
         { title: 'Destinatario', width: 90, render: ({ ubicacion: { descripcion } }) => descripcion },
      ],
      data: detExpedienteMininterDb
   }), [detExpedienteMininterDb])

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Actualizar' }, { icon: 'Correos' }],
      components: ({ action: { icon }, data }) => {
         if (icon === 'Actualizar')
            return (
               <Tooltip
                  title='Actualizar'
                  arrow
               >
                  <IconButton
                     onClick={() => {
                        handleEditRecordDetExpMininter(data)
                        console.log(data)
                     }}
                  >
                     <Edit fontSize='small' />
                  </IconButton>
               </Tooltip>)
         else if(icon === 'Eliminar')
            return(
               <Tooltip
                  title='Eliminar'
                  arrow
               >
                  <IconButton
                     onClick={() => handleConfirmDeleteDetExpMininter(data)}
                  >
                     <DeleteForever fontSize='small' />
                  </IconButton>
               </Tooltip>)
         else if(icon === 'Correos')
            return(
               <Tooltip
                  title='Anexos'
                  arrow
               >
                  <IconButton
                     onClick={() => handleOpenAddFilePool(data)}
                  >
                     <Mail fontSize='small' />
                  </IconButton>
               </Tooltip>)
      }
   }), [])

   return (
      <>
         {/*» `INFO-CARD'S` */}
         <Flash when={!resumenPlazoOficiosLoadingDb}>
            <Box height={85} display='flex' justifyContent='space-around' alignItems='center'>
               <InfoCardDownload 
                  icon={HistoryToggleOff}
                  title='Dentro plazo'
                  isLoading={ fileDownloadLoading }
                  value={resumenPlazoOficiosDb['dentroPlazoVenc']}
                  handleDownload={ () => handleDownloadFileResumenPlazoOficios(1) } 
               />
               <InfoCardDownload 
                  icon={AvTimer}
                  title='Por vencer plazo'
                  isLoading={ fileDownloadLoading }
                  value={resumenPlazoOficiosDb['proximoPlazoVenc']}
                  handleDownload={ () => handleDownloadFileResumenPlazoOficios(0) } 
               />
               <InfoCardDownload 
                  icon={HourglassDisabled}
                  title='Fuera plazo'
                  isLoading={ fileDownloadLoading }
                  value={resumenPlazoOficiosDb['fueraPlazoVenc']}
                  handleDownload={ () => handleDownloadFileResumenPlazoOficios(-1) } 
               />
            </Box>
         </Flash>

         {/*» `ACTION'S`  */}
         <>
            <Box display='flex' pl={2} height={60}>
               <FormControlLabel 
                  control={<Switch size='small' color='primary' defaultChecked onChange={handleChangeActionType}  />} 
                  label={ actionType === NUEVO_KEY ? 'Buscar' : 'Nuevo' } 
               />
            </Box>
            {
               actionType === NUEVO_KEY
                  ?(/*» NUEVO ... */
                     <Flash>
                        <Box display='flex' height={80} mx={2} alignItems='center' justifyContent='space-between'>

                           <Box display='flex' width={250} alignItems='center' gridGap={10}>
                              <Box display='flex' flexDirection='column' alignItems='center'>
                                 <FormControl className={classes.formControl} error={!!mininterDbWarning}>
                                    <InputLabel>{ NUMERO_EXPEDIENTE_LABEL }</InputLabel>
                                    <Input autoFocus onChange={handleChangeNumeroTramite} />
                                    <FormHelperText>{mininterDbWarning}</FormHelperText>
                                 </FormControl>
                              </Box>
                              <Button 
                                 variant='contained' 
                                 onClick={() => handleFindByNumeroExpedienteAndUsr(refNumeroTramite.current)}
                              >
                                 <Search color='inherit' />
                              </Button>
                           </Box>

                           <Box display='flex' alignItems='center' >
                              <Fade right collapse when={isNewToMiniter}>
                                 <Button 
                                    variant='contained'
                                    color='primary'
                                    startIcon={<Save fontSize='small' />}
                                    onClick={ handleSaveExpedienteMininter }
                                 >
                                    <Typography variant='h4' color='initial'>Nuevo</Typography>
                                 </Button> 
                              </Fade>
                              <Fade right collapse when={isOldToMininter}>
                                 <IconButton 
                                    color='primary'
                                    onClick={() => handleModalAddTrace(true)}
                                 >
                                    <Add fontSize='large' />
                                 </IconButton>
                              </Fade>
                           </Box>

                        </Box>
                     </Flash>
                  ):(/*» BUSCAR ... */
                     <Fade>
                        <Box display='flex' width={320} pl={2} alignItems='center' gridGap={10}>
                           <Box display='flex' flexDirection='column' alignItems='center'>
                              <FormControlLabel 
                                 control={
                                    <Switch 
                                       size='small'
                                       color='primary'
                                       defaultChecked
                                       onChange={handleChangeFilterType}
                                    />
                                 } 
                                 label={ filterType === NUMERO_EXPEDIENTE_KEY ? `Buscar por ${NUMERO_OFICIO_LABEL}` : `Buscar por ${NUMERO_EXPEDIENTE_LABEL}` } 
                              />
                              <FormControl className={classes.formControl} error={!!mininterDbWarning}>
                                 <InputLabel>{ filterType === NUMERO_EXPEDIENTE_KEY ? NUMERO_EXPEDIENTE_LABEL : NUMERO_OFICIO_LABEL }</InputLabel>
                                 <Input autoFocus onChange={handleChangeNumeroTramite} />
                                 <FormHelperText>{mininterDbWarning}</FormHelperText>
                              </FormControl>
                           </Box>
                           <Button 
                              variant='contained' 
                              onClick={() => handleFindByNumeroExpedienteAndUsr(refNumeroTramite.current)}
                           >
                              <Search color='inherit' />
                           </Button>
                        </Box>
                     </Fade>
                  )
            }
         </>
         
         {/*» RESULT: `HEAD`  */}
         {
            actionType === NUEVO_KEY
            && (
               <Flash>
                  <Paper variant='outlined' className={classes.paper}>
                     <Box display='flex' px={5} py={1} flexWrap='wrap' justifyContent='space-between'>
                        <TextField value={nacionalizacionDb?.numeroTramite || ''} label='Nro.Expediente' style={{ width: 120 }} {...commonProps}/>
                        <TextField value={nacionalizacionDb?.tipoTramite || ''} label='Tipo trámite' style={{ width: 410 }} {...commonProps}/>
                        <TextField value={nacionalizacionDb?.administrado || ''} label='Administrado' style={{ width: 250 }} {...commonProps}/>
                        <TextField value={nacionalizacionDb?.dependencia || ''} label='Dependencia' style={{ width: 90 }} {...commonProps} />
                     </Box>
                  </Paper>
               </Flash>
            )
         }

         {/*» RESULT: `BODY`  */}
         {
            <Box overflow='hidden'>
               <Fade top when={isOldToMininter}>
                  <Table 
                     dataTable={dataTable} 
                     configTable={configTable} 
                     isLoading={mininterDbLoading} 
                     pageSize={10}
                  />
               </Fade>
            </Box>
         }

         {/*» MODAL'S  */}
         <SimpleModal open={openModalAddTrace} setOpen={setOpenModalAddTrace} >
            <FormToAddTrace handleModalAddTrace={handleModalAddTrace} recordDetExpMininter={refRecordDetExpMininter.current} />
         </SimpleModal>

         <SimpleModal open={openModalRemoveTrace} setOpen={setOpenModalRemoveTrace} >
            <Box display='flex' width={230} flexDirection='column'>
               <Box display='flex' justifyContent='center' mb={2}>
                  <Typography variant='h5'>¡Presiona el boton aceptar, para confirmar!</Typography>
               </Box>
               <Box display='flex' justifyContent='space-between'>
                  <Button 
                     variant='contained' 
                     color='primary'
                     startIcon={<Save fontSize='small' />}
                     onClick={handleToAcceptDeleteDetExpeMininter}
                  >
                     <Typography variant='h4' color='initial'>Aceptar</Typography>
                  </Button>
                  <Button 
                     variant='contained' 
                     color='secondary'
                     onClick={() => setOpenModalRemoveTrace(false)}
                     startIcon={<Cancel fontSize='small' />}
                  >
                     <Typography variant='h4' color='initial'>Cancelar</Typography>
                  </Button>
               </Box>
            </Box>
         </SimpleModal>

         <SimpleModal open={openModalAddMail} setOpen={setOpenModalAddMail}>
            <AddFilePool 
               record={refRecordDetExpMininter.current} 
               handleAddMail={handleAddMailToOficio} 
               handleDeleteMail={handleDeleteMail} 
               handleDowloadMail={handleDownloadMail} 
            />
         </SimpleModal>

         {/*» MODAL LOADING ... */}
         { mininterDbLoading && <ModalLoader /> }
      </>
   )
}

/*» CHILD - COMPONENT ... */
function FormToAddTrace({ handleModalAddTrace, recordDetExpMininter }){

   /*» CUSTOM HOOK'S  */
   const { ubicacionMininterDb, handleSaveOficioInExpediente } = useExpedienteMininter()

   /*»EFFECT'S  */

   /*» DEP'S  */
   const optForm = useMemo(() => ({
      initialValues: { 
         numeroOficio: '',
         fechaOficio: '',
         ubicacion: '',
         ...recordDetExpMininter
      },
      validationSchema: Yup.object({
         numeroOficio: Yup.string().required('¡Campo requerido!'),
         fechaOficio: Yup.date().required('¡Campo requerido!'),
         ubicacion: Yup.object().required('¡Campo requerido!'),
      }),
      onSubmit: (values, { resetForm }) => {
         handleSaveOficioInExpediente(values)
         resetForm()
         handleModalAddTrace(false)
      }
   }), [])

   return(
      <Box display='flex' p={0}>
         <Formik
            {...optForm}
         >
            {
               ({...rest}) => (
                  <Form>
                     <Box display='flex' minHeight={70} width={1300} flexWrap='wrap' justifyContent='space-between'>
                        <MyTextField name='numeroOficio' label='Núm.Ofi. Mesa Partes' size={10} focused />
                        <MyTextField type='date' name='fechaOficio' label='Fec.Ofi. Mesa Partes' size={10} />
                        <MyTextField type='date' name='fechaRecepcion' label='Fecha acuse' size={10} />
                        <MyTextField type='date' name='fechaRespuesta' label='Fecha respuesta' size={10} />
                        <MyAutocomplete name='ubicacion' label='Destinatario' width={15} opt={ubicacionMininterDb} {...rest} />
                        <MyTextField name='accionesRealizadas' label='Asunto' size={20} />
                     </Box>
                     <Box display='flex' gridGap={5}>
                        <Button
                           type='submit'
                           variant='contained'
                        >
                           <Save fontSize='small'  />
                        </Button>
                        <Button
                           type='reset'
                           variant='contained'
                           color='secondary'
                        >
                           <DeleteForever fontSize='small' />
                        </Button>
                     </Box>
                  </Form>
               )
            }
         </Formik>
      </Box>
   )
}

FormToAddTrace.propTypes = {
   handleModalAddTrace: PropTypes.func.isRequired,
   recordDetExpMininter: PropTypes.object
}