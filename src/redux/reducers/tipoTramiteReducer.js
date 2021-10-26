import {
   OBTENER_TIPOTRAMITE_CARGANDO,
   OBTENER_TIPOTRAMITE_EXITO,
   OBTENER_TIPOTRAMITE_ERROR
} from 'redux/actions/tipoTramiteAction'

const initialState = {
   loading: false,
   data: [],
   error: null
}

export default function tipoTramiteReducer(state = initialState, { type, payload }) {
   switch (type) {
   case OBTENER_TIPOTRAMITE_CARGANDO:
      return { loading: true, data: [], error: null }
   case OBTENER_TIPOTRAMITE_EXITO:
      return { loading: false, data: payload, error: null }
   case OBTENER_TIPOTRAMITE_ERROR:
      return { loading: false, data: [], error: payload }
   default:
      return state
   }
}