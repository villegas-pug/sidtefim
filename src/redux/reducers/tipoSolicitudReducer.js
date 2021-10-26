import {
   OBTENER_TIPOSOLICITUD_CARGANDO,
   OBTENER_TIPOSOLICITUD_EXITO,
   OBTENER_TIPOSOLICITUD_ERROR
} from 'redux/actions/tipoSolicitudAction'

const initialState = {
   loading: false,
   data: [
      { idTipoSolicitud: 'NAC', descripcion: 'Nacionalización' },
   ],
   error: null
}

export default function tipoSolicitudReducer(state = initialState, { type, payload }) {
   switch (type) {
   case OBTENER_TIPOSOLICITUD_CARGANDO:
      return { loading: true, data: [], error: null }
   case OBTENER_TIPOSOLICITUD_EXITO:
      return { loading: false, data: payload, error: null }
   case OBTENER_TIPOSOLICITUD_ERROR:
      return { loading: false, data: [], error: payload }
   default:
      return state
   }
}