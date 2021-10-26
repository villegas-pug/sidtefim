import { 
   CHANGE_PREINSCRIPCION_FILTER_OPTS,
   FIND_PREINSCRIPCION_BY_OPTS_ERROR, 
   FIND_PREINSCRIPCION_BY_OPTS_LOADING, 
   FIND_PREINSCRIPCION_BY_OPTS_SUCCESS 
} from 'redux/types/preInscripcionType'

const initialValues = {
   filterOptions:{
      nombres: '',
      apePat: '',
      apeMat: '',
      nroDoc: '',
   },
   loading: false,
   data: [],
   error: null
}

export default function preInscripcionReducer(state = initialValues, { type, payload }){
   switch (type) {
   case FIND_PREINSCRIPCION_BY_OPTS_LOADING:
      return { ...state, loading: true, data: [], error: null }
   case FIND_PREINSCRIPCION_BY_OPTS_SUCCESS:
      return { ...state, loading: false, data: payload, error: null }
   case FIND_PREINSCRIPCION_BY_OPTS_ERROR:
      return { ...state, loading: false, data: [], error: payload }
   case CHANGE_PREINSCRIPCION_FILTER_OPTS:
      return { ...state, filterOptions: { ...state.filterOptions, ...payload } }
   default:
      return state
   }
}