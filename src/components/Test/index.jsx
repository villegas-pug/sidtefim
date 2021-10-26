import React, { useRef } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import {
   Paper,
   Button,
} from '@material-ui/core'
import SpeedDial from 'components/SpeedDial'
import { Save, DeleteForever } from '@material-ui/icons'
import * as Yup from 'yup'
import _ from 'lodash'
import MyTextField from 'components/Formik/MyTextField'
import MyAutocomplete from 'components/Formik/Autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import MySelect from 'components/Formik/MySelect'

const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   padding: 1rem 1rem 0 1rem;
   justify-content: space-between;
   align-items: center;
`

const Item = styled.div`
   height: 5rem;
`

const validationSchema = Yup.object({
   /* documento: Yup.string().required('Campo requerido'),
   numeroDocumento: Yup.string().required('Campo requerido'),
   numeroTramite: Yup.string().required('Campo requerido'),
   administrado: Yup.string().required('Campo requerido'), */
   /* nacionalidad: Yup.string().required('Campo requerido').nullable('Campo requerido'), */
   /* correo: Yup.string().required('Campo requerido').email('¡Formato no valido!'),
   telefono: Yup.string().required('Campo requerido').min(9, '¡Almenos 9 dígitos!'),
   tipoSolicitud: Yup.string().required('Campo requerido'), */
   /* tipoTramite: Yup.string().required('Campo requerido').nullable('¡Campo requerido!'), */
})

export default function Test() {

   const dispatch = useDispatch()
   const rRegistrar = useRef()
   const rLimpiar = useRef()

   const {
      tipoDocumento: { data: tipoDocumento },
      pais: { data: pais },
      tipoSolicitud: { data: tipoSolicitud },
      tipoTramite: { data: tipoTramite },
      forms: { inputValuesProcNac }
   } = useSelector(store => store)

   const optSpeedDialAction = [
      {
         icon: <Save />,
         tooltip: 'Registrar',
         handleOnClick: () => { rRegistrar.current.click() }
      }, {
         tooltip: 'Limpiar',
         icon: <DeleteForever />,
         handleOnClick: () => { rLimpiar.current.click() }
      },
   ]

   const handleSubmit = (values, meta) => {
      console.log(values)
      /* dispatch(registrarProcNac({ procNacionalizacion: values, usuario: usuario[0] })) */
   }

   return (
      <>
         <Formik
            initialValues={inputValuesProcNac}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onReset={(values, meta) => {
               console.log(values)
            }}
         >
            {
               ({ ...rest }) =>
                  (
                     <Form>
                        <Paper elevation={1} style={{ padding: 15 }}>
                           <Container>
                              <Item>
                                 <MySelect name='documento' width={12} label='Documento' opt={tipoDocumento} />
                              </Item>
                              <Item>
                                 <MyTextField type='text' name='numeroDocumento' size={12} label="Número documento" />
                              </Item>
                              <Item>
                                 <MyTextField type='text' name='numeroTramite' size={15} label="Número trámite" />
                              </Item>
                              <Item>
                                 <MyTextField type='date' name='fechaInicioTramite' size={15} label="Fecha inicio tramite" />
                              </Item>
                              <Item>
                                 <MyTextField type='text' name='administrado' size={30} label="Administrado" />
                              </Item>
                              <Item>
                                 <MyAutocomplete name='nacionalidad' label='Nacionalidad' width={20} opt={pais} {...rest} />
                              </Item>
                              <Item>
                                 <MyTextField type='text' name='distrito' size={20} label="Distrito" />
                              </Item>
                              <Item>
                                 <MyTextField type='mail' name='correo' size={25} label="Correo" />
                              </Item>
                              <Item>
                                 <MyTextField type='number' name='telefono' size={10} label="Telefono" />
                              </Item>
                              <Item>
                                 <MySelect name='tipoSolicitud' width={15} label='Tipo solicitud' opt={tipoSolicitud} />
                              </Item>
                              <Item>
                                 <MyAutocomplete name='tipoTramite' label='Tipo trámite' width={30} opt={tipoTramite} {...rest} />
                              </Item>
                              <Item style={{ width: '100%', }}>
                                 <SpeedDial direction='right' optSpeedDialAction={optSpeedDialAction} />
                              </Item>
                           </Container>
                           <Button type='submit' ref={rRegistrar} hidden />
                           <Button type='reset' ref={rLimpiar} hidden />
                        </Paper>
                     </Form>
                  )
            }
         </Formik>
      </>
   )
}