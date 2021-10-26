import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { 
   TextareaAutosize, 
   Paper,
   Typography,
   Button,
   Divider
} from '@material-ui/core'
import { DoneAll } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
   paper: {
      marginTop: 12,
      width: 400
   },
   textarea: {
      border: 'none',
      width: '100%',
   },
   button: {
      marginTop: 15
   }
})

export default function ProduccionTextArea({ title, handleNew }){

   /*» HOOK'S  */
   const classes = useStyle()
   const [value, setValue] = useState('')


   /*» HANDLER'S  */
   const handleChange = ({ target: { value } }) => { setValue(value) }
   const handleFinish = () => { handleNew(value) }

   return (
      <>
         <Typography gutterBottom variant='h3' color='primary'>{title}</Typography>
         <Divider />

         <Paper variant='outlined' className={classes.paper}>
            <TextareaAutosize
               autoFocus
               autoCapitalize
               value={value}
               className={classes.textarea} 
               onChange={handleChange}
            />
         </Paper>
         <Button
            variant='contained'
            className={classes.button}
            onClick={handleFinish}
         >
            <DoneAll />
         </Button>
      </>
   )
}

ProduccionTextArea.propTypes = {
   title: PropTypes.string.isRequired,
   handleNew: PropTypes.func.isRequired
}