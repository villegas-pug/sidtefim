import { useSelector } from 'react-redux'


export default function useTipoDocumento() {

   const { tipoDocumento: { data: tipoDocumentoDb } } = useSelector(store => store)

   return {
      tipoDocumentoDb
   }
}