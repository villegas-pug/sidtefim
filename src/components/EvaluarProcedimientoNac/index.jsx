import React, { useState } from 'react'
import Table from 'components/Table'
import styled from 'styled-components'
import { Button, IconButton, Tooltip } from '@material-ui/core'
import { Edit, Drafts, Update, ArrowBack, ArrowForward } from '@material-ui/icons'
import ContentTitle from 'components/Styled/ContentTitle'
import RevisarRequisito from 'components/RevisaRequisito'
import Slide from 'react-reveal/Slide'

const ActionBar = styled.div`
   display: flex;
   padding: 0.25rem;
`

export default function VerificaRequisito() {

   /*» HOOK'S  */
   const [openRevisarRequisto, setOpenRevisarRequisto] = useState(false)

   /*» CICLO DE VIDA...  */

   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = () => ({
      columns: [
         { title: 'Nro', field: 'idProcNac', type: 'number', width: 10 },
         { title: 'Registro', field: 'fechaRegistro', type: 'date', width: 15 },
         { title: 'Operador', field: 'operador', width: 350, render: ({ operador: { nombre } }) => nombre },
      ],
      data: []
   })

   /*» ARGUMENT ◄► `configTable`  */
   const configTable = () => ({
      actions: [{ icon: 'Editar' }, { icon: 'Exportar Excel' }],
      components: ({ action: { icon } }) => {
         if (icon === 'Editar')
            return (
               <Tooltip
                  title='Editar'
                  arrow
               >
                  <IconButton
                     onClick={() => { }}
                  >
                     <Edit />
                  </IconButton>
               </Tooltip>
            )
      }
   })

   const handleOpenRevisarRequisito = () => setOpenRevisarRequisto(prevState => !prevState)

   return (
      <>
         {
            !openRevisarRequisto ?
               (
                  <Slide left>
                     <ContentTitle title='EN PROYECTO DE EVALUACIÓN' />
                     <ActionBar>
                        <Button size='large' variant='outlined' ><Drafts />Recibir todos</Button>
                        <Button size='large' variant='outlined' ><Update />Refrescar</Button>
                        {/*-> Test: `Componete para revisar requisitos...` */}
                        <Button
                           style={{ marginLeft: 'auto' }}
                           size='large' variant='text'
                           onClick={() => handleOpenRevisarRequisito()}
                        >
                           <ArrowForward />
                           Ir a revisar requisitos
                        </Button>
                     </ActionBar>
                     <Table configTable={configTable} dataTable={dataTable} maxBodyHeight={700} />
                  </Slide>
               )
               : (

                  <Slide right>
                     <>
                        <ContentTitle title='REVISAR REQUISITOS' />
                        <ActionBar>
                           <Button
                              variant='outlined'
                              color='primary'
                              onClick={() => setOpenRevisarRequisto(false)}
                           >
                              <ArrowBack />
                           REGRESAR
                           </Button>
                        </ActionBar>
                        <RevisarRequisito />
                     </>
                  </Slide>
               )
         }
      </>
   )
}