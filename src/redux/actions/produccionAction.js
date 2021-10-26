import { api } from 'config/axios'
import fileDownload from 'js-file-download'
import { 
   ERROR,
   SUCCESS, 
   WARNING 
} from 'constants/levelLog'
import Noty from 'helpers/noty'
import { 
   ALLOW_TO_REGISTER_PRODUCCION_SDFM, 
   DENY_TO_REGISTER_PRODUCCION_SDFM,
   SAVE_PRODUCCION_SDFM_LOADING,
   SAVE_PRODUCCION_SDFM_SUCCESS,
   SAVE_PRODUCCION_SDFM_ERROR,
   DELETE_PRODUCCION_BY_ID_LOADING,
   DELETE_PRODUCCION_BY_ID_SUCCESS,
   DELETE_PRODUCCION_BY_ID_ERROR,
   SELECTED_ID_PRODUCCION_ON_TODAY_LIST,
   COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_LOADING,
   COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_SUCCESS,
   COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_ERROR,
   COUNT_ACTIVIDAD_WEEK_BY_USER_LOADING,
   COUNT_ACTIVIDAD_WEEK_BY_USER_SUCCESS,
   COUNT_ACTIVIDAD_WEEK_BY_USER_ERROR,
   LIST_ACTIVIDAD_LOADING,
   LIST_ACTIVIDAD_SUCCESS,
   LIST_ACTIVIDAD_ERROR,
   SAVE_ACTIVIDAD_LOADING,
   SAVE_ACTIVIDAD_SUCCESS,
   SAVE_ACTIVIDAD_ERROR,
   DELETE_ACTIVIDAD_BY_ID_LOADING,
   DELETE_ACTIVIDAD_BY_ID_SUCCESS,
   DELETE_ACTIVIDAD_BY_ID_ERROR
} from 'redux/types/produccionType'

import { AUTHORIZATION } from 'constants/localStorage'

export const allowToRegisterProduccion = () => ({ type: ALLOW_TO_REGISTER_PRODUCCION_SDFM })
export const denyToRegisterProduccion = () => ({ type: DENY_TO_REGISTER_PRODUCCION_SDFM })
export const selectedIdProduccionOnTodayList = (payload) => ({ type: SELECTED_ID_PRODUCCION_ON_TODAY_LIST, payload})

const saveProduccionSdfmLoading = () => ({ type: SAVE_PRODUCCION_SDFM_LOADING })
const saveProduccionSdfmSuccess = (payload) => ({ type: SAVE_PRODUCCION_SDFM_SUCCESS, payload })
const saveProduccionSdfmError = (payload) => ({ type: SAVE_PRODUCCION_SDFM_ERROR, payload })

const deleteProduccionByIdLoading = () => ({type: DELETE_PRODUCCION_BY_ID_LOADING})
const deleteProduccionByIdSuccess = (payload) => ({type: DELETE_PRODUCCION_BY_ID_SUCCESS, payload})
const deleteProduccionByIdError = (payload) => ({type: DELETE_PRODUCCION_BY_ID_ERROR, payload})

const countActividadCurrentWeekLoading = () => ({ type: COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_LOADING })
const countActividadCurrentWeekSuccess = (payload) => ({ type: COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_SUCCESS, payload })
const countActividadCurrentWeekError = (payload) => ({ type: COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_ERROR, payload })

const countActividadWeekLoading = () => ({type: COUNT_ACTIVIDAD_WEEK_BY_USER_LOADING})
const countActividadWeekSuccess = () => ({type: COUNT_ACTIVIDAD_WEEK_BY_USER_SUCCESS})
const countActividadWeekError = (payload) => ({type: COUNT_ACTIVIDAD_WEEK_BY_USER_ERROR, payload})

const listActividadLoading = () => ({ type: LIST_ACTIVIDAD_LOADING })
const listActividadSuccess = (payload) => ({ type: LIST_ACTIVIDAD_SUCCESS, payload })
const listActividadError = (payload) => ({ type: LIST_ACTIVIDAD_ERROR, payload })

const saveActividadLoading = () => ({ type: SAVE_ACTIVIDAD_LOADING })
const saveActividadSuccess = (payload) => ({ type: SAVE_ACTIVIDAD_SUCCESS, payload })
const saveActividadError = (payload) => ({ type: SAVE_ACTIVIDAD_ERROR, payload })

const deleteActividadByIdLoading = () => ({ type: DELETE_ACTIVIDAD_BY_ID_LOADING })
const deleteActividadByIdSuccess = (payload) => ({ type: DELETE_ACTIVIDAD_BY_ID_SUCCESS, payload })
const deleteActividadByIdError = (payload) => ({ type: DELETE_ACTIVIDAD_BY_ID_ERROR, payload })

export const saveProduccionSdfm = (payload) => async (dispatch, getStore) => {
   try {
      dispatch(saveProduccionSdfmLoading())
      const { usuario: { userAuth, token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-produccion/registerActividad',
         data: payload,
         params: { userAuth },
         headers:{
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(saveProduccionSdfmSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveProduccionSdfmError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveProduccionSdfmError(message))
         Noty(ERROR, message)
      }   
   } catch (err) {
      dispatch(saveProduccionSdfmError(err))
      Noty(ERROR, err)
   }
}

export const deleteProduccionById = (idProd) => async (dispatch, getStore) => {
   try {
      dispatch(deleteProduccionByIdLoading())
      const { usuario: { userAuth, token } } = getStore()
      const { data: { levelLog, data, message } } = await api({ 
         method: 'DELETE',
         url: '/microservicio-produccion/deleteById',
         params: { idProd, userAuth },
         headers: {
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(deleteProduccionByIdSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(deleteProduccionByIdError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(deleteProduccionByIdError(message))
         Noty(ERROR, message)
         break
      }   
   } catch (err) {
      dispatch(deleteProduccionByIdError(err))
      Noty(ERROR, err)
   }
}

export const countActividadCurrentWeek = () => async (dispatch, getStore) => {
   try {
      dispatch(countActividadCurrentWeekLoading())
      const { usuario: { userAuth, token } } = getStore()
   
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-produccion/countActividadCurrentWeek',
         params: { userAuth },
         headers: {
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(countActividadCurrentWeekSuccess(data))
         break
      case WARNING:
         dispatch(countActividadCurrentWeekError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(countActividadCurrentWeekError(message))
         Noty(ERROR, message)
         break
      }   
   } catch (err) {
      dispatch(countActividadCurrentWeekError(err))
      Noty(ERROR, err)
   }
}

export const countActividadWeek = (refDate) => async (dispatch, getStore) => {
   try {
      dispatch(countActividadWeekLoading())
      const { usuario: { token } } = getStore()
      const { status, data, headers } = await api({
         method: 'GET',
         url: '/microservicio-produccion/countActividadSemanalByDate',
         responseType: 'blob',
         params: { refDate },
         headers: {
            [AUTHORIZATION]: token
         }
      })
      
      let fileName = ''
      let msjWarning = '¡No hay datos para mostrar!'
      switch (status) {
      case 200:
         fileName = headers['content-disposition'].split('filename=')[1].replaceAll('"', '')
         fileDownload(data, fileName)
         dispatch(countActividadWeekSuccess())
         break
      case 204:
         dispatch(countActividadWeekError(msjWarning))
         Noty(WARNING, msjWarning)
         break
      }
   } catch (err) {
      dispatch(countActividadWeekError(err))
   }
}

export const listActividad = () => async (dispatch, getStore) => {
   try {
      dispatch(listActividadLoading())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-produccion/findAllActividad',
         headers: {
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(listActividadSuccess(data))
         break
      case WARNING:
         dispatch(listActividadError(message))
         break
      case ERROR:
         dispatch(listActividadError(message))
         break
      }
   } catch (err) {
      dispatch(listActividadError(err))
   }
}

export const saveActividad = (payload) => async (dispatch, getStore) => {
   try {
      dispatch(saveActividadLoading())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-produccion/saveActividad',
         data: payload,
         headers: {
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(saveActividadSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveActividadError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveActividadError(data))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(saveActividadError(err))
      Noty(ERROR, err)
   }
}

export const deleteActividadById = (idActividad) => async (dispatch, getStore) => {
   try {
      dispatch(deleteActividadByIdLoading())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'DELETE',
         url: `/microservicio-produccion/deleteByIdActividad/${idActividad}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(deleteActividadByIdSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(deleteActividadByIdError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(deleteActividadByIdError(data))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(deleteActividadByIdError(err))
      Noty(ERROR, err)
   }
}