import { useSelector } from 'react-redux'


export default function useTipoInfraccion() {

   const { tipoInfraccion: { data: tipoInfraccionDb } } = useSelector(store => store)

   return {
      tipoInfraccionDb
   }
}