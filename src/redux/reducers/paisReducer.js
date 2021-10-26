import {
   OBTENER_PAIS_CARGANDO,
   OBTENER_PAIS_EXITO,
   OBTENER_PAIS_ERROR
} from 'redux/types/paisType'

const initialState = {
   loading: false,
   data: [],
   error: null
}

export default function paisReducer(state = initialState, { type, payload }) {
   switch (type) {
   case OBTENER_PAIS_CARGANDO:
      return { loading: true, data: [], error: null }
   case OBTENER_PAIS_EXITO:
      return { loading: false, data: payload, error: null }
   case OBTENER_PAIS_ERROR:
      return { loading: false, data: [], error: payload }
   default:
      return state
   }
}