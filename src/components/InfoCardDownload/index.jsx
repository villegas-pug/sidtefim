import React from 'react'
import PropTypes from 'prop-types'

import { 
   Paper, 
   Grid, 
   Typography, 
   Avatar,
   IconButton,
   CircularProgress
} from '@material-ui/core'
import { Download } from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
   paper: {
      height: 80,
      width: 230,
   },
   rootGrid: {
      height: '100%'
   },
   avatar:{
      width: 55,
      height: 55,
   }
})

export default function InfoCardDownload({ icon: Icon, title, value, handleDownload, isLoading }){

   /*» HOOK'S  */
   const classes = useStyle()

   return (
      <>
         <Paper variant='outlined' className={classes.paper}>
            <Grid container className={classes.rootGrid}>
               <Grid item container xs={5} justify='center' alignItems='center'>
                  <Avatar className={classes.avatar}><Icon fontSize='large' /></Avatar>
               </Grid>
               <Grid item container xs={7}>
                  <Grid item container xs={12} alignItems='flex-end' justify='center'>
                     <Typography variant='h4' color='textSecondary'>{title}</Typography>
                  </Grid>
                  <Grid item container xs={7} alignItems='center' justify='center'>
                     <Typography variant='h1' color='primary'>{value}</Typography>
                  </Grid>
                  <Grid item container xs={5} alignItems='center' justify='center'>
                     <IconButton
                        onClick={ handleDownload }
                        disabled={ isLoading || !value }
                     >
                        { isLoading ? <CircularProgress size={20} color='inherit' /> :  <Download fontSize='small' /> }
                     </IconButton>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </>
   )
}

InfoCardDownload.propTypes = {
   icon: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   isLoading: PropTypes.bool.isRequired,
   handleDownload: PropTypes.func.isRequired
}
