import { useSelector, useDispatch } from 'react-redux'
import { 
   findPreInscripcionByOpts,
   changeFilterOptsPreInscripcion
} from 'redux/actions/preInscripcionAction'

export default function usePreInscripcion(){

   /*» STORE ...  */
   const { 
      filterOptions, 
      loading: loadingPreInscripcionDb, 
      data: preInscripcionDb  
   } = useSelector(store => store.preInscripcion)
   const dispatch = useDispatch()

   /*» HANDLER'S  */
   const handleFindPreInscripcionByOpts = (opts) => { dispatch(findPreInscripcionByOpts(opts)) }
   const handleChangeFilterOptions = ({ target: { name, value } }) => { 
      dispatch(changeFilterOptsPreInscripcion({[name]: value}))
   }

   return {
      loadingPreInscripcionDb,
      preInscripcionDb,
      filterOptions,

      handleFindPreInscripcionByOpts,
      handleChangeFilterOptions,
   }

}