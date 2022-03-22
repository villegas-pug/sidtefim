import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
   Stepper,
   Step,
   StepLabel,
   Typography
} from '@material-ui/core'

const useStyles = makeStyles({
   root: {
      width: '100%',
      marginBottom: 10
   },
   step: {
      '& .MuiStepIcon-completed, & .MuiStepIcon-active': {
         color: '#004795'
      }
   }
})

export default function StepperMui({ activeStep, steps, orientation = 'horizontal' }) {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <Stepper activeStep={activeStep - 1} orientation={orientation}>
            {
               steps?.map(({ stage, description }) => (
                  <Step className={classes.step} key={stage} >
                     <StepLabel>
                        <Typography variant='h5'>{description}</Typography>
                     </StepLabel>
                  </Step>
               ))
            }
         </Stepper>
      </div>
   )
}

StepperMui.propTypes = {
   activeStep: PropTypes.number.isRequired, 
   steps: PropTypes.array.isRequired,
   orientation: PropTypes.string
}