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
   Tooltip, Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
   Search,
   Edit,
   Save,
   Add,
   DeleteForever,
   Cancel
} from '@material-ui/icons'
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Table from 'components/Table'
import SimpleModal from 'components/SimpleModal'
import MyAutocomplete from 'components/Formik/Autocomplete'
import MyTextField from 'components/Formik/MyTextField'

import useExpedienteMininter from 'hooks/useExpedienteMininter'

const useStyle = makeStyles({
   formControl: {
      /* marginBottom: 10 */
   },
   paper:{
      marginBottom: 5
   }
})

const commonProps = {
   InputLabelProps: {shrink: true},
   color: 'primary',
   disabled: true
}

export default function NuevoExpedienteMininterSubMod(){

   /*» HOOK'S  */
   const refNumeroTramite = useRef('')
   const refRecordDetExpMininter = useRef({})
   const [openModalAddTrace, setOpenModalAddTrace] = useState(false)
   const [openModalRemoveTrace, setOpenModalRemoveTrace] = useState(false)

   /*» CUSTOM HOOK'S  */
   const classes = useStyle()
   const { 
      mininterDbLoading,
      nacionalizacionDb,
      expedienteMininterDb,
      detExpedienteMininterDb,
      mininterDbWarning,
      isNewToMiniter,
      isOldToMininter,
      handleFindByNumeroExpediente,
      handleFindAllUbicacionMininter,
      handleDeleteDetExpeMininter,
      handleSaveExpedienteMininter
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

   /*» DEP'S  */
   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Nro.Oficio', field: 'numeroOficio', width: 10 },
         { title: 'Fec.Oficio', field: 'fechaOficio', type: 'date', width: 10 },
         { title: 'Fec.Recepción', field: 'fechaRecepcion', type: 'date', width: 10 },
         { title: 'Acciones Realizadas', field: 'accionesRealizadas', width: 400 },
         { title: 'Ubicación', width: 150, render: ({ ubicacion: { descripcion } }) => descripcion },
      ],
      data: detExpedienteMininterDb
   }), [detExpedienteMininterDb])
   
   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Editar' }, { icon: 'Eliminar' }],
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
      }
   }), [])

   return (
      <>
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
                     onClick={() => handleFindByNumeroExpediente(refNumeroTramite.current)}
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
                        onClick={handleSaveExpedienteMininter}
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
                  <TextField value={expedienteMininterDb?.ubicacion?.descripcion || ''} label='Ubicación actual expediente' style={{ width: 200 }} {...commonProps}/>
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
      </>
   )
}

/*» CHILD - COMPONENT ... */
function FormToAddTrace({ handleModalAddTrace, recordDetExpMininter }){

   /*» CUSTOM HOOK'S  */
   const { ubicacionMininterDb, handleSaveDetExpeMininter } = useExpedienteMininter()

   /*»EFFECT'S  */

   /*» DEP'S  */
   const optForm = useMemo(() => ({
      initialValues: {
         idDetExpMininter: recordDetExpMininter.idDetExpMininter,
         numeroOficio: recordDetExpMininter.numeroOficio,
         fechaOficio: recordDetExpMininter.fechaOficio,
         fechaRecepcion: recordDetExpMininter.fechaRecepcion,
         ubicacion: recordDetExpMininter.ubicacion,
         accionesRealizadas: recordDetExpMininter.accionesRealizadas,
      },
      validationSchema: Yup.object({
         /* numeroOficio: Yup.string().required('¡Campo requerido!'),
         fechaOficio: Yup.date().required('¡Campo requerido!'),*/
         fechaRecepcion: Yup.date().required('¡Campo requerido!'),
         ubicacion: Yup.object().required('¡Campo requerido!'),
      }),
      onSubmit: (values, { resetForm }) => {
         handleSaveDetExpeMininter(values)
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
                        <MyTextField name='numeroOficio' label='Número oficio' size={10} focused />
                        <MyTextField type='date' name='fechaOficio' label='Fecha oficio' size={10} />
                        <MyTextField type='date' name='fechaRecepcion' label='Fecha recepción' size={10} />
                        <MyAutocomplete name='ubicacion' label='Destino' width={17} opt={ubicacionMininterDb} {...rest} />
                        <MyTextField name='accionesRealizadas' label='Acciones realizadas' size={25} />
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