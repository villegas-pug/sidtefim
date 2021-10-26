import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { 
   Paper,
   Grid, 
   Typography,
   createMuiTheme,
   ThemeProvider,
   Button,
   Box,
   CircularProgress
} from '@material-ui/core'
import {
   Check,
   TouchApp,
   QueryBuilder
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/styles'

import useProduccion from 'hooks/useProduccion'
import useAuth from 'hooks/useAuth'

import { subModulo } from 'constants/components'

const { REGISTRAR_PRODUCCION } = subModulo

const useStyle = makeStyles({
   paper:{
      display: 'inline-block',
   },
   grid: {
      width: 500,
      padding: 10
   }
})

export default function DayCard({dayOfWeek, date, enableToday, progress}){

   /*» HOOK'S  */
   const classes = useStyle()

   /*» CUSTOM HOOK'S  */
   const { handleRegistrarActividad } = useProduccion()
   const { pathAuthenticated } = useAuth()

   /*» HANDLERS...  */
   

   /*» DEPENDENCY'S   */
   const muiTheme = useMemo(() => (
      createMuiTheme({
         palette:{
            primary:{
               main: enableToday ? '#159F5C' : '#A6A6A6',
            }
         },
         typography:{
            h1:{
               fontSize: 45,
               fontWeight: 1000
            },
            h5:{
               fontSize: 13,
               fontStyle: 'italic',
               fontWeight: 800
            }
         }
      })
   ), [enableToday])
   
   return (
      <ThemeProvider theme={muiTheme}>
         <Paper variant='outlined' className={classes.paper} >
            <Grid container spacing={1} alignItems='center' className={classes.grid}>
               <Grid item xs={2}>
                  <Grid container justify='center'>
                     <Typography variant='h1' color='primary'>{dayOfWeek}</Typography>
                  </Grid>
               </Grid>
               <Grid item xs={8}>
                  <Grid container justify='center' spacing={1}>
                     <Grid item xs={12}>
                        <Typography variant='h5' color='primary'>{date}</Typography>
                     </Grid>
                     <Grid item xs={12}>
                        <Box position='relative' display='flex' justifyContent='center'>
                           <CircularProgress variant='determinate' value={progress * 100} />
                           <Box
                              position='absolute'
                              top={0}
                              left={0}
                              bottom={0}
                              right={0}
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                           >
                              <Typography variant='h5' color='primary'>
                                 {
                                    `${(progress * 100).toFixed(0)}%`
                                 }
                              </Typography>
                           </Box>
                        </Box>
                     </Grid>
                     <Grid item xs={12} >
                        <Button 
                           variant='contained' 
                           color='primary'
                           disabled={!enableToday}
                           onClick={() => {handleRegistrarActividad(pathAuthenticated[REGISTRAR_PRODUCCION])}}
                        >
                           <TouchApp fontSize='small' />
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
               <Grid item xs={2}>
                  <Grid container justify='center' alignItems='center'>
                     {
                        progress > 0
                           ? <Check fontSize='large' color='primary' />
                           : <QueryBuilder fontSize='large' color='primary' />
                     }
                     
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </ThemeProvider>
   )
}

DayCard.propTypes = {
   dayOfWeek: PropTypes.number.isRequired, 
   date: PropTypes.string.isRequired, 
   enableToday: PropTypes.bool.isRequired, 
   progress: PropTypes.number.isRequired
}