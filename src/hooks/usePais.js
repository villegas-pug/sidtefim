import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { obtenerPais } from 'redux/actions/paisAction'

export default function useDistrito() {

   /*» HOOK'S STORE  */
   const dispatch = useDispatch()
   const { pais: { data: paisDb } } = useSelector(store => store)

   /*» HANDLER'S  */
   const handleListPais = () => { dispatch(obtenerPais()) }

   /*» DEP'S  */
   const nacionalidadDb = useMemo(() => paisDb.map(({nacionalidad}) => nacionalidad),[paisDb])

   return {
      paisDb,
      nacionalidadDb,

      handleListPais
   }
}