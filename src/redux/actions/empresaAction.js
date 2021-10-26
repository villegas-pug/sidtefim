import {
   LIST_EMPRESA_LOADING,
   LIST_EMPRESA_SUCCESS,
   LIST_EMPRESA_ERROR
} from 'redux/types/empresaType'

import {
   SUCCESS,
   WARNING,
   ERROR,
} from 'constants/levelLog'

import Noty from 'helpers/noty'
import { api } from 'config/axios'

import { AUTHORIZATION } from 'constants/localStorage'

const listEmpresaLoading = () => ({ type: LIST_EMPRESA_LOADING })
const listEmpresaSuccess = (payload) => ({ type: LIST_EMPRESA_SUCCESS, payload })
const listEmpresaError = (payload) => ({ type: LIST_EMPRESA_ERROR, payload })

export const listEmpresa = () => async (dispatch, getStore) => {
   try {
      dispatch(listEmpresaLoading())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: '/microservicio-empresa/findAll',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch(listEmpresaSuccess(data))
         break
      case WARNING:
         dispatch(listEmpresaError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(listEmpresaError(message))
         Noty(ERROR, message)
         break
      }
      
   } catch (err) {
      dispatch(listEmpresaError(err))      
      Noty(ERROR, err)
   }
}