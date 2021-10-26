import React, { useState } from 'react'
import {
   Paper,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListItemSecondaryAction,
   IconButton,
   Typography,
   Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
   QueryBuilder,
   DeleteForever
} from '@material-ui/icons'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import useProduccion from 'hooks/useProduccion'

const useStyle = makeStyles({
   paper: {
      height: '100%',
      padding: 16
   },
   list: {
      marginTop: 30
   }
})

export default function MiddleAside(){
   /*» STORE - HOOK'S  */
   const { 
      produccionTodayDb,
      handleDeleteProduccionById,
      handleSelectedIdProduccionOnTodayList
   } = useProduccion()

   /*» HOOK'S  */
   const classes = useStyle()
   const [currentItemSelected, setCurrentItemSelected] = useState(-1)

   /*» HANDLER'S  */
   const handleSelected = (idProduccion, listItemIndex) => {
      handleSelectedIdProduccionOnTodayList(idProduccion)
      setCurrentItemSelected(listItemIndex)
   }
   

   return (
      <Paper variant='outlined' draggable className={classes.paper}>
         <Typography gutterBottom variant='h5' color='textSecondary'>ACTIVIDADES HOY</Typography>
         <Divider />
         <List className={classes.list}>
            {
               produccionTodayDb.map(({idProduccion, fechaAuditoria}, listItemIndex) => (
                  <ListItem 
                     key={idProduccion}
                     button
                     selected={currentItemSelected === listItemIndex}
                     onClick={() => {handleSelected(idProduccion, listItemIndex)}}
                  >
                     <ListItemIcon><QueryBuilder fontSize='large' /></ListItemIcon>
                     <ListItemText key={idProduccion} primary={
                        <Typography variant='h5' color='initial'>
                           {
                              format(new Date(fechaAuditoria), 'Pp', { locale: es })
                           }
                        </Typography>
                     } />
                     <ListItemSecondaryAction>
                        <IconButton
                           onClick={() => handleDeleteProduccionById(idProduccion)}
                        >
                           <DeleteForever />
                        </IconButton>
                     </ListItemSecondaryAction>
                  </ListItem>
               ))
            }
         </List>
      </Paper>
   )
}
