import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { 
   Dialog, 
   DialogTitle ,
   DialogContent, 
   DialogActions, 
   Button,
   Avatar, 
   Typography
} from '@material-ui/core'
import { 
   ContactSupport,
   DoneOutline,
   Cancel
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
   dialogTitle: {
      textAlign: 'center'
   },
   avatar: {
      backgroundColor: theme.palette.secondary.light,
      color: '#fff'
   }
}))


export default function Confirm({open = false, title, subTitle}) {

   /*» HOOK'S  */
   const classes = useStyle()
   const [openDialog, setOpenDialog] = useState(false)

   /*» EFFECT'S  */
   useEffect(() => { open && handleOpen() }, [open])

   /*» HANDLER'S  */
   const handleOpen = () => { setOpenDialog(true) }
   const handleClose = () => { setOpenDialog(false) }

   return (
      <>
         <Dialog
            open={openDialog}
            onClose={handleClose}
         >
            <DialogTitle className={classes.dialogTitle}>
               <Avatar className={classes.avatar}>
                  <ContactSupport fontSize={50} />
               </Avatar>
            </DialogTitle>
            <DialogContent>
               <Typography variant='h5'>{title}</Typography>
               <Typography variant='subtitle2'>{subTitle}</Typography>
            </DialogContent>
            <DialogActions>
               <Button 
                  onClick={handleClose} 
                  color='primary'
                  startIcon={<DoneOutline fontSize='large' />}
               >
                  ACEPTAR
               </Button>
               <Button 
                  onClick={handleClose} 
                  color='secondary' 
                  startIcon={<Cancel fontSize='large' />}
                  autoFocus
               >
                  CANCELAR
               </Button>
            </DialogActions>
         </Dialog>
      </>
   )
}

Confirm.propTypes = {
   open: PropTypes.bool.isRequired,
   title: PropTypes.string.isRequired,
   subTitle: PropTypes.string.isRequired,
}