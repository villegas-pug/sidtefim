import {
   OBTENER_INTERPOL_CARGANDO,
   OBTENER_INTERPOL_EXITO,
   OBTENER_INTERPOL_ERROR,
   SAVE_ONE_INTERPOL_LOADING,
   SAVE_ONE_INTERPOL_SUCCESS,
   SAVE_ONE_INTERPOL_ERROR,
   SAVE_ALL_INTERPOL_LOADING,
   SAVE_ALL_INTERPOL_SUCCESS,
   SAVE_ALL_INTERPOL_ERROR,
   GET_SCREENSHOT_INTERPOL_LOADING,
   GET_SCREENSHOT_INTERPOL_SUCCESS,
   GET_SCREENSHOT_INTERPOL_ERROR
} from 'redux/types/interpolType'

const initialValues = {
   loading: false,
   data: [],
   error: null,
}

export default function interpolReducer(state = initialValues, { type, payload }) {
   switch (type) {
   case OBTENER_INTERPOL_CARGANDO:
      return { ...state, loading: true, data: [], error: null }
   case OBTENER_INTERPOL_EXITO:
      return { ...state, loading: false, data: payload, error: null }
   case OBTENER_INTERPOL_ERROR:
      return { ...state, loading: false, data: [], error: payload }
   case SAVE_ALL_INTERPOL_LOADING:
      return {...state, loading: true, data: [], error: null}
   case SAVE_ALL_INTERPOL_SUCCESS:
      return {...state, loading: false, data: payload, error: null}
   case SAVE_ALL_INTERPOL_ERROR:
      return {...state, loading: false, data: [], error: payload}
   case SAVE_ONE_INTERPOL_LOADING:
      return { ...state, loading: true, error: null }
   case SAVE_ONE_INTERPOL_SUCCESS:
      return { ...state, loading: false, error: null }
   case SAVE_ONE_INTERPOL_ERROR:
      return { ...state, loading: false, error: payload }
   case GET_SCREENSHOT_INTERPOL_LOADING:
      return { ...state, loading: true, error: null }
   case GET_SCREENSHOT_INTERPOL_SUCCESS:
      return { ...state, loading: false, error: null }
   case GET_SCREENSHOT_INTERPOL_ERROR:
      return { ...state, loading: false, error: payload }
   default:
      return state
   }
}