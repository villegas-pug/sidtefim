import React from 'react'
import {
   Paper,
   Typography,
   Divider,
   FormControl,
   FormHelperText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import useProduccion from 'hooks/useProduccion'

const useStyle = makeStyles({
   paper: {
      height: '100%',
      padding: 16
   },
   formControl: {
      display: 'block',
      marginTop: 30
   }
})

export default function RigthAside(){
   /*» STORE - HOOK'S  */
   const { listViewRightAside } = useProduccion()

   /*» HOOK'S  */
   const classes = useStyle()

   /*» HANDLER'S  */
   

   return (
      <Paper variant='outlined' draggable className={classes.paper}>
         <Typography gutterBottom variant='h5' color='textSecondary'>DETALLE</Typography>
         <Divider />
         <>
            {
               listViewRightAside?.detalleProduccion?.map(({descripcionActividad, accionDesarrollada}) => (
                  <>
                     <FormControl className={classes.formControl}>
                        <Typography variant='h4' color='initial'>
                           {descripcionActividad}
                        </Typography>
                        <FormHelperText>Descripción de la actividad</FormHelperText>
                     </FormControl>
                     <FormControl className={classes.formControl}>
                        <Typography variant='h4' color='initial'>
                           {accionDesarrollada}
                        </Typography>
                        <FormHelperText>Descripción de la acción realizada</FormHelperText>
                     </FormControl>
                  </>
               ))
            }
         </>
      </Paper>
   )
}
