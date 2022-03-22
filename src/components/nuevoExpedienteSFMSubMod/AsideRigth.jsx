import React, { useEffect, useMemo } from 'react'

import {
   Box,
   IconButton,
   Tooltip
} from '@material-ui/core'
import { 
   DeleteForever,
   Download
} from '@mui/icons-material'

import MyTable from 'components/Table'

import useFiscalizacionPosterior from 'hooks/useFiscalizacionPosterior'

export const AsideRigth = () => {

   /*» CUSTOM HOOK'S  */
   /* const classes = useStyle() */
   const { 
      metadataFilesSolicitudDb,
      handleFindAllMetadataOfFiles
   } = useFiscalizacionPosterior()

   /*» EFFECT'S  */
   useEffect(() => {
      handleFindAllMetadataOfFiles()
   }, [])
   

   /*» DEPENDENCY'S  */
   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Fecha Registro', field: 'fechaRegistro', type: 'date', width: 100 },
         { title: 'Archivo', field: 'fileName', width: 350 },
         { title: 'Total Expedientes', field: 'contar', type: 'number', width: 30 }
      ],
      data: metadataFilesSolicitudDb
   }),[metadataFilesSolicitudDb])

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Descargar' }, { icon: 'Eliminar' } ],
      components: ({ action: { icon }, data }) => {
         if (icon === 'Descargar')
            return (
               <Tooltip
                  title='Descargar'
                  arrow
               >
                  <IconButton
                     onClick={() => { console.log('Descargando...', data) }}
                  >
                     <Download />
                  </IconButton>
               </Tooltip>)
         else if(icon === 'Eliminar'){
            return (
               <Tooltip
                  title='Eliminar'
                  arrow
               >
                  <IconButton
                     onClick={() => { console.log('Descargando...') }}
                  >
                     <DeleteForever />
                  </IconButton>
               </Tooltip>)
         }
      }
   }), [metadataFilesSolicitudDb])

   return(
      <Box
         height={170}
         mt={0}
      >
         <MyTable 
            dataTable={dataTable} 
            configTable={configTable} 
            pageSize={7}
         />
      </Box>
   )
}