import { api } from 'config/axios'

import {
   SAVE_ALL_CEREMONIA_LOADING,
   SAVE_ALL_CEREMONIA_SUCCESS,
   SAVE_ALL_CEREMONIA_ERROR,
   GET_SUMARIZZE_CEREMONIA_SUCCESS,
   GET_SUMARIZZE_CEREMONIA_ERROR,
   GET_SUMARIZZE_CEREMONIA_LOADING
} from 'redux/types/ceremoniaType'
import { AUTHORIZATION } from 'constants/localStorage'
import { ERROR, SUCCESS, WARNING } from 'constants/levelLog'

import Noty from 'helpers/noty'
import { currentHttpStatus } from './httpStatusAction'

const saveAllCeremoniaLoading = () => ({ type: SAVE_ALL_CEREMONIA_LOADING })
const saveAllCeremoniaSuccess = (payload) => ({ type: SAVE_ALL_CEREMONIA_SUCCESS, payload })
const saveAllCeremoniaError = (payload) => ({ type: SAVE_ALL_CEREMONIA_ERROR, payload })

const getSumarizzeCeremoniaLoading = () => ({ type: GET_SUMARIZZE_CEREMONIA_LOADING })
const getSumarizzeCeremoniaSuccess = (payload) => ({ type: GET_SUMARIZZE_CEREMONIA_SUCCESS, payload })
const getSumarizzeCeremoniaError = (payload) => ({ type: GET_SUMARIZZE_CEREMONIA_ERROR, payload })


export const saveAllCeremonia = (payload) => async (dispatch, getStore) => {
   dispatch(saveAllCeremoniaLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-nacionalizacion/saveAllCeremonia',
         data: payload,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(saveAllCeremoniaSuccess(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(saveAllCeremoniaError())
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(saveAllCeremoniaError())
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }

}

export const getSumarizzeCeremonia = () => async (dispatch, getStore) => {
   dispatch(getSumarizzeCeremoniaLoading())
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-nacionalizacion/getSumarizzeCeremonia',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(getSumarizzeCeremoniaSuccess(data))
         break
      case WARNING:
         dispatch(getSumarizzeCeremoniaError())
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(getSumarizzeCeremoniaError())
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
   }

}