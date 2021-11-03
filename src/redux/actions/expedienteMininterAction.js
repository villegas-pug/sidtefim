import { api } from 'config/axios'
import { 
   DELETE_DET_EXP_MININTER_ERROR,
   DELETE_DET_EXP_MININTER_LOADING,
   DELETE_DET_EXP_MININTER_SUCCESS,
   FIND_ALL_UBICACION_EXP_ERROR,
   FIND_ALL_UBICACION_EXP_LOADING,
   FIND_ALL_UBICACION_EXP_SUCCESS,
   FIND_BY_NUMERO_EXPEDIENTE_ERROR,
   FIND_BY_NUMERO_EXPEDIENTE_LOADING, 
   FIND_BY_NUMERO_EXPEDIENTE_SUCCESS, 
   FIND_BY_NUMERO_EXPEDIENTE_WARNING,
   FIND_EXP_MININTER_BY_UBICACION_ERROR,
   FIND_EXP_MININTER_BY_UBICACION_LOADING,
   FIND_EXP_MININTER_BY_UBICACION_SUCCESS,
   SAVE_DET_EXP_MININTER_ERROR,
   SAVE_DET_EXP_MININTER_LOADING,
   SAVE_DET_EXP_MININTER_SUCCESS,
   SAVE_EXP_MININTER_ERROR,
   SAVE_EXP_MININTER_LOADING,
   SAVE_EXP_MININTER_SUCCESS
} from 'redux/types/expedienteMininterType'
import fileDownload from 'js-file-download'

import { AUTHORIZATION } from 'constants/localStorage'
import { SUCCESS, WARNING, ERROR } from 'constants/levelLog'

import { currentHttpStatus } from './httpStatusAction'
import Noty from 'helpers/noty'
import { httpStatus } from 'constants/httpStatus'
import { MESSAGGE_WARNING_EMPTY } from 'constants/messages'

const findByNumeroExpedienteLoading = () => ({ type: FIND_BY_NUMERO_EXPEDIENTE_LOADING })
const findByNumeroExpedienteSuccess = (payload) => ({ type: FIND_BY_NUMERO_EXPEDIENTE_SUCCESS, payload })
const findByNumeroExpedienteWarning = (payload) => ({ type: FIND_BY_NUMERO_EXPEDIENTE_WARNING, payload })
const findByNumeroExpedienteError = (payload) => ({ type: FIND_BY_NUMERO_EXPEDIENTE_ERROR, payload })

const findAllUbicacionMininterLoading = () => ({ type: FIND_ALL_UBICACION_EXP_LOADING })
const findAllUbicacionMininterSuccess = (payload) => ({ type: FIND_ALL_UBICACION_EXP_SUCCESS, payload })
const findAllUbicacionMininterError = (payload) => ({ type: FIND_ALL_UBICACION_EXP_ERROR, payload })

const saveDetExpMininterLoading = () => ({ type: SAVE_DET_EXP_MININTER_LOADING })
const saveDetExpMininterSuccess = (payload) => ({ type: SAVE_DET_EXP_MININTER_SUCCESS, payload })
const saveDetExpMininterError = (payload) => ({ type: SAVE_DET_EXP_MININTER_ERROR, payload })

const deleteDetExpMininterLoading = () => ({ type: DELETE_DET_EXP_MININTER_LOADING })
const deleteDetExpMininterSuccess = (payload) => ({ type: DELETE_DET_EXP_MININTER_SUCCESS, payload })
const deleteDetExpMininterError = (payload) => ({ type: DELETE_DET_EXP_MININTER_ERROR, payload })

const saveExpedienteMininterLoading = () => ({ type: SAVE_EXP_MININTER_LOADING })
const saveExpedienteMininterSuccess = (payload) => ({ type: SAVE_EXP_MININTER_SUCCESS, payload })
const saveExpedienteMininterError = (payload) => ({ type: SAVE_EXP_MININTER_ERROR, payload })

const findByUbicacionLoading = () => ({ type: FIND_EXP_MININTER_BY_UBICACION_LOADING })
const findByUbicacionSuccess = () => ({ type: FIND_EXP_MININTER_BY_UBICACION_SUCCESS })
const findByUbicacionError = (payload) => ({ type: FIND_EXP_MININTER_BY_UBICACION_ERROR, payload })

export const findByNumeroExpediente = (numeroTramite) => async (dispatch, getStore) => {
   dispatch(findByNumeroExpedienteLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: `/microservicio-nacionalizacion/findByNumeroTramite/${numeroTramite}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(findByNumeroExpedienteSuccess(data))
         break
      case WARNING:
         dispatch(findByNumeroExpedienteWarning(message))
         break
      case ERROR:
         dispatch(findByNumeroExpedienteError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const findAllUbicacionMininter = () => async (dispatch, getStore) => {
   dispatch(findAllUbicacionMininterLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-nacionalizacion/findAllUbicacionMininter',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(findAllUbicacionMininterSuccess(data))
         break
      case WARNING:
         dispatch(findAllUbicacionMininterError(message))
         break
      case ERROR:
         dispatch(findAllUbicacionMininterError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const saveDetExpMininter = (detExpedienteMininter) => async (dispatch, getStore) => {
   dispatch(saveDetExpMininterLoading())
   try {
      const { 
         usuario: { token }, 
         expedienteMininter: { data: { nacionalizacion: { numeroTramite } } } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: `/microservicio-nacionalizacion/saveDetExpedienteMininter/${numeroTramite}`,
         data: detExpedienteMininter,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(saveDetExpMininterSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveDetExpMininterError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveDetExpMininterError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const deleteDetExpMininter = (detExpedienteMininter) => async (dispatch, getStore) => {
   dispatch(deleteDetExpMininterLoading())
   try {
      const { 
         usuario: { token }, 
         expedienteMininter: { data: { nacionalizacion: { numeroTramite } } } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'DELETE',
         url: `/microservicio-nacionalizacion/removeDetExpedienteMininter/${numeroTramite}`,
         data: detExpedienteMininter,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(deleteDetExpMininterSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(deleteDetExpMininterError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(deleteDetExpMininterError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const saveExpedienteMininter = () => async (dispatch, getStore) => {
   dispatch(saveExpedienteMininterLoading())
   try {
      const { 
         usuario: { token }, 
         expedienteMininter: { data: { nacionalizacion: { numeroTramite } } } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: `/microservicio-nacionalizacion/saveExpedienteMininter/${numeroTramite}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(saveExpedienteMininterSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveExpedienteMininterError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveExpedienteMininterError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const findByUbicacion = (ubicacion) => async (dispatch, getStore) => {
   dispatch(findByUbicacionLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data, status, headers } = await api({
         method: 'POST',
         url: '/microservicio-nacionalizacion/findByUbicacion',
         data: ubicacion,
         responseType: 'blob',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      let fileName
      
      switch (status) {
      case httpStatus.OK:
         fileName = headers['content-disposition'].split('=')[1]
         fileDownload(data, fileName)
         dispatch(findByUbicacionSuccess())
         break
      case httpStatus.NO_CONTENT:
         dispatch(findByUbicacionError(status))
         Noty(WARNING, MESSAGGE_WARNING_EMPTY)
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}