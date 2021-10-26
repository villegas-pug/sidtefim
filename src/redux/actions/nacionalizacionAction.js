import { 
   LIST_PROC_NAC_P_LOADING, 
   LIST_PROC_NAC_P_SUCCESS, 
   LIST_PROC_NAC_P_ERROR, 
   DOWNLOAD_PROC_BY_FILTER_LOADING,
   DOWNLOAD_PROC_BY_FILTER_SUCCESS,
   DOWNLOAD_PROC_BY_FILTER_ERROR,
   /* DOWNLOAD_PROC_BY_FILTER_SUCCESS,
   DOWNLOAD_PROC_BY_FILTER_ERROR */
} from 'redux/types/nacionalizacionType'

import { api } from 'config/axios'
import { AUTHORIZATION } from 'constants/localStorage'
import { 
   SUCCESS, 
   WARNING,
   ERROR
} from 'constants/levelLog'
import Noty from 'helpers/noty'
import fileDownload from 'js-file-download'

const toListProcNacPLoading = () => ({ type: LIST_PROC_NAC_P_LOADING })
const toListProcNacPSuccess = (payload) => ({ type: LIST_PROC_NAC_P_SUCCESS, payload })
const toListProcNacPError = (payload) => ({ type: LIST_PROC_NAC_P_ERROR, payload })

const downloadProcByFilterLoading = () => ({ type: DOWNLOAD_PROC_BY_FILTER_LOADING })
const downloadProcByFilterSuccess = () => ({ type: DOWNLOAD_PROC_BY_FILTER_SUCCESS })
const downloadProcByFilterError = () => ({ type: DOWNLOAD_PROC_BY_FILTER_ERROR })


export const toListProcPNac = () => async (dispatch, getStore) => {
   dispatch(toListProcNacPLoading())
   const { usuario: { token } } = getStore()
   const { data: { levelLog, data, message } } = await api({
      method: 'GET',
      url: '/microservicio-nacionalizacion/countProcPendiente',
      headers: {
         [AUTHORIZATION]: token
      }
   })
   switch (levelLog) {
   case SUCCESS:
      dispatch(toListProcNacPSuccess(data))
      break
   case WARNING:
      dispatch(toListProcNacPError(message))
      Noty(WARNING, message)
      break
   case ERROR:
      dispatch(toListProcNacPError(message))
      Noty(ERROR, message)
      break
   }
}

export const downloadProcByCustomFilter = (payload) => async (dispatch, getStore) => {
   try {
      dispatch(downloadProcByFilterLoading())
      const { usuario: { token } } = getStore()
      const { data, headers, status } = await api({
         method: 'GET',
         url: '/microservicio-nacionalizacion/downloadProcByCustomFilter',
         params: { ...payload },
         responseType: 'blob',
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
         dispatch(downloadProcByFilterSuccess())
         break
      case 204:
         dispatch(downloadProcByFilterError(msjWarning))
         Noty(WARNING, msjWarning)
         break
      }
   } catch (err) {
      dispatch(downloadProcByFilterError(err))
   }
}