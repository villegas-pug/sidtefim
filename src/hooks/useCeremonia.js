import { useSelector, useDispatch } from 'react-redux'
import convertBlob from 'helpers/blob'
import { 
   saveAllCeremonia,
   getSumarizzeCeremonia
} from 'redux/actions/ceremoniaActions'

export default function useCeremonia(){

   /*» HOOK'S - STORE  */
   const dispatch = useDispatch()
   const { 
      loading: loadingCeremoniaDb, 
      sumarizze: sumarizzeCeremoniaDb, 
   } = useSelector(store => store.ceremonia)

   /*» HANDLER'S ... */
   const handleSaveAllCeremonia = (fechaCeremonia, file) => {
      const formData = new FormData()
      formData.append('ceremonia', convertBlob(fechaCeremonia))
      formData.append('file', file)
      dispatch(saveAllCeremonia(formData))
   }
   const handleGetSumarizzeCeremonia = () => dispatch(getSumarizzeCeremonia())

   return {
      loadingCeremoniaDb,
      sumarizzeCeremoniaDb,

      handleSaveAllCeremonia,
      handleGetSumarizzeCeremonia
   }

}