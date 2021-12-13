import React from 'react'
import PropTypes from 'prop-types'

import { Paper, Grid, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Icons } from 'helpers/icons'

const useStyle = makeStyles({
   paper: {
      height: 80,
      width: 220,
   },
   rootGrid: {
      height: '100%'
   },
   avatar:{
      width: 55,
      height: 55,
   }
})

export default function InfoCard({iconName, title, value}){

   /*» HOOK'S  */
   const classes = useStyle()

   return (
      <>
         <Paper variant='outlined' className={classes.paper}>
            <Grid container className={classes.rootGrid}>
               <Grid item container xs={5} justify='center' alignItems='center'>
                  <Avatar className={classes.avatar}>
                     { Icons[iconName] }
                  </Avatar>
               </Grid>
               <Grid item container xs={7}>
                  <Grid item container xs={12} alignItems='flex-end' justify='center'>
                     <Typography variant='h4' color='textSecondary'>{title}</Typography>
                  </Grid>
                  <Grid item container xs={12} alignItems='center' justify='center'>
                     <Typography variant='h1' color='primary'>{value}</Typography>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </>
   )
}

InfoCard.propTypes = {
   iconName: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   loading: PropTypes.bool.isRequired
}
