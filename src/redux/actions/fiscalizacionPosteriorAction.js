import { 
   FIND_ALL_METADATA_FILES_SOLICITUD_LOADING, 
   FIND_ALL_METADATA_FILES_SOLICITUD_SUCCESS, 
   FIND_ALL_METADATA_FILES_SOLICITUD_ERROR,
   SAVE_ALL_SOLICITUDES_LOADING,
   SAVE_ALL_SOLICITUDES_SUCCESS,
   SAVE_ALL_SOLICITUDES_ERROR,
   FIND_ALL_TIPO_TRAMITE_LOADING,
   FIND_ALL_TIPO_TRAMITE_SUCCESS,
   FIND_ALL_TIPO_TRAMITE_ERROR,
   FIND_SOLICITUD_BY_NUMERO_EXPE_LOADING,
   FIND_SOLICITUD_BY_NUMERO_EXPE_SUCCESS,
   FIND_SOLICITUD_BY_NUMERO_EXPE_ERROR,
   RESET_SOLICITUD_VALUES,
   RESET_SOLICITUD_VALUES_LOADING,
   SAVE_BANDEJA_DOC_LOADING,
   SAVE_BANDEJA_DOC_SUCCESS,
   SAVE_BANDEJA_DOC_ERROR
} from 'redux/types/fiscalizacionPosteriorType'

import { api } from 'config/axios'
import { currentHttpStatus } from './httpStatusAction'
import Noty from 'helpers/noty'

import { AUTHORIZATION } from 'constants/localStorage'
import { SUCCESS, WARNING, ERROR } from 'constants/levelLog'
import sleep from 'helpers/sleep'

const findAllMetadataOfFilesLoading = () => ({ type: FIND_ALL_METADATA_FILES_SOLICITUD_LOADING })
const findAllMetadataOfFilesSuccess = (payload) => ({ type: FIND_ALL_METADATA_FILES_SOLICITUD_SUCCESS, payload })
const findAllMetadataOfFilesError = (payload) => ({ type: FIND_ALL_METADATA_FILES_SOLICITUD_ERROR, payload })

const saveAllSolicitudesLoading = () => ({ type: SAVE_ALL_SOLICITUDES_LOADING })
const saveAllSolicitudesSuccess = (payload) => ({ type: SAVE_ALL_SOLICITUDES_SUCCESS, payload })
const saveAllSolicitudesError = (payload) => ({ type: SAVE_ALL_SOLICITUDES_ERROR, payload })

const findAllTipoTramiteLoading = () => ({ type: FIND_ALL_TIPO_TRAMITE_LOADING })
const findAllTipoTramiteSuccess = (payload) => ({ type: FIND_ALL_TIPO_TRAMITE_SUCCESS, payload })
const findAllTipoTramiteError = (payload) => ({ type: FIND_ALL_TIPO_TRAMITE_ERROR, payload })

const findSolicitudByNumeroExpeLoading = () => ({ type: FIND_SOLICITUD_BY_NUMERO_EXPE_LOADING })
const findSolicitudByNumeroExpeSuccess = (payload) => ({ type: FIND_SOLICITUD_BY_NUMERO_EXPE_SUCCESS, payload })
const findSolicitudByNumeroExpeError = (payload) => ({ type: FIND_SOLICITUD_BY_NUMERO_EXPE_ERROR, payload })

const saveDocInBandejaEntradaLoading = () => ({ type: SAVE_BANDEJA_DOC_LOADING })
const saveDocInBandejaEntradaSuccess = (payload) => ({ type: SAVE_BANDEJA_DOC_SUCCESS, payload })
const saveDocInBandejaEntradaError = (payload) => ({ type: SAVE_BANDEJA_DOC_ERROR, payload })

export const resetSolicitudValues = () => async (dispatch) => {
   dispatch({ type: RESET_SOLICITUD_VALUES_LOADING })
   await sleep()
   dispatch({ type: RESET_SOLICITUD_VALUES })
}

export const findAllMetadataOfFiles = () => async (dispatch, getStore) => {
   dispatch(findAllMetadataOfFilesLoading())
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-operativo/getMetadataFilesExpedienteSolicitud',
         headers:{
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(findAllMetadataOfFilesSuccess(data))
         break
      case WARNING:
         dispatch(findAllMetadataOfFilesError(message))
         break
      case ERROR:
         dispatch(findAllMetadataOfFilesError(message))
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response?.status))
   }

}

export const saveAllSolicitudesSFM = (frmData) => async (dispatch, getStore) => {
   dispatch(saveAllSolicitudesLoading())
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-operativo/saveAllExpedienteSolicitud',
         data: frmData,
         headers:{
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(saveAllSolicitudesSuccess(data))
         break
      case WARNING:
         dispatch(saveAllSolicitudesError(message))
         break
      case ERROR:
         dispatch(saveAllSolicitudesError(message))
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response?.status))
   }

}

export const findAllTipoTramite = () => async (dispatch, getStore) => {
   dispatch(findAllTipoTramiteLoading())
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-operativo/findAllTipoTramite',
         headers:{
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(findAllTipoTramiteSuccess(data))
         break
      case WARNING:
         dispatch(findAllTipoTramiteError(message))
         break
      case ERROR:
         dispatch(findAllTipoTramiteError(message))
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response?.status))
   }

}

export const saveDocInBandejaEntrada = (payload) => async (dispatch, getStore) => {
   dispatch(saveDocInBandejaEntradaLoading())
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-operativo/saveBandejaDoc',
         data: payload,
         headers:{
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(saveDocInBandejaEntradaSuccess(data))
         break
      case WARNING:
         dispatch(saveDocInBandejaEntradaError(message))
         break
      case ERROR:
         dispatch(saveDocInBandejaEntradaError(message))
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response?.status))
   }

}

export const findSolicitudByNumeroExpe = ({ numeroExpediente }) => async (dispatch, getStore) => {
   dispatch(findSolicitudByNumeroExpeLoading())
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-operativo/findByNumeroExpeOfSolicitud',
         params: { numeroExpediente },
         headers:{
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(findSolicitudByNumeroExpeSuccess(data))
         break
      case WARNING:
         dispatch(findSolicitudByNumeroExpeError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(findSolicitudByNumeroExpeError(message))
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response?.status))
   }

}