import { useSelector, useDispatch } from 'react-redux'

import { listDistrito } from 'redux/actions/distritoActions'

export default function useDistrito() {

   /*» HOOK'S STORE  */
   const dispatch = useDispatch()
   const { distrito: { data: distritoDb } } = useSelector(store => store)

   /*» HANDLER'S  */
   const handleListDistrito = () => { dispatch(listDistrito()) }

   return {
      distritoDb,

      handleListDistrito
   }
}