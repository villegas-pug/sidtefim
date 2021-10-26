import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

const useStyles = makeStyles(({
   speedDial: ({ position, opt }) => ({
      position: position ?? 'relative',
      ...opt
   })
}))

export default function SpeedDials({direction, optSpeedDialAction, ...rest}) {
   const classes = useStyles(rest)
   const [open, setOpen] = React.useState(false)

   /*» HANDLER'S  */
   const handleClose = () => { setOpen(false)}
   const handleOpen = () => {setOpen(true)}

   return (
      <SpeedDial
         ariaLabel="SpeedDial example"
         className={classes.speedDial}
         FabProps={{ style: { backgroundColor: '#004795', color: '#fff', fontSize: 17 } }}
         icon={<SpeedDialIcon />}
         onClose={handleClose}
         onOpen={handleOpen}
         open={open}
         direction={direction}
      >
         {
            optSpeedDialAction.map(({tooltip, handleOnClick, icon, fabProps}) => (
               <SpeedDialAction
                  key={tooltip}
                  tooltipTitle={tooltip}
                  icon={icon}
                  onClick={() => {
                     handleOnClick()
                     handleClose()
                  }}
                  color='primary'
                  FabProps={{...fabProps}}
               />
            ))
         }
      </SpeedDial>
   )
}

SpeedDials.propTypes ={
   direction: PropTypes.string.isRequired,
   optSpeedDialAction: PropTypes.array.isRequired
}