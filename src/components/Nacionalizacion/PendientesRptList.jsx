import React from 'react'
import PropTypes from 'prop-types'
import {
   List,
   ListItem,
   ListItemText,
   ListItemAvatar,
   Avatar,
   Button,
   Typography
} from '@material-ui/core'
import { 
   Equalizer,
   List as ListIcon
} from '@material-ui/icons'
import Fade from 'react-reveal/Fade'

export default function PendientesRptList({items, setItem}){

   /*» HANDLER'S  */
   const handleChangeItem = (nombre) => setItem(nombre)

   return (
      <Fade>
         <Button
            variant='contained'
            color='default'
            startIcon={<ListIcon fontSize='small' />}
            disableElevation
            fullWidth
         >
            <Typography 
               variant='h4' 
               color='textPrimary'
            >
               REPORTES
            </Typography>
         </Button>
         <List>
            {
               items.map(({ idProcedimiento, nombre, descripcion }) => (
                  <ListItem 
                     button
                     key={idProcedimiento} 
                     onClick={() => handleChangeItem(nombre)}
                  >
                     <ListItemAvatar>
                        <Avatar>
                           <Equalizer fontSize='large' />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText 
                        primary={
                           <Typography variant='h4' color='initial'>{nombre}</Typography>
                        }
                        secondary={descripcion}
                     />
                  </ListItem>
               ))
            }
         </List>
      </Fade>
   )
}

PendientesRptList.propTypes = {
   items: PropTypes.array.isRequired,
   setItem: PropTypes.func.isRequired
}