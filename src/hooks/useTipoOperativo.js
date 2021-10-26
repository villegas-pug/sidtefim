import { useSelector } from 'react-redux'


export default function useTipoOperativo() {

   const { tipoOperativo: { data: tipoOpertativoDb } } = useSelector(store => store)

   return {
      tipoOpertativoDb
   }
}