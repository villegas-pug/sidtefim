import { 
   CHANGE_REFUGIADO_FILTER_OPTS,
   FIND_REFUGIADO_BY_OPTS_ERROR, 
   FIND_REFUGIADO_BY_OPTS_LOADING, 
   FIND_REFUGIADO_BY_OPTS_SUCCESS 
} from 'redux/types/refugiadoType'

const initialValues = {
   filterOptions:{
      nombres: '',
      paterno: '',
      materno: ''
   },
   loading: false,
   data: [],
   error: null
}

export default function refugiadoReducer(state = initialValues, { type, payload }){
   switch (type) {
   case FIND_REFUGIADO_BY_OPTS_LOADING:
      return { ...state, loading: true, data: [], error: null }
   case FIND_REFUGIADO_BY_OPTS_SUCCESS:
      return { ...state, loading: false, data: payload, error: null }
   case FIND_REFUGIADO_BY_OPTS_ERROR:
      return { ...state, loading: false, data: [], error: payload }
   case CHANGE_REFUGIADO_FILTER_OPTS:
      return { ...state, filterOptions: { ...state.filterOptions, ...payload } }
   default:
      return state
   }
}