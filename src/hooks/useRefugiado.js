import { useSelector, useDispatch } from 'react-redux'
import { 
   findRefugiadoByOpts,
   changeFilterOptsRefugiado
} from 'redux/actions/refugiadoAction'

import useCurrentProcRendered from 'hooks/useCurrentProcRendered'
import useAuth from './useAuth'
import { READ } from 'constants/crud'

export default function useRefugiado(){

   /*» CUSTOM HOOK'S  */
   const { currentProcRendered: procedimiento } = useCurrentProcRendered()
   const { userCredentials: usuario } = useAuth()

   /*» STORE ...  */
   const { 
      filterOptions, 
      loading: loadingRefugiadoDb, 
      data: refugiadoDb  
   } = useSelector(store => store.refugiado)
   const dispatch = useDispatch()

   /*» HANDLER'S  */
   const handleFindRefugiadoByOpts = (opts) => { 
      dispatch(findRefugiadoByOpts({
         refugiado: opts,
         consultaData: {
            procedimiento,
            usuario,
            tipoConsulta: READ
         }
      })) 
   }
   const handleChangeFilterOptions = ({ target: { name, value } }) => { 
      dispatch(changeFilterOptsRefugiado({[name]: value}))
   }

   return {
      loadingRefugiadoDb,
      refugiadoDb,
      filterOptions,

      handleFindRefugiadoByOpts,
      handleChangeFilterOptions,
   }

}