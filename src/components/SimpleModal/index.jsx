import React, { /* useImperativeHandle */ } from 'react'
import PropTypes from 'prop-types'
import {
   Modal,
   Backdrop,
   Fade
} from '@material-ui/core'
import styled from 'styled-components'

const Body = styled.div`
   position: absolute;
   display: inline-block;
   top: 50vh;
   left: 50vw;
   transform: translateY(-50%) translateX(-50%);
   padding: 1rem;
   background-color: #fff;
`
function SimpleModal({ children, open, setOpen }) {

   /*» HOOK'S */

   /*» HANDLER'S  */
   const handleClose = () => { setOpen(false) }

   return (
      <Modal
         open={open}
         onClose={handleClose}
         BackdropComponent={Backdrop}
         BackdropProps={{ timeout: 1000 }}
         closeAfterTransition={true}
         disableAutoFocus={true}
         disableEnforceFocus={true}
         disableRestoreFocus={true}
      >
         <Fade in={open}>
            <Body>
               {children}
            </Body>
         </Fade>
      </Modal>
   )
}

SimpleModal.propTypes = {
   children: PropTypes.any.isRequired,
   open: PropTypes.bool.isRequired,
   setOpen: PropTypes.func.isRequired
}

export default React.memo(SimpleModal)