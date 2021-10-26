import React, { useEffect } from 'react'
import { modules } from 'react-export-excel'
import useOperativo from 'hooks/useOperativo'
import ModalLoader from 'components/Styled/ModalLoader'

const { ExcelFile, ExcelSheet, ExcelColumn } = modules

export default function OperativoToExcel(){
   /*» HOOK'S */
   /*...  */

   /*» CUSTOM HOOk'S  */
   const { 
      opeByCustomFilterToExcelDb,
      opeByCustomFilterToExcelLoading,
      handleResetOpeByFilterToExcel
   } = useOperativo()

   /*» DEPENDENCY'S  */
   /*...  */
   
   /*» EFFECT'S */
   useEffect(() => () => { handleResetOpeByFilterToExcel() }, [])/*» Cleanup...  */
   
   /*» HANDLER'S  */
   /*...  */
   
   /*» Renderizado condicional...  */
   if(opeByCustomFilterToExcelLoading) return <ModalLoader />
   if(opeByCustomFilterToExcelDb.length === 0) return null

   return (
      <h1>
         <ExcelFile 
            filename='rpt_operativo' 
            hideElement={true}
         >

            <ExcelSheet
               name='rpt'
               data={opeByCustomFilterToExcelDb}
            >
               <ExcelColumn label='Número Operativo' value='numeroOperativo' />
               <ExcelColumn label='Número Informe' value='numeroInforme' />
               <ExcelColumn label='Distrito' value='distrito' />
               <ExcelColumn label='Fecha Operativo' value='fechaOperativo' />
               <ExcelColumn label='Tipo Operativo' value='tipoOperativo' />
               <ExcelColumn label='Modalidad Operativo' value='modalidadOperativo' />
               <ExcelColumn label='Ciudadano' value='nombres' />
               <ExcelColumn label='Sexo' value='sexo' />
               <ExcelColumn label='Tipo Documento' value='tipoDocumento' />
               <ExcelColumn label='Número Documento' value='numeroDocumento' />
               <ExcelColumn label='Nacionalidad' value='nacionalidad' />
               <ExcelColumn label='Tipo Infracción' value='tipoInfraccion' />
               <ExcelColumn label='Infraccion' value='infraccion' />
               <ExcelColumn label='Situacion Migratoria' value='situacionMigratoria' />
               <ExcelColumn label='¿Disposicion PNP?' value='disposicionPNP' />
               <ExcelColumn label='¿Refugiado?' value='refugiado' />
               <ExcelColumn label='Fecha Registro' value='fechaRegistro' />
               <ExcelColumn label='Observaciones' value='observaciones' />            
            </ExcelSheet>
         </ExcelFile>
      </h1>
   )
}