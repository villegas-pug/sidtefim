import { 
   DOWNLOAD_PROC_BY_FILTER_ERROR,
   DOWNLOAD_PROC_BY_FILTER_LOADING,
   DOWNLOAD_PROC_BY_FILTER_SUCCESS,
   LIST_PROC_NAC_P_ERROR, 
   LIST_PROC_NAC_P_LOADING, 
   LIST_PROC_NAC_P_SUCCESS 
} from 'redux/types/nacionalizacionType'

const initialState = {
   loading: false,
   data: [],
   procPNacDb: [],
   error: null
}

export default function nacionaliacionReducer(state = initialState, { type, payload }){
   switch (type) {
   case LIST_PROC_NAC_P_LOADING:
      return { ...state, loading: true, procPNacDb: [], error: null }
   case LIST_PROC_NAC_P_SUCCESS:
      return { ...state, loading: false, procPNacDb: payload, error: null }
   case LIST_PROC_NAC_P_ERROR:
      return { ...state, loading: false, procPNacDb: [], error: payload }
   case DOWNLOAD_PROC_BY_FILTER_LOADING:
      return { ...state, loading: true }
   case DOWNLOAD_PROC_BY_FILTER_SUCCESS:
      return { ...state, loading: false }
   case DOWNLOAD_PROC_BY_FILTER_ERROR:
      return { ...state, loading: false, error: payload }
   default:
      return state
   }
}