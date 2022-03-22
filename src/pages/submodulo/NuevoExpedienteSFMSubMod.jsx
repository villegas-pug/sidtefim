import React from 'react'

import {
   Box,
   Paper,
   Grid,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core'
import Fade from 'react-reveal/Fade'

import ModalLoader from 'components/Styled/ModalLoader'
import { AsideLeft, AsideRigth } from 'components/nuevoExpedienteSFMSubMod'

import useFiscalizacionPosterior from 'hooks/useFiscalizacionPosterior'

const useStyle = makeStyles({
   paper: {
      height: '100%',
      padding: 30
   },
   avatar: {
      height: 70,
      width: 70
   }
})

export default function NuevoExpedienteSFMSubMod() {

   /*» CUSTOM-HOOK'S  */
   const classes = useStyle()
   const { 
      fiscalizacionPosteriorDbLoading, 
   } = useFiscalizacionPosterior()

   return (
      <>
         <Box
            height='85vh'
            overflow='hidden'
         >
            <Paper variant='outlined' className={ classes.paper }>
               <Grid container>
                  <Grid item xs={3}>
                     <Fade left when={!fiscalizacionPosteriorDbLoading}>
                        <AsideLeft />
                     </Fade>
                  </Grid>
                  <Grid item xs={9}>
                     <Fade big duration={3000} when={!fiscalizacionPosteriorDbLoading}>
                        <AsideRigth />
                     </Fade>
                  </Grid>
               </Grid>
            </Paper>
         </Box>

         {/*» MODAL-LOADING ...  */}
         {fiscalizacionPosteriorDbLoading && <ModalLoader />}
      </>
   )
}