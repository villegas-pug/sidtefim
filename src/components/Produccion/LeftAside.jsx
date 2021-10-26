import React, { useRef, useState } from 'react'
import {
   Box,
   Paper,
   Typography,
   Divider,
   ButtonGroup,
   Button,
   FormControl,
   FormHelperText,
   IconButton,
   Tooltip,
   CircularProgress
} from '@material-ui/core'
import { 
   Create, 
   FormatListNumbered,
   Visibility,
   DoubleArrow
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
/* import Fade from 'react-reveal/Fade' */

import useProduccion from 'hooks/useProduccion'
import SimpleModal from 'components/SimpleModal'
import ProduccionList from 'components/Produccion/ProduccionList'
import ProduccionView from 'components/Produccion/ProduccionView'
import ProduccionTextArea from 'components/Produccion/ProduccionTextArea'

const useStyle = makeStyles({
   papper:{
      height: '100%'
   },
   formGroup:{
      marginTop: 30
   },
   buttonAdd: {
      marginTop: 'auto'
   }
})

export default function RegistrarActividad(){

   /*» HOOK'S  */
   const refActividad = useRef([])
   const refAccion = useRef([])
   
   const [openModalActividad, setOpenModalActividad ] = useState(false)
   const [openModalAccion, setOpenModalAccion ] = useState(false)
   const [openModalViewActividad, setOpenModalViewActividad] = useState(false)
   const [openModalViewAccion, setOpenModalViewAccion] = useState(false)
   const [openModalNewActividad, setOpenModalNewActividad] = useState(false)
   const [openModalNewAccion, setOpenModalNewAccion] = useState(false)

   /*» CUSTOM-HOOK'S  */
   const classes = useStyle()
   const { 
      produccionTodayLoading,
      descripcionActividadDb,
      accionDesarrolladaDb,
      handleSaveProduccion
   } = useProduccion()

   /*» HANDLER'S */
   const handleOpenModalActividad = () => { setOpenModalActividad(true) }
   const handleOpenModalAccion = () => { setOpenModalAccion(true) }
   const handleOpenModalNewActividad = () => { setOpenModalNewActividad(true) }
   const handleOpenModalNewAccion = () => { setOpenModalNewAccion(true) }

   const handleOpenViewSelectionActividad = () => { setOpenModalViewActividad(true) }
   const handleOpenViewSelectionAccion = () => { setOpenModalViewAccion(true) }
   
   const handleNewActividad = (newActividad) => {
      refActividad.current = newActividad
      setOpenModalNewActividad(false)
   }
   const handleNewAccion = (newAccion) => {
      refAccion.current = newAccion
      setOpenModalNewAccion(false)
   }

   const handleSelectActividad = (selectedValue) => { 
      refActividad.current = (typeof(selectedValue) === 'object' && selectedValue.descripcion) || ''
      setOpenModalActividad(false)
   }
   const handleSelectAccion = (selectedValue) => { 
      refAccion.current = (typeof(selectedValue) === 'object' && selectedValue.descripcion) || ''
      setOpenModalAccion(false)
   }

   const handleAddProduccionToList = () => {
      handleSaveProduccion(refActividad.current, refAccion.current)
      refAccion.current = []
      refActividad.current = []
   }

   return (
      <>
         <Paper variant='outlined' draggable className={classes.papper}>
            <Box display='flex' flexDirection='column' p={2} height='100%'>
               <Typography gutterBottom variant='h5' color='textSecondary'>REGISTRO</Typography>
               <Divider />

               <FormControl  className={classes.formGroup}>
                  
                  <Box display='flex' justifyContent='space-between' alignItems='center'>
                     <ButtonGroup variant='contained' color='primary'>
                        <Tooltip title='Ingreso desde una lista' placement='top-end' arrow>
                           <Button 
                              startIcon={<FormatListNumbered fontSize='large' />}
                              onClick={handleOpenModalActividad}
                           />
                        </Tooltip>
                        <Tooltip title='Ingreso manual' placement='bottom-start' arrow>
                           <Button 
                              endIcon={<Create fontSize='large' />}
                              onClick={handleOpenModalNewActividad}
                           />
                        </Tooltip>
                     </ButtonGroup>
                     <Tooltip title='Ver selección' placement='left' arrow>
                        <IconButton
                           color='inherit'
                           onClick={handleOpenViewSelectionActividad}
                           disabled={refActividad.current.length === 0}
                        >
                           <Visibility fontSize='large' />
                        </IconButton>
                     </Tooltip>
                  </Box>
                  <FormHelperText>Ingrese la descripcion de la actividad a realizar</FormHelperText>
               </FormControl>

               <FormControl  className={classes.formGroup}>
                  <Box display='flex' justifyContent='space-between' alignItems='center'>
                     <ButtonGroup variant='contained' color='primary'>
                        <Tooltip title='Ingreso desde una lista' placement='top-end' arrow>
                           <Button 
                              startIcon={<FormatListNumbered fontSize='large' />}
                              onClick={handleOpenModalAccion}
                           />
                        </Tooltip>
                        <Tooltip title='Ingreso manual' placement='bottom-start' arrow>
                           <Button 
                              endIcon={<Create fontSize='large' />}
                              onClick={handleOpenModalNewAccion}
                           />
                        </Tooltip>
                     </ButtonGroup>
                     <Tooltip title='Ver selección' placement='left' arrow>
                        <IconButton 
                           color='inherit'
                           disabled={refAccion.current.length === 0}
                           onClick={handleOpenViewSelectionAccion}
                        >
                           <Visibility fontSize='large' />
                        </IconButton>
                     </Tooltip>
                  </Box>
                  <FormHelperText>Ingrese la acción desarrollada</FormHelperText>
               </FormControl>
                  
               <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  endIcon={
                     produccionTodayLoading
                        ? <CircularProgress size={20} color='inherit' />
                        : <DoubleArrow fontSize='large' />
                  }
                  disabled={ 
                     refActividad.current.length > 0 && refAccion.current.length > 0
                        ? false
                        : true
                  }
                  className={classes.buttonAdd}
                  onClick={handleAddProduccionToList}
               >
                  <Typography variant='h4'>Agregar</Typography>
               </Button>
            </Box>
         </Paper>

         {/*» MODAL'S  */}
         {
            openModalActividad 
               && (
                  <SimpleModal
                     open={openModalActividad}
                     setOpen={setOpenModalActividad}
                  >
                     <ProduccionList 
                        title='» Lista de actividades' 
                        data={descripcionActividadDb} 
                        handleSelection={handleSelectActividad}
                     />
                  </SimpleModal>
               )
         }{
            openModalAccion
               && (
                  <SimpleModal
                     open={openModalAccion}
                     setOpen={setOpenModalAccion}
                  >
                     <ProduccionList 
                        title='» Lista de acciones realizadas' 
                        data={accionDesarrolladaDb} 
                        handleSelection={handleSelectAccion}
                     />
                  </SimpleModal>
               )
         }
         {/*» New: Actividad & Action...  */}
         {
            openModalNewActividad
               &&(
                  <SimpleModal
                     open={openModalNewActividad}
                     setOpen={setOpenModalNewActividad}
                  >
                     <ProduccionTextArea 
                        title='Nueva actividad'
                        handleNew={handleNewActividad}
                     />
                  </SimpleModal>
               )
         }

         {
            openModalNewAccion
               &&(
                  <SimpleModal
                     open={openModalNewAccion}
                     setOpen={setOpenModalNewAccion}
                  >
                     <ProduccionTextArea 
                        title='Nueva acción'
                        handleNew={handleNewAccion}
                     />
                  </SimpleModal>
               )
         }


         {/*» View's  */}
         {
            openModalViewActividad
               &&(
                  <SimpleModal
                     open={openModalViewActividad}
                     setOpen={setOpenModalViewActividad}
                  >
                     <ProduccionView title='Actividad seleccionada' payload={refActividad.current} />
                  </SimpleModal>
               )
         }
         {
            openModalViewAccion
               && (
                  <SimpleModal
                     open={openModalViewAccion}
                     setOpen={setOpenModalViewAccion}
                  >
                     <ProduccionView title='Acción seleccionada' payload={refAccion.current} />
                  </SimpleModal>
               )
         }
      </>
   )
}