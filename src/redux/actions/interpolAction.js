
import Noty from 'helpers/noty'

import { api } from 'config/axios'
import { httpStatus } from 'constants/httpStatus'
import fileDownload from 'js-file-download'

import {
   SUCCESS,
   WARNING,
   ERROR
} from 'constants/levelLog'
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

import { AUTHORIZATION } from 'constants/localStorage'
import { currentHttpStatus } from 'redux/actions/httpStatusAction'

const obtenerInterpolCargando = () => ({ type: OBTENER_INTERPOL_CARGANDO })
const obtenerInterpolExito = (payload) => ({ type: OBTENER_INTERPOL_EXITO, payload })
const obtenerInterpolError = (payload) => ({ type: OBTENER_INTERPOL_ERROR, payload })

const saveAllInterpolLoading = () => ({ type: SAVE_ALL_INTERPOL_LOADING })
const saveAllInterpolSuccess = () => ({ type: SAVE_ALL_INTERPOL_SUCCESS })
const saveAllInterpolError = (payload) => ({ type: SAVE_ALL_INTERPOL_ERROR, payload })

const saveOneInterpolLoading = () => ({ type: SAVE_ONE_INTERPOL_LOADING })
const saveOneInterpolSuccess = () => ({ type: SAVE_ONE_INTERPOL_SUCCESS })
const saveOneInterpolError = (payload) => ({ type: SAVE_ONE_INTERPOL_ERROR, payload })

const getScreenshotLoading = () => ({ type: GET_SCREENSHOT_INTERPOL_LOADING })
const getScreenshotSuccess = () => ({ type: GET_SCREENSHOT_INTERPOL_SUCCESS })
const getScreenshotError = () => ({ type: GET_SCREENSHOT_INTERPOL_ERROR })

export const obtenerInterpol = () => async (dispatch, getStore) => {
   try {
      dispatch(obtenerInterpolCargando())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message, data } } = await api({
         method: 'GET',
         url: 'microservicio-interpol/findAll',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(obtenerInterpolExito(data))
         break
      case WARNING:
         dispatch(obtenerInterpolError(message))
         break
      case ERROR:
         dispatch(obtenerInterpolError(message))
         break
      }
   } catch (err) {
      dispatch(obtenerInterpolError(err))      
   }
}

export const obtenerInterpolApprox = (payload) => async (dispatch, getStore) => {
   try {
      dispatch(obtenerInterpolCargando())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message, data } } = await api({
         method: 'POST',
         url: 'microservicio-interpol/findByApprox',
         data: payload,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(obtenerInterpolExito(data))
         break
      case WARNING:
         dispatch(obtenerInterpolError(message))
         break
      case ERROR:
         dispatch(obtenerInterpolError(message))
         break
      }
   } catch (err) {
      console.log(err)
      dispatch(currentHttpStatus(err.response.status))
      dispatch(obtenerInterpolError(err.message))
   }
} 

export const saveAllInterpol = (formData) => async (dispatch, getStore) => {
   dispatch(saveAllInterpolLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message } } = await api({
         method: 'POST',
         url: '/microservicio-interpol/saveAll',
         data: formData,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(saveAllInterpolSuccess())
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveAllInterpolError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveAllInterpolError(message))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
      dispatch(saveAllInterpolError(err.message))
   }
}

export const saveOnInterpol = (frmData) => async (dispatch, getStore) => {
   dispatch(saveOneInterpolLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message  } } = await api({
         method: 'POST',
         url: '/microservicio-interpol/saveByOnlyOne',
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(saveOneInterpolSuccess())
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveOneInterpolError())
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveOneInterpolError(message))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
      dispatch(saveOneInterpolError(err.message))
   }  
}

export const getScreenshot = (idInterpol) => async (dispatch, getStore) => {
   dispatch(getScreenshotLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data, status, headers } = await api({
         method: 'GET',
         url: '/microservicio-interpol/downloadScreenshot',
         params: { idInterpol },
         headers: {
            [AUTHORIZATION]: token
         },
         responseType: 'blob'
      })

      const fileName = headers['content-disposition'].split('=')[1].replaceAll('"', '')

      switch (status) {
      case httpStatus.OK:
         fileDownload(data, fileName)
         dispatch(getScreenshotSuccess())
         break
      case httpStatus.FORBIDDEN:
         dispatch(currentHttpStatus(status))
         break
      }
   } catch (err) {
      dispatch(getScreenshotError(err.message))
      dispatch(currentHttpStatus(err.response.status))
   }

}