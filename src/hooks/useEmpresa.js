import { useSelector, useDispatch } from 'react-redux'

import { listEmpresa } from 'redux/actions/empresaAction'

export default function useEmpresa() {

   /*» HOOK'S STORE  */
   const dispatch = useDispatch()
   const { empresa: { loading, data: entidadSolicitaOpeDb } } = useSelector(store => store)

   /*» HANDLER'S  */
   const handleListEmpresa = () => { dispatch(listEmpresa()) }

   return {
      loading,
      entidadSolicitaOpeDb,
      handleListEmpresa
   }
}