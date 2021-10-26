import {
   OBTENER_PAIS_CARGANDO,
   OBTENER_PAIS_EXITO,
   OBTENER_PAIS_ERROR,
} from 'redux/types/paisType'

import {
   SUCCESS,
   WARNING,
   ERROR,
} from 'constants/levelLog'

import { api } from 'config/axios'

import { AUTHORIZATION } from 'constants/localStorage'

const obtenerPaisCargando = () => ({ type: OBTENER_PAIS_CARGANDO })
const obtenerPaisExito = (payload) => ({ type: OBTENER_PAIS_EXITO, payload })
const obtenerPaisError = (payload) => ({ type: OBTENER_PAIS_ERROR, payload })

export const obtenerPais = () => async (dispatch, getStore) => {
   try {
      dispatch(obtenerPaisCargando())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-pais/findAll',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(obtenerPaisExito(data))
         break
      case WARNING:
         dispatch(obtenerPaisError(message))
         break
      case ERROR:
         dispatch(obtenerPaisError(message))
         break
      }
   } catch (err) {
      dispatch(obtenerPaisError(err))
   }
}