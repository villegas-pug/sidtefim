import React, { useRef, useState } from 'react'
import { Grid } from '@material-ui/core'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import ContentTitle from 'components/Styled/ContentTitle'
import FrmProcNac from 'components/Form/FrmProcNac'
import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import AsignarProcToEval from 'components/AsignarProcToEval'
import AsignarProcedimientoNac from 'components/AsignarProcedimientoNac'
import Pulse from 'react-reveal/Pulse'

export default function RegistrarProcedimiento() {

   const dispatch = useDispatch()
   const rRegistrar = useRef()
   const rLimpiar = useRef()

   const [visibleModal, setVisibleModal] = useState(false)
   const [sendSumitModal, setSendSubmitModal] = useState(false)

   const handleSendSumitModal = e => {
      setSendSubmitModal(true)
      setVisibleModal(false)
   }

   const {
      tipoDocumento: { data: tipoDocumento },
      pais: { data: pais },
      tipoSolicitud: { data: tipoSolicitud },
      tipoTramite: { data: tipoTramite },
      usuario: { data: usuario },
      forms: { inputValuesProcNac }
   } = useSelector(store => store)


   const handleSubmit = (values, meta) => {
      console.log(values)
      /* dispatch(registrarProcNac({ procNacionalizacion: values, usuario: usuario[0] })) */
   }

   return (
      <Pulse>
         <ContentTitle title='REGISTRO Y ASIGNACIÓN DE PROCEDIMIENTOS' />
         <FrmProcNac />
         <Grid container>
            <Grid item xs={12}>
               <Modal
                  title='» SELECCIONA EVALUADOR'
                  onOk={handleSendSumitModal}
                  onCancel={() => setVisibleModal(false)}
                  visible={visibleModal}
               >
                  <AsignarProcToEval sendSubmit={sendSumitModal} setSendSubmit={setSendSubmitModal} handleOnSubmit={handleSubmit} />
               </Modal>
            </Grid>
         </Grid>
         <AsignarProcedimientoNac />
      </Pulse>
   )
}