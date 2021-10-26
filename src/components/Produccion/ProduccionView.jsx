import React from 'react'
import PropTypes from 'prop-types'
import { 
   Typography,
   Divider,
   Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
   paper: {
      marginTop: 10,
      padding: 10,
      width: 400,
      height: 100
   },
   content:{
      textAlign: 'justify'
   }
})

export default function ProduccionView({ title, payload }){
   /*» HOOK'S  */
   const classes = useStyle()

   return (
      <>
         <Typography gutterBottom variant='h2' color='primary'>{title}</Typography>
         <Divider />
         <Paper 
            variant='outlined' 
            className={classes.paper}
            draggable 
         >
            <Typography 
               variant='h4' 
               color='initial'
               className={classes.content}
            >
               {payload}
            </Typography>
         </Paper>
      </>
   )
}

ProduccionView.propTypes = {
   title: PropTypes.string.isRequired,
   payload: PropTypes.object.isRequired
}
