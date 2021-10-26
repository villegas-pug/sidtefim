import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Fade from 'react-reveal/Fade'

import Aside from 'components/NuevaActividad/Aside'

import useProduccion from 'hooks/useProduccion'

const useStyle = makeStyles({
   gridContainer: {
      height: '86vh'
   },
   gridItem: {
      padding: 2,
      height: '50%',
   },
   paper: {
      padding: 10,
      height: '100%'
   },
})

export default function NuevaActividadSubMod() {

   /*» CUSTOM HOOK'S  */
   const classes = useStyle()
   const { descripcionActividadDb, accionDesarrolladaDb } = useProduccion()

   return (
      <>
         <Fade>
            <Grid container className={classes.gridContainer}>
               <Grid item xs={12} className={classes.gridItem}>
                  <Aside title='ACTIVIDADES' tipo='ACTIVIDAD' data={descripcionActividadDb} />
               </Grid>
               <Grid item xs={12} className={classes.gridItem}>
                  <Aside title='ACCIONES' tipo='ACCION' data={accionDesarrolladaDb} />
               </Grid>
            </Grid>
         </Fade>
      </>
   )
}