import React, { useEffect, useMemo } from 'react'
import Table from 'components/Table'
import {
   Tooltip,
   Avatar,
   Card,
   CardHeader,
   CardContent
} from '@material-ui/core'
import { Update, DeleteForever } from '@material-ui/icons'
import styled from 'styled-components'
import SpeedDial from 'components/SpeedDial'
import { Button as ButtonAntd } from 'antd'
import { EyeFilled, EditFilled, DeleteFilled } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { optEtapaProcNac } from 'constants/optEtapaProcNac'
import { optEstadoProcNac } from 'constants/optEstadoProcNac'
import useModal from 'hooks/useModal'
import ProgressProcNac from 'components/ProgressProcNac'
import { actualizarInpuValuesProcNac } from 'redux/actions/formsAction'
import FrmProcNac from 'components/Form/FrmProcNac'
import _ from 'lodash'

const Container = styled.div`
   margin-top: .5rem;   
`

const optSpeedDialAction = [
   {
      icon: <Update />,
      tooltip: 'Refrescar',
      handleOnClick: () => { alert('Test de prueba!') }
   }, {
      icon: <DeleteForever />,
      tooltip: 'Limpiar',
      handleOnClick: () => { alert('Test de prueba!') }
   },
]

export default function AsignarProcedimientoNac() {
   /*-> STORE...   */
   const { data: procNacDb } = useSelector(store => store.procNacionalizacion)
   const dispatch = useDispatch()

   /*-> HOOK'S...  */
   const [contentInfoModal] = useModal({ title: '» DETALLE DEL TRÁMITE ░', width: 1050 })
   const [contentFrmModal] = useModal({ type: 'success', title: '» ACTUALIZAR DATOS DEL TRÁMITE ░', width: 1600 })

   /*-> EFFEC'T  */
   useEffect(() => { }, [])

   /*-> Configuración la tabla... */
   /*----------------------------------------------------------------------*/
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Detalle' }, { icon: 'Editar' }, { icon: 'Eliminar' }],
      components: ({ action: { icon }, data: rowData }) => {
         if (icon === 'Detalle')
            return (
               <Tooltip title='Ver detalle' arrow
               >
                  <ButtonAntd
                     type='ghost'
                     shape='circle'
                     size='middle'
                     icon={<EyeFilled />}
                     onClick={() => {
                        /*» HOOK-MODAL... */
                        contentInfoModal(
                           <>
                              <Card>
                                 <CardHeader
                                    title='ESTADO TRÁMITE'
                                    subheader={_.find(optEstadoProcNac, { id: rowData.estado }).descripcion}
                                    avatar={
                                       <Avatar>{_.find(optEstadoProcNac, { id: rowData.estado }).Icono}</Avatar>
                                    }
                                 />
                                 <CardContent>
                                    <ProgressProcNac
                                       current={_.find(optEtapaProcNac, { etapa: rowData.etapaActualProcNac.descripcion }).id}
                                    />
                                 </CardContent>
                              </Card>
                           </>
                        )
                     }}
                  />
               </Tooltip>)
         else if (icon === 'Editar')
            return (
               <Tooltip title='Editar' arrow>
                  <ButtonAntd
                     type='ghost'
                     shape='circle'
                     size='middle'
                     icon={<EditFilled />}
                     onClick={() => {
                        dispatch(actualizarInpuValuesProcNac(rowData))
                        contentFrmModal(<FrmProcNac />)
                     }}
                  />
               </Tooltip>
            )
         else if (icon === 'Eliminar')
            return (
               <Tooltip title='Eliminar' arrow >
                  <ButtonAntd
                     type='ghost'
                     shape='circle'
                     size='middle'
                     icon={<DeleteFilled />}
                     onClick={() => console.log(rowData)}
                  />
               </Tooltip>
            )
      }
   }), [procNacDb])

   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Nro', field: 'idProcNac', type: 'number', width: 10 },
         { title: 'Tipo documento', field: 'tipoDocumento', width: 25 },
         { title: 'Número documento', field: 'documento', width: 15 },
         { title: 'Número trámite', field: 'numeroTramite', width: 20 },
         { title: 'Administrado', field: 'administrado', width: 50 },
         { title: 'Nacionalidad', field: 'nacionalidad', width: 30, render: ({ nacionalidad: { nacionalidad } }) => nacionalidad },
         { title: 'Tipo solicitud', field: 'tipoSolicitud', width: 20 },
         { title: 'Tipo trámite', field: 'tipoTramite', width: 50, render: ({ tipoTramite: { descripcion } }) => descripcion },
         { title: 'Evaluador', field: 'usrEvaluador', width: 25, render: ({ evaluador }) => evaluador?.nombre },
         { title: 'Asignación', field: 'fechaAsignacionTramite', type: 'date', width: 15 },
         {
            title: 'Completo',
            field: 'etapaActualProcNac',
            width: 15,
            render: ({ etapaActualProcNac: { descripcion } }) => _.find(optEtapaProcNac, { etapa: descripcion }).progress
         },
      ],
      data: procNacDb
   }), [procNacDb])

   /*---------------------------------------------------------------------------------------------*/
   return (
      <Container>
         <Table dataTable={dataTable} configTable={configTable} />
         <div style={{ marginTop: 5 }}>
            <SpeedDial direction='right' optSpeedDialAction={optSpeedDialAction} />
         </div>
      </Container>
   )
}