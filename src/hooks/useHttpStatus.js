import { useSelector } from 'react-redux'

export default function useHttpStatus(){

   /*» STORE  */
   const { status } = useSelector(store => store.httpStatus)

   return {
      status
   }

}