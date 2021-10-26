import React from 'react'
import PropTypes from 'prop-types'
import {
   Typography,
   ListItem,
   ListItemText,
   ListItemIcon,
   ListItemSecondaryAction,
   IconButton,
   Tooltip,
} from '@material-ui/core'
import { 
   Edit,
   DeleteForever,
   Check
} from '@material-ui/icons'

function ListItemActividad({data, value, handleEdit, handleDelete}){
   console.log('ListItemActividad renderizado!!!')
   return (
      <>
         {
            data?.filter(({descripcion}) => descripcion.toLowerCase().includes(value.toLowerCase()))
               .map(({idActividad, descripcion}) => {
                  return (
                     <ListItem key={idActividad} button>
                        <ListItemIcon>
                           <Check />
                        </ListItemIcon>
                        <ListItemText 
                           primary={
                              <Typography variant='h6' color='initial'>{descripcion}</Typography>
                           } 
                        />
                        <ListItemSecondaryAction>
                           <Tooltip title='Editar' placement='top-start' arrow>
                              <IconButton
                                 onClick={() => handleEdit({idActividad, descripcion})}
                              >
                                 <Edit />
                              </IconButton>
                           </Tooltip>
                           <Tooltip title='Eliminar' placement='top-start' arrow>
                              <IconButton
                                 onClick={() => handleDelete(idActividad)}
                              >
                                 <DeleteForever />
                              </IconButton>
                           </Tooltip>
                        </ListItemSecondaryAction>
                     </ListItem>
                  )})
         }  
      </>
   )
}

ListItemActividad.propTypes = {
   data: PropTypes.array.isRequired,
   value: PropTypes.string.isRequired, 
   handleEdit: PropTypes.func.isRequired, 
   handleDelete: PropTypes.func.isRequired,
   isNew: PropTypes.object.isRequired
}

export default React.memo(ListItemActividad, (prevProps, nextProps) => {
   return nextProps.isNew === true && prevProps.data === nextProps.data
})