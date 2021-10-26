import { api } from 'config/axios'
import {
   SUCCESS,
   WARNING,
   ERROR,
} from 'constants/levelLog'
export const OBTENER_TIPOTRAMITE_CARGANDO = 'OBTENER_TIPOTRAMITE_CARGANDO'
export const OBTENER_TIPOTRAMITE_EXITO = 'OBTENER_TIPOTRAMITE_EXITO'
export const OBTENER_TIPOTRAMITE_ERROR = 'OBTENER_TIPOTRAMITE_ERROR'

const obtenerTipoTramiteCargando = () => ({ type: OBTENER_TIPOTRAMITE_CARGANDO })
const obtenerTipoTramiteExito = (payload) => ({ type: OBTENER_TIPOTRAMITE_EXITO, payload })
const obtenerTipoTramiteError = (payload) => ({ type: OBTENER_TIPOTRAMITE_ERROR, payload })

export const obtenerTipoTramite = () => async (dispatch) => {
   dispatch(obtenerTipoTramiteCargando())
   const { data: { levelLog, data, message } } = await api.get('/microservicio-tipotramite/findAll')
   switch (levelLog) {
   case SUCCESS:
      dispatch(obtenerTipoTramiteExito(data))
      break
   case WARNING:
      dispatch(obtenerTipoTramiteError(message))
      break
   case ERROR:
      dispatch(obtenerTipoTramiteError(message))
      break
   }
}