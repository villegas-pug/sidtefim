import { 
   CHANGE_PREINSCRIPCION_FILTER_OPTS,
   FIND_PREINSCRIPCION_BY_OPTS_ERROR, 
   FIND_PREINSCRIPCION_BY_OPTS_LOADING, 
   FIND_PREINSCRIPCION_BY_OPTS_SUCCESS 
} from 'redux/types/preInscripcionType'

import { api } from 'config/axios'
import Noty from 'helpers/noty'
import { SUCCESS, WARNING } from 'constants/levelLog'
import { AUTHORIZATION } from 'constants/localStorage'
import { currentHttpStatus } from './httpStatusAction'

const findPreInscripcionByOptsLoading = () => ({ type: FIND_PREINSCRIPCION_BY_OPTS_LOADING })
const findPreInscripcionByOptsSuccess = (payload) => ({ type: FIND_PREINSCRIPCION_BY_OPTS_SUCCESS, payload })
const findPreInscripcionByOptsError = (payload) => ({ type: FIND_PREINSCRIPCION_BY_OPTS_ERROR, payload })

export const changeFilterOptsPreInscripcion = (payload) => ({ type: CHANGE_PREINSCRIPCION_FILTER_OPTS, payload })

export const findPreInscripcionByOpts = (payload) => async (dispatch, getStore) => {
   try {
      const { usuario: { token } } = getStore()
      dispatch(findPreInscripcionByOptsLoading())
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-operativo/findByNombresOrDocumento',
         params: { ...payload },
         headers:{
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(findPreInscripcionByOptsSuccess(data))
         break
      case WARNING:
         dispatch(findPreInscripcionByOptsError(message))
         Noty(WARNING, message)
         break
      }   
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
      dispatch(findPreInscripcionByOptsError(err.message))
   }
   
}