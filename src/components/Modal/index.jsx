import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'


export default function MyModal({ title, visible, setVisible, children }) {

   const handleOk = () => setVisible(false)
   const handleCancel = () => setVisible(false)

   return (
      <>
         <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            {children}
         </Modal>
      </>
   )
}

MyModal.propTypes = {
   title: PropTypes.string.isRequired, 
   visible: PropTypes.bool.isRequired, 
   setVisible: PropTypes.func.isRequired, 
   children: PropTypes.any.isRequired
}