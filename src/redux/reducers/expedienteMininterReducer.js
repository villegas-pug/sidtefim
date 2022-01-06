import { 
   DELETE_DET_EXP_MININTER_ERROR,
   DELETE_DET_EXP_MININTER_LOADING,
   DELETE_DET_EXP_MININTER_SUCCESS,
   DELETE_MAIL_FILE_BY_ID_LOADING,
   DELETE_MAIL_FILE_BY_ID_SUCCESS,
   DELETE_MAIL_FILE_BY_ID_ERROR,
   DOWNLOAD_FILE_ERROR,
   DOWNLOAD_FILE_LOADING,
   DOWNLOAD_FILE_SUCCESS,
   FIND_ALL_RESUMEN_PLAZO_OFICIOS_ERROR,
   FIND_ALL_RESUMEN_PLAZO_OFICIOS_LOADING,
   FIND_ALL_RESUMEN_PLAZO_OFICIOS_SUCCESS,
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

const initialState = {
   loading: false,
   data: [],
   warning: '',
   error: null,
   ubicacionMininter:{
      loading: false,
      data: [],
      error: null
   },
   resumenPlazoOficios: {
      loading: false,
      data: {},
      error: null
   },
   fileDownload: {
      loading: false,
      error: null
   }
}

export default function expedienteMininterReducer(state = initialState, { type, payload }){
   switch (type) {
   case FIND_BY_NUMERO_EXPEDIENTE_LOADING:
      return { ...state, loading: true, data: [], warning: '', error: null }
   case FIND_BY_NUMERO_EXPEDIENTE_SUCCESS:
   case SAVE_DET_EXP_MININTER_SUCCESS:
   case DELETE_DET_EXP_MININTER_SUCCESS:
   case SAVE_EXP_MININTER_SUCCESS:
      return { ...state, loading: false, data: payload[0] || payload, warning: '', error: null }
   case FIND_BY_NUMERO_EXPEDIENTE_WARNING:
      return { ...state, loading: false, data: [], warning: payload, error: null }
   case FIND_BY_NUMERO_EXPEDIENTE_ERROR:
      return { ...state, loading: false, data: [], warning: '', error: payload }
   case SAVE_DET_EXP_MININTER_LOADING:
      return { ...state, loading: true, error: null}
   case SAVE_DET_EXP_MININTER_ERROR:
      return { ...state, loading: false, error: payload}
   case FIND_ALL_UBICACION_EXP_LOADING:
      return { ...state, ubicacionMininter: { loading: true, data: [], error: null } }
   case FIND_ALL_UBICACION_EXP_SUCCESS:
      return { ...state, ubicacionMininter: { loading: false, data: payload, error: null } }
   case FIND_ALL_UBICACION_EXP_ERROR:
      return { ...state, ubicacionMininter: { loading: false, data: [], error: payload } }
   case DELETE_DET_EXP_MININTER_LOADING:
      return { ...state, loading: true, error: null } 
   case DELETE_DET_EXP_MININTER_ERROR:
      return { ...state, loading: false, error: payload } 
   case SAVE_EXP_MININTER_LOADING:
      return { ...state, loading: true, error: null }
   case SAVE_EXP_MININTER_ERROR:
      return { ...state, loading: false, error: payload }
   case FIND_EXP_MININTER_BY_UBICACION_LOADING:
      return { ...state, loading: true, error: null }
   case FIND_EXP_MININTER_BY_UBICACION_SUCCESS:
      return { ...state, loading: false, error: null }
   case FIND_EXP_MININTER_BY_UBICACION_ERROR:
      return { ...state, loading: false, error: payload }
   case FIND_ALL_RESUMEN_PLAZO_OFICIOS_LOADING:
      return { ...state, resumenPlazoOficios: { loading: true, data: {}, error: null} }
   case FIND_ALL_RESUMEN_PLAZO_OFICIOS_SUCCESS:
      return { ...state, resumenPlazoOficios: { loading: false, data: payload[0] || {}, error: null} }
   case FIND_ALL_RESUMEN_PLAZO_OFICIOS_ERROR:
      return { ...state, resumenPlazoOficios: { loading: false, data: {}, error: payload} }
   case DOWNLOAD_FILE_LOADING:
      return { ...state, fileDownload: { loading: true, error: null } }
   case DOWNLOAD_FILE_SUCCESS:
      return { ...state, fileDownload: { loading: false, error: null } }
   case DOWNLOAD_FILE_ERROR:
      return { ...state, fileDownload: { loading: false, error: payload } }
   case DELETE_MAIL_FILE_BY_ID_LOADING:
      return { ...state, loading: true, error: null }
   case DELETE_MAIL_FILE_BY_ID_SUCCESS:
      return { ...state, loading: false, data: { ...state.data, expedienteMininter: payload[0] }, error: null }
   case DELETE_MAIL_FILE_BY_ID_ERROR:
      return { ...state, loading: false, error: payload }
   default:
      return state
   }
}