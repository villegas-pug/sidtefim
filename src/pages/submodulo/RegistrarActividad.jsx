import React, { useEffect } from 'react'
import {
   Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Fade from 'react-reveal/Fade'

import AccessDenied from 'components/AccessDenied'
import LeftAside from 'components/Produccion/LeftAside'

import useProduccion from 'hooks/useProduccion'
import MiddelAside from 'components/Produccion/MiddleAside'
import RigthAside from 'components/Produccion/RigthAside'

const useStyle = makeStyles({
   gridContainer:{
      height: '85vh'
   },
})

export default function RegistrarActividad(){

   /*» CUSTOM-HOOK'S  */
   const classes = useStyle()

   const { 
      allowRegisterProd,
      handleDenyRegisterProd,
   } = useProduccion()

   /*» EFFECT'S  */
   useEffect(() => {
      return () => {/*-> Cleanup... */
         handleDenyRegisterProd()
      }
   }, [])

   /*» CONDITIONAL RENDERING...  */
   if(!allowRegisterProd) return <AccessDenied />

   return (
      <>
         <Fade>
            <Grid container spacing={1} className={classes.gridContainer}>
               {/*» Aside-Left  */}
               <Grid item xs={4}>
                  <LeftAside />
               </Grid>

               {/*» Aside-Middle  */}
               <Grid item xs={4}>
                  <MiddelAside />
               </Grid>

               {/*» Aside-Rigth  */}
               <Grid item xs={4}>
                  <RigthAside />
               </Grid>
            </Grid>
         </Fade>
      </>
   )
}