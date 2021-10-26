import React from 'react'
import Table from 'components/Table'
import {
   IconButton,
   Tooltip,
} from '@material-ui/core'
import {
   OpenInNew,
   Spellcheck,
   Block
} from '@material-ui/icons'

export default function EvaluarNormativa() {

   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = () => ({
      columns: [
         { title: 'Nro', field: 'idProcNac', type: 'number', width: 10 },
         { title: 'Registro', field: 'fechaRegistro', type: 'date', width: 15 },
         { title: 'Operador', field: 'operador', width: 350, render: ({ operador: { nombre } }) => nombre },
      ],
      data: []
   })

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = () => ({
      actions: [{ icon: 'Ver' }, { icon: 'Aprobar' }, { icon: 'Denegar' }],
      /* components: ({ action: { icon }, data }) => { */
      components: ({ action: { icon }}) => {
         switch (icon) {
         case 'Ver':
            return (
               <Tooltip
                  title={icon}
                  arrow
               >
                  <IconButton
                     onClick={() => { }}
                  >
                     <OpenInNew />
                  </IconButton>
               </Tooltip>
            )
         case 'Aprobar':
            return (
               <Tooltip
                  title={icon}
                  arrow
               >
                  <IconButton
                     onClick={() => { }}
                  >
                     <Block />
                  </IconButton>
               </Tooltip>
            )
         case 'Denegar':
            return (
               <Tooltip
                  title={icon}
                  arrow
               >
                  <IconButton
                     onClick={() => { }}
                  >
                     <Spellcheck />
                  </IconButton>
               </Tooltip>
            )
         default:
            break
         }
      }
   })

   return (
      <>
         <div style={{ width: '100%' }}>
            <Table dataTable={dataTable} configTable={configTable} />
         </div>
      </>
   )
}