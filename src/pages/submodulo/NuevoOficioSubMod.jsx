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
   Typography
} from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { 
   Search,
   Edit,
   Save,
   Add,
   DeleteForever,
   Cancel,
   Book,
   Mail
} from '@mui/icons-material'
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { differenceInBusinessDays } from 'date-fns'

import Table from 'components/Table'
import SimpleModal from 'components/SimpleModal'
import MyAutocomplete from 'components/Formik/Autocomplete'
import MyTextField from 'components/Formik/MyTextField'
import InfoCardDownload from 'components/InfoCardDownload'

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

export default function NuevoExpedienteMininterSubMod(){

   /*» HOOK'S  */
   const refNumeroTramite = useRef('')
   const refRecordDetExpMininter = useRef({})
   const refFilePoolData = useRef({})
   const [openModalAddTrace, setOpenModalAddTrace] = useState(false)
   const [openModalRemoveTrace, setOpenModalRemoveTrace] = useState(false)
   const [openModalAddMail, setOpenModalAddMail] = useState(false)

   /*» CUSTOM HOOK'S  */
   const classes = useStyle()
   const { 
      mininterDbLoading,
      nacionalizacionDb,
      detExpedienteMininterDb,
      mininterDbWarning,
      isNewToMiniter,
      isOldToMininter,
      handleFindByNumeroExpedienteAndUsr,
      handleFindAllUbicacionMininter,
      handleDeleteDetExpeMininter,
      handleSaveExpedienteMininter,
      handleAddMailToOficio
   } = useExpedienteMininter()

   /*»EFFECT'S  */
   useEffect(() => { handleFindAllUbicacionMininter() }, [])
   useEffect(() => { if(!openModalAddTrace) refRecordDetExpMininter.current = {} }, [openModalAddTrace])
   useEffect(() => { if(!openModalRemoveTrace) refRecordDetExpMininter.current = {} }, [openModalRemoveTrace])

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

   const handleDownloadToInfoCard = () => {
      console.log('Descargar reporte de oficios dentro y fuera de plazo!!!')
   }

   const handleOpenAddFilePool = (record) => {
      refFilePoolData.current = record
      setOpenModalAddMail(true)
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
                  if(fechaRecepcion)
                     return differenceInBusinessDays(new Date(fechaVencimiento), new Date(fechaRecepcion))
                  else
                     return differenceInBusinessDays(new Date(fechaVencimiento), new Date(fechaOficio))
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
      actions: [{ icon: 'Editar' }, { icon: 'Eliminar' }, { icon: 'Correos' }],
      components: ({ action: { icon }, data }) => {
         if (icon === 'Editar')
            return (
               <Tooltip
                  title='Editar'
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
         <Box height={85} display='flex' justifyContent='space-around' alignItems='center'>
            <InfoCardDownload 
               icon={Book}
               title='Dentro plazo'
               value={20}
               handleDownload={handleDownloadToInfoCard} 
            />
            <InfoCardDownload 
               icon={Book}
               title='Por vencer'
               value={10}
               handleDownload={handleDownloadToInfoCard} 
            />
            <InfoCardDownload 
               icon={Book}
               title='Fuera plazo'
               value={5}
               handleDownload={handleDownloadToInfoCard} 
            />
         </Box>

         {/*» `SEARCH`  */}
         <Fade>
            <Box display='flex' height={80} mx={2} alignItems='center' justifyContent='space-between'>
               <Box display='flex' width={220} alignItems='center' gridGap={10}>
                  <FormControl className={classes.formControl} error={!!mininterDbWarning}>
                     <InputLabel>Número expediente</InputLabel>
                     <Input autoFocus onChange={handleChangeNumeroTramite} />
                     <FormHelperText>{mininterDbWarning}</FormHelperText>
                  </FormControl>
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
         </Fade>
         
         {/*» RESULT: `HEAD`  */}
         <Fade>
            <Paper variant='outlined' className={classes.paper}>
               <Box display='flex' px={5} py={1} flexWrap='wrap' justifyContent='space-between'>
                  <TextField value={nacionalizacionDb?.numeroTramite || ''} label='Nro.Expediente' style={{ width: 120 }} {...commonProps}/>
                  <TextField value={nacionalizacionDb?.tipoTramite || ''} label='Tipo trámite' style={{ width: 410 }} {...commonProps}/>
                  <TextField value={nacionalizacionDb?.administrado || ''} label='Administrado' style={{ width: 250 }} {...commonProps}/>
                  <TextField value={nacionalizacionDb?.dependencia || ''} label='Dependencia' style={{ width: 90 }} {...commonProps} />
               </Box>
            </Paper>
         </Fade>

         {/*» RESULT: `BODY`  */}
         {
            <Box overflow='hidden'>
               <Fade top when={isOldToMininter}>
                  <Table 
                     dataTable={dataTable} 
                     configTable={configTable} 
                     isLoading={mininterDbLoading} 
                     pageSize={5}
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
               data={refFilePoolData.current} 
               handleAddMail={handleAddMailToOficio} 
               /* handleDowloadMail={handleDowloadMail} 
               handleDeleteMail={handleDeleteMail}  */
            />
         </SimpleModal>
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