import {
   SAVE_ALL_CEREMONIA_LOADING,
   SAVE_ALL_CEREMONIA_SUCCESS,
   SAVE_ALL_CEREMONIA_ERROR,
   GET_SUMARIZZE_CEREMONIA_LOADING,
   GET_SUMARIZZE_CEREMONIA_SUCCESS,
   GET_SUMARIZZE_CEREMONIA_ERROR
} from 'redux/types/ceremoniaType'
const initialState = {
   loading: false,
   data: [],
   sumarizze: [],
   error: null
}

export default function ceremoniaReducer(state = initialState, { type, payload }){
   switch (type) {
   case SAVE_ALL_CEREMONIA_LOADING:
      return { ...state, loading: true, sumarizze: [], error: null }
   case SAVE_ALL_CEREMONIA_SUCCESS:
      return { ...state, loading: false, sumarizze: payload, error: null }
   case SAVE_ALL_CEREMONIA_ERROR:
      return { ...state, loading: false, sumarizze: [], error: payload }
   case GET_SUMARIZZE_CEREMONIA_LOADING:
      return { ...state, loading: true, sumarizze: [], error: null }
   case GET_SUMARIZZE_CEREMONIA_SUCCESS:
      return { ...state, loading: false, sumarizze: payload, error: null }
   case GET_SUMARIZZE_CEREMONIA_ERROR:
      return { ...state, loading: false, sumarizze: [], error: payload }
   default:
      return state
   }   

}