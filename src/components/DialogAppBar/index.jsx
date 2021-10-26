import React from 'react'
import PropTypes from 'prop-types'
import {
   Button,
   Dialog,
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Slide,
} from '@material-ui/core'
import { Close, Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />
})

const useStyle = makeStyles({
   toolBar: {
      display: 'flex',
   },
   title: {
      flexGrow: 1,
      textAlign: 'center'
   }
})

export default function DialogAppBar({ open, setOpen, handleAction, children }) {

   const classes = useStyle()

   const handleClose = () => { setOpen(false)}

   return (
      <>
         <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
         >
            <AppBar 
               sx={{ position: 'relative' }} 
               color='primary'
            >
               <Toolbar className={classes.toolBar}>
                  <IconButton
                     edge="start"
                     color="inherit"
                     onClick={handleClose}
                     aria-label="close"
                  >
                     <Close />
                  </IconButton>
                  <Typography variant="h3" className={classes.title}>
                     OPCIONES DE BUSQUEDA
                  </Typography>
                  <Button 
                     color='inherit'
                     variant='outlined'
                     startIcon={<Search fontSize='large' />}
                     onClick={handleAction}
                     autoFocus 
                  >
                     <Typography variant='h4' className={classes.title}>
                        BUSCAR
                     </Typography>
                  </Button>
               </Toolbar>
            </AppBar>
            <>
               {children}
            </>
         </Dialog>
      </>
   )
}

DialogAppBar.propTypes = {
   open: PropTypes.bool.isRequired, 
   setOpen: PropTypes.func.isRequired,
   handleAction: PropTypes.func.isRequired,
   children: PropTypes.element.isRequired
}