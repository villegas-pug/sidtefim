import { 
   CHANGE_REFUGIADO_FILTER_OPTS,
   FIND_REFUGIADO_BY_OPTS_ERROR, 
   FIND_REFUGIADO_BY_OPTS_LOADING, 
   FIND_REFUGIADO_BY_OPTS_SUCCESS 
} from 'redux/types/refugiadoType'

import { api } from 'config/axios'
import Noty from 'helpers/noty'
import { SUCCESS, WARNING } from 'constants/levelLog'
import { AUTHORIZATION } from 'constants/localStorage'
import { currentHttpStatus } from './httpStatusAction'

const findRefugiadoByOptsLoading = () => ({ type: FIND_REFUGIADO_BY_OPTS_LOADING })
const findRefugiadoByOptsSuccess = (payload) => ({ type: FIND_REFUGIADO_BY_OPTS_SUCCESS, payload })
const findRefugiadoByOptsError = (payload) => ({ type: FIND_REFUGIADO_BY_OPTS_ERROR, payload })

export const changeFilterOptsRefugiado = (payload) => ({ type: CHANGE_REFUGIADO_FILTER_OPTS, payload })

export const findRefugiadoByOpts = (payload) => async (dispatch, getStore) => {
   try {
      const { usuario: { token } } = getStore()
      console.log(payload)
      dispatch(findRefugiadoByOptsLoading())
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-operativo/findByRefugiado',
         data: payload,
         headers:{
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(findRefugiadoByOptsSuccess(data))
         break
      case WARNING:
         dispatch(findRefugiadoByOptsError(message))
         Noty(WARNING, message)
         break
      }
   } catch (err) {
      dispatch(currentHttpStatus(err.response.status))
      dispatch(findRefugiadoByOptsError(err.message))
   }
}