import { api } from 'config/axios'
import {
   SUCCESS,
   WARNING,
   ERROR
} from 'constants/levelLog'
import Noty from 'helpers/noty'

/*» CREATE */
export const GUARDAR_PROCNAC_CARGANDO = 'GUARDAR_PROCNAC_CARGANDO '
export const GUARDAR_PROCNAC_EXITO = 'GUARDAR_PROCNAC_EXITO'
export const GUARDAR_PROCNAC_ERROR = 'GUARDAR_PROCNAC_ERROR'

const guardarProcNacCargando = () => ({ type: GUARDAR_PROCNAC_CARGANDO })
const guardarProcNacExito = (payload) => ({ type: GUARDAR_PROCNAC_EXITO, payload })
const guardarProcNacError = (payload) => ({ type: GUARDAR_PROCNAC_ERROR, payload })

export const guardarProcNac = (payload) => async (dispatch) => {
   dispatch(guardarProcNacCargando())
   const { data: { levelLog, data, message } } = await api({
      method: 'POST',
      url: '/microservicio-procnacionalizacion/save',
      data: payload,
   })

   switch (levelLog) {
   case SUCCESS:
      dispatch(guardarProcNacExito(data))
      Noty(SUCCESS, message)
      break
   case WARNING:
      dispatch(guardarProcNacError(message))
      Noty(WARNING, message)
      break
   case ERROR:
      dispatch(guardarProcNacError(message))
      Noty(ERROR, message)
      break
   }
}

/*» READ */
export const OBTENER_PROCNAC_CARGANDO = 'OBTENER_PROCNAC_CARGANDO '
export const OBTENER_PROCNAC_EXITO = 'OBTENER_PROCNAC_EXITO'
export const OBTENER_PROCNAC_ERROR = 'OBTENER_PROCNAC_ERROR'

const obtenerProcNacCargando = () => ({ type: OBTENER_PROCNAC_CARGANDO })
const obtenerProcNacExito = (payload) => ({ type: OBTENER_PROCNAC_EXITO, payload })
const obtenerProcNacError = (payload) => ({ type: OBTENER_PROCNAC_ERROR, payload })

export const obtenerProcNac = () => async (dispatch) => {
   dispatch(obtenerProcNacCargando())
   const { data: { levelLog, data, message } } = await api.get('/microservicio-procnacionalizacion/findAll')
   switch (levelLog) {
   case SUCCESS:
      dispatch(obtenerProcNacExito(data))
      break
   case WARNING:
      dispatch(obtenerProcNacError(message))
      break
   case ERROR:
      dispatch(obtenerProcNacError(message))
      break
   }
}