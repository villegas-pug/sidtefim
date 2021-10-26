import React, { useState } from 'react'
import {
   Grid,
   ButtonGroup,
   Button, 
   Typography
} from '@material-ui/core'
import { 
   PanTool, 
   Storage,
   ArrowBackIos
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Fade } from 'react-reveal'

import SaveAllInterpol from 'components/Interpol/SaveAllInterpol'
import SaveOneInterpol from 'components/Interpol/SaveOneInterpol'

const INTERPOL_VIEWS = 'INTERPOL_VIEWS'
const SAVE_ONE_INTERPOL_VIEW = 'SAVE_ONE_INTERPOL_VIEW'
const SAVE_ALL_INTERPOL_VIEW = 'SAVE_ALL_INTERPOL_VIEW'

const useStyle = makeStyles({
   gridContainer: {
      height: '85%',
   }
})

export default function NuevoInterpolSubMod() {

   /*» HOOK'S  */  
   const [view, setView] = useState(INTERPOL_VIEWS)
   const classes = useStyle()

   /*» CUSTOM HOOK'S  */
   /*»  EFFECT'S */

   /*» HANDLER'S  */
   const handleChangeView = (view) => { setView(view) }

   return (
      <Grid container className={classes.gridContainer} >
         {
            view !== INTERPOL_VIEWS
            && (
               <Grid item xs={1}>
                  <Fade>
                     <Button 
                        variant='contained' 
                        color='inherit'
                        startIcon={<ArrowBackIos fontSize='small' color='action'/>}
                        onClick={() => handleChangeView(INTERPOL_VIEWS)}
                     >
                        <Typography variant='h4' color='initial'>Regresar</Typography>
                     </Button>
                  </Fade>
               </Grid>
            )
         }
         <Grid item container xs={11} justify='center' alignItems='center'>
            {
               view === INTERPOL_VIEWS
                  && (
                     <Fade>
                        <ButtonGroup variant='contained' color='primary'>
                           <Button 
                              startIcon={<PanTool Storage='large' />} 
                              onClick={() => handleChangeView(SAVE_ONE_INTERPOL_VIEW)}
                           >
                              <Typography variant='h4' color='initial'>MANUAL</Typography>
                           </Button>
                           <Button 
                              startIcon={<Storage fontSize='large' />} 
                              onClick={() => handleChangeView(SAVE_ALL_INTERPOL_VIEW)}
                           >
                              <Typography variant='h4' color='initial'>ORIGEN DE DATOS</Typography>
                           </Button>
                        </ButtonGroup>
                     </Fade>
                  ) 
            }
            { view === SAVE_ONE_INTERPOL_VIEW && <SaveOneInterpol /> }
            { view === SAVE_ALL_INTERPOL_VIEW && <SaveAllInterpol /> }
         </Grid>
      </Grid>
   )
}