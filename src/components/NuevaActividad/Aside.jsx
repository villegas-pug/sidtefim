import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
   Paper, 
   Box,
   Typography,
   TextField,
   InputAdornment,
   List,
   IconButton,
   Switch,
   Divider,
   FormLabel,
   Tooltip,
   Button,
   CircularProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
   FilterList,
   AddCircle,
   DoneAll,
} from '@material-ui/icons'
import { Scrollbars } from 'react-custom-scrollbars'
import { useDebounce } from 'use-debounce'

import useProduccion from 'hooks/useProduccion'

import SimpleModal from 'components/SimpleModal'
import ListItemActividad from 'components/NuevaActividad/ListItemActividad'

const useStyle = makeStyles({
   paper: {
      padding: 10,
      height: '100%',
      overflow: 'hidden'
   },
   textField:{
      width: 500,
   },
   textFieldModal:{
      width: 1200,
   },
   list:{
      height: '50%',
   },
   formLabel:{
      display: 'flex',
      width: 100,
      alignItems: 'center',
      userSelect: 'none',
      '&:hover':{
         cursor: 'pointer'
      }
   },
})

const scrollbar = {
   height: 120
}

const initialValues = {
   idActividad: '',
   descripcion: '',
   tipo: ''
}

export default function Aside({title, tipo, data}) {

   /*» HOOK'S  */
   const [check, setCheck] = useState(false)
   const [error, setError] = useState('')
   const [actividad, setActividad] = useState({...initialValues, tipo})
   const [openModalEdit, setOpenModalEdit] = useState(false)
   const [debDescripcion] = useDebounce(actividad.descripcion, 500)

   /*» CUSTOM HOOK'S  */
   const classes = useStyle()
   const { 
      actividadDbLoading, 
      handleSaveActividad, 
      handleDeleteActividadById 
   } = useProduccion()

   /*» EFFECT'S  */
   useEffect(() => { 
      setActividad({...initialValues, tipo })
      setOpenModalEdit(false)
   }, [data])
   useEffect(() => { !openModalEdit && setActividad({...initialValues, tipo}) }, [openModalEdit])
   useEffect(() => { setError('') }, [actividad.descripcion])
   useEffect(() => { !actividad.descripcion && setError('¡Requerido!') }, [actividad.descripcion])

   /*» HANDLER'S  */
   const handleCheck = () => { setCheck((prev) => !prev) }
   const handleChangeActividad = ({ target: {name, value} }) => { setActividad((prev) => ({ ...prev, [name]: value  }))}
   const handleEdit = ({...rest}) => (setActividad((prev) => ({...prev, ...rest})), setOpenModalEdit(true))
   const handleDelete = (idActividad) => {handleDeleteActividadById(idActividad)}
   const handleSave = () => { !error && handleSaveActividad(actividad) }

   return (
      <>
         <Paper variant='outlined' className={classes.paper}>

            {/*» TITLE...  */}
            <Typography gutterBottom variant='h5' color='primary'>{title}</Typography>
            <Divider />

            {/*» CHECK...  */}
            <FormLabel className={classes.formLabel}>
               <Switch 
                  color='primary'
                  onClick={handleCheck}
               />
               <Tooltip 
                  title={ <Typography variant='h6' color='initial'>¡Activar para nuevo registro!</Typography> }
                  placement='top-start'
                  arrow
               >
                  <Typography variant='h4' color='textSecondary'>{check ? 'Buscar' : 'Nuevo'}</Typography>
               </Tooltip>
            </FormLabel>

            {/*» FILTER...  */}
            <Box height={55}>
               <TextField
                  name='descripcion'
                  value={actividad.descripcion}
                  style={{ display: openModalEdit && 'none' }}
                  label={check ? 'Ingrese nuevo registro' : 'Ingrese filtro'}
                  size='small'
                  error={Boolean(error)}
                  helperText={error}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position='start'>
                           <FilterList />
                        </InputAdornment>
                     ),
                  }}
                  className={classes.textField}
                  onChange={handleChangeActividad}
               />
               <Tooltip 
                  title={<Typography variant='h6' color='initial'>Agregar</Typography>} 
                  placement='right-start' 
                  arrow
               >
                  <IconButton
                     disabled={!check}
                     onClick={handleSave}
                  >
                     {
                        actividadDbLoading
                           ? <CircularProgress size={20} color='primary' />
                           : <AddCircle fontSize='large' color='primary' />
                     }
                  </IconButton>
               </Tooltip>
            </Box>

            {/*» BODY...  */}
            <Scrollbars style={scrollbar}>
               <List>
                  <ListItemActividad 
                     data={data} 
                     value={debDescripcion} 
                     handleEdit={handleEdit} 
                     handleDelete={handleDelete} 
                     isNew={check} 
                  />
               </List>
            </Scrollbars>
         </Paper>

         {/*» MODAL'S  */}
         {
            openModalEdit 
               && (
                  <SimpleModal open={openModalEdit} setOpen={setOpenModalEdit}>
                     <Typography gutterBottom variant='h5' color='primary'>ACTUALIZAR SELECCIÓN</Typography>
                     <Divider className={classes.divider} />
                     <Box flexDirection='column' height={50}>
                        <TextField 
                           disabled
                           name='idActividad'
                           value={actividad.idActividad.toString().padStart(18, '0')}
                           size='small' 
                           label='código'
                        />
                     </Box>
                     <Box display='flex' flexDirection='column' height={65}>
                        <TextField 
                           focused
                           name='descripcion'
                           value={actividad.descripcion}
                           size='small' 
                           label='descripción'
                           error={Boolean(error)}
                           helperText={error}
                           className={classes.textFieldModal} 
                           onChange={handleChangeActividad}
                        />
                     </Box>
                     <Button
                        disabled={Boolean(error)}
                        variant='contained'
                        color='primary'
                        onClick={handleSave}
                     >
                        <DoneAll fontSize='large' />
                     </Button>
                  </SimpleModal>
               )

         }
      </>
   )
}

Aside.propTypes = {
   title: PropTypes.string.isRequired,
   tipo: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired
}