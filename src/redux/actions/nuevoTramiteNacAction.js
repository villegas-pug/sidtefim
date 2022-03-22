import { api } from 'config/axios'
import { 
   FIND_ALL_NUEVO_TRAMITE_NAC_LOADING,
   FIND_ALL_NUEVO_TRAMITE_NAC_SUCCESS,
   FIND_ALL_NUEVO_TRAMITE_NAC_ERROR,
   UPLOAD_NUEVO_TRAMITE_NAC_LOADING,
   UPLOAD_NUEVO_TRAMITE_NAC_SUCCESS,
   UPLOAD_NUEVO_TRAMITE_NAC_ERROR,
   CHANGE_INPUTS_FILTER,
   SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_LOADING,
   SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_SUCCESS,
   SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_ERROR,
   TO_ASSIGN_REVISOR_SUCCESS,
   TO_ASSIGN_REVISOR_ERROR,
   TO_ASSIGN_REVISOR_LOADING,
   UNASSIGN_REVISOR_LOADING,
   UNASSIGN_REVISOR_SUCCESS,
   UNASSIGN_REVISOR_ERROR,
   FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_LOADING,
   FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_SUCCESS,
   FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_ERROR,
   READ_ASSIGNMENT_SUCCESS,
   READ_ASSIGNMENT_ERROR,
   READ_ASSIGNMENT_LOADING,
   CHECK_REQUISITO_TRAMITE_NAC_LOADING,
   CHECK_REQUISITO_TRAMITE_NAC_SUCCESS,
   CHECK_REQUISITO_TRAMITE_NAC_ERROR,
   FINISH_EVAL_TRAMITE_NAC_LOADING,
   FINISH_EVAL_TRAMITE_NAC_SUCCESS,
   FINISH_EVAL_TRAMITE_NAC_ERROR
} from 'redux/types/nuevoTramiteNacType'

import { AUTHORIZATION } from 'constants/localStorage'
import { SUCCESS, WARNING, ERROR } from 'constants/levelLog'

import { currentHttpStatus } from './httpStatusAction'

import Noty from 'helpers/noty'
/* import { httpStatus } from 'constants/httpStatus'
import { MESSAGGE_WARNING_EMPTY } from 'constants/messages' */
import convertBlob from 'helpers/blob'

const findAllNuevoTramiteNacLoading = () => ({ type: FIND_ALL_NUEVO_TRAMITE_NAC_LOADING })
const findAllNuevoTramiteNacSuccess = (payload) => ({ type: FIND_ALL_NUEVO_TRAMITE_NAC_SUCCESS, payload })
const findAllNuevoTramiteNacError = (payload) => ({ type: FIND_ALL_NUEVO_TRAMITE_NAC_ERROR, payload })

const uploadNuevoTramiteNacLoading = () => ({ type: UPLOAD_NUEVO_TRAMITE_NAC_LOADING })
const uploadNuevoTramiteNacSuccess = (payload) => ({ type: UPLOAD_NUEVO_TRAMITE_NAC_SUCCESS, payload })
const uploadNuevoTramiteNacError = (payload) => ({ type: UPLOAD_NUEVO_TRAMITE_NAC_ERROR, payload })

const saveFechaMPNuevoTramiteNacLoading = () => ({ type: SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_LOADING })
const saveFechaMPNuevoTramiteNacSuccess = (payload) => ({ type: SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_SUCCESS, payload })
const saveFechaMPNuevoTramiteNacError = (payload) => ({ type: SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_ERROR, payload })

const toAssignRevisorLoading = () => ({ type: TO_ASSIGN_REVISOR_LOADING })
const toAssignRevisorSuccess = (payload) => ({ type: TO_ASSIGN_REVISOR_SUCCESS, payload })
const toAssignRevisorError = (payload) => ({ type: TO_ASSIGN_REVISOR_ERROR, payload })

const unassignRevisorLoading = () => ({ type: UNASSIGN_REVISOR_LOADING })
const unassignRevisorSuccess = (payload) => ({ type: UNASSIGN_REVISOR_SUCCESS, payload })
const unassignRevisorError = (payload) => ({ type: UNASSIGN_REVISOR_ERROR, payload })

const findAllAssignedInEvalByUsrLoading = () => ({ type: FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_LOADING })
const findAllAssignedInEvalByUsrSuccess = (payload) => ({ type: FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_SUCCESS, payload })
const findAllAssignedInEvalByUsrError = (payload) => ({ type: FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_ERROR, payload })

const readAssignmentLoading = () => ({ type: READ_ASSIGNMENT_LOADING })
const readAssignmentSuccess = (payload) => ({ type: READ_ASSIGNMENT_SUCCESS, payload })
const readAssignmentError = (payload) => ({ type: READ_ASSIGNMENT_ERROR, payload })

const checkRequisitoTramiteNacLoading = () => ({ type: CHECK_REQUISITO_TRAMITE_NAC_LOADING })
const checkRequisitoTramiteNacSuccess = (payload) => ({ type: CHECK_REQUISITO_TRAMITE_NAC_SUCCESS, payload })
const checkRequisitoTramiteNacError = (payload) => ({ type: CHECK_REQUISITO_TRAMITE_NAC_ERROR, payload })

const finishEvaluarTramiteNacLoading = () => ({ type: FINISH_EVAL_TRAMITE_NAC_LOADING })
const finishEvaluarTramiteNacSuccess = (payload) => ({ type: FINISH_EVAL_TRAMITE_NAC_SUCCESS, payload })
const finishEvaluarTramiteNacError = (payload) => ({ type: FINISH_EVAL_TRAMITE_NAC_ERROR, payload })

export const changeInputsFilter = (payload) => ({ type: CHANGE_INPUTS_FILTER, payload })

export const findAllNuevoTramiteNac = () => async (dispatch, getStore) => {
   dispatch(findAllNuevoTramiteNacLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-nacionalizacion/findAllNuevoTramiteNac',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(findAllNuevoTramiteNacSuccess(data))
         break
      case WARNING:
         dispatch(findAllNuevoTramiteNacError(message))
         break
      case ERROR:
         dispatch(findAllNuevoTramiteNacError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response?.status))
   }
}

export const uploadNuevoTramiteNac = (frmData) => async (dispatch, getStore) => {
   dispatch(uploadNuevoTramiteNacLoading())
   try {
      const { usuario: { token, userCredentials } } = getStore()
      frmData.append('operadorDesig', convertBlob(userCredentials))
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-nacionalizacion/uploadTramiteNac',
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(uploadNuevoTramiteNacSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(uploadNuevoTramiteNacError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(uploadNuevoTramiteNacError(message))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const saveFechaMPNuevoTramiteNac = (nuevoTramiteNac) => async (dispatch, getStore) => {
   dispatch(saveFechaMPNuevoTramiteNacLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'PUT',
         url: '/microservicio-nacionalizacion/saveFechaMPInNuevoTramiteNac',
         data: nuevoTramiteNac,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(saveFechaMPNuevoTramiteNacSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveFechaMPNuevoTramiteNacError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveFechaMPNuevoTramiteNacError(message))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const toAssignRevisor = (nuevoTramiteNac) => async (dispatch, getStore) => {
   dispatch(toAssignRevisorLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'PUT',
         url: '/microservicio-nacionalizacion/toAssignRevisor',
         data: nuevoTramiteNac,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(toAssignRevisorSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(toAssignRevisorError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(toAssignRevisorError(message))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const unassignRevisor = (nuevoTramiteNac) => async (dispatch, getStore) => {
   dispatch(unassignRevisorLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'DELETE',
         url: '/microservicio-nacionalizacion/unassignRevisor',
         data: nuevoTramiteNac,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(unassignRevisorSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(unassignRevisorError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(unassignRevisorError(message))
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const findAllAssignedInEvalByUsr = () => async (dispatch, getStore) => {
   dispatch(findAllAssignedInEvalByUsrLoading())
   try {
      const { usuario: { token, userCredentials: usrDesign } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-nacionalizacion/findAllAssignedInEvalByUsrDesig',
         data: usrDesign,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(findAllAssignedInEvalByUsrSuccess(data))
         break
      case WARNING:
         dispatch(findAllAssignedInEvalByUsrError(message))
         break
      case ERROR:
         dispatch(findAllAssignedInEvalByUsrError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const readAssignment = (evaluarTramiteNac) => async (dispatch, getStore) => {
   dispatch(readAssignmentLoading())
   try {
      const { usuario: { token, userCredentials: operadorDesig } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'PUT',
         url: '/microservicio-nacionalizacion/readAssignment',
         data: { ...evaluarTramiteNac, operadorDesig },
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(readAssignmentSuccess(data))
         break
      case WARNING:
         dispatch(readAssignmentError(message))
         break
      case ERROR:
         dispatch(readAssignmentError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const checkRequisitoTramiteNac = (evalRequisitoTramiteNac) => async (dispatch, getStore) => {
   dispatch(checkRequisitoTramiteNacLoading())
   try {
      const { usuario: { token, userCredentials: usrDesig } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'PUT',
         url: '/microservicio-nacionalizacion/checkRequisitoTramiteNac',
         data: { ...evalRequisitoTramiteNac, usrDesig },
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(checkRequisitoTramiteNacSuccess(data))
         break
      case WARNING:
         dispatch(checkRequisitoTramiteNacError(message))
         break
      case ERROR:
         dispatch(checkRequisitoTramiteNacError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}

export const finishEvaluarTramiteNac = (evalTramiteNac) => async (dispatch, getStore) => {
   dispatch(finishEvaluarTramiteNacLoading())
   try {
      const { usuario: { token, userCredentials: operadorDesig } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'PUT',
         url: '/microservicio-nacionalizacion/finishEvaluarTramiteNac',
         data: { ...evalTramiteNac, operadorDesig },
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(finishEvaluarTramiteNacSuccess(data))
         break
      case WARNING:
         dispatch(finishEvaluarTramiteNacError(message))
         break
      case ERROR:
         dispatch(finishEvaluarTramiteNacError(message))
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }
}