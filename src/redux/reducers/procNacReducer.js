import {
   GUARDAR_PROCNAC_CARGANDO,
   GUARDAR_PROCNAC_EXITO,
   GUARDAR_PROCNAC_ERROR,
   OBTENER_PROCNAC_CARGANDO,
   OBTENER_PROCNAC_EXITO,
   OBTENER_PROCNAC_ERROR,
} from 'redux/actions/procNacAction'

const initialState = {
   loading: false,
   data: [],
   error: null
}

export default function procNacReducer(state = initialState, { type, payload }) {
   switch (type) {
   case GUARDAR_PROCNAC_CARGANDO:
      return { loading: true, data: [], error: null }
   case GUARDAR_PROCNAC_EXITO:
      return { loading: false, data: payload, error: null }
   case GUARDAR_PROCNAC_ERROR:
      return { loading: false, data: [], error: payload }
   case OBTENER_PROCNAC_CARGANDO:
      return { loading: true, data: [], error: null }
   case OBTENER_PROCNAC_EXITO:
      return { loading: false, data: payload, error: null }
   case OBTENER_PROCNAC_ERROR:
      return { loading: false, data: [], error: payload }
   default:
      return state
   }
}