import { 
   FIND_ALL_METADATA_FILES_SOLICITUD_ERROR,
   FIND_ALL_METADATA_FILES_SOLICITUD_LOADING, 
   FIND_ALL_METADATA_FILES_SOLICITUD_SUCCESS,
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

const initialState = {
   loading: false,
   data: [],
   error: null,
   metadataFilesSolicitud:[],
   tipoTramite: {
      loading: false,
      data: [],
      error: null,
   },
   solicitudValues:{
      loading: false,
      values: {
         numeroExpediente: '',
         procedimiento: '',
         administrado: '',
         paisNacionalidad: '',
         domicilio: '',
         distrito: '',
      },
      error: null
   },
   bandejaEntrada: {
      loading: false,
      data: [],
      error: null
   }
}

export default function fiscalizacionPosteriorReducer(state = initialState, { type, payload }){

   switch (type) {
   case FIND_ALL_METADATA_FILES_SOLICITUD_LOADING:
   case SAVE_ALL_SOLICITUDES_LOADING:
      return { ...state, loading: true, metadataFilesSolicitud: [], error: null }
   case FIND_ALL_METADATA_FILES_SOLICITUD_SUCCESS:
   case SAVE_ALL_SOLICITUDES_SUCCESS:
      return { ...state, loading: false, metadataFilesSolicitud: payload, error: null }
   case FIND_ALL_METADATA_FILES_SOLICITUD_ERROR:
   case SAVE_ALL_SOLICITUDES_ERROR:
      return { ...state, loading: false, metadataFilesSolicitud: [], error: payload }
   case FIND_ALL_TIPO_TRAMITE_LOADING:
      return { ...state, tipoTramite: { loading: true, data: [], error: null } }
   case FIND_ALL_TIPO_TRAMITE_SUCCESS:
      return { ...state, tipoTramite: { loading: false, data: payload, error: null } }
   case FIND_ALL_TIPO_TRAMITE_ERROR:
      return { ...state, tipoTramite: { loading: false, data: [], error: payload } }
   case FIND_SOLICITUD_BY_NUMERO_EXPE_LOADING:
      return { ...state, solicitudValues: { loading: true, values: {}, error: null } }
   case FIND_SOLICITUD_BY_NUMERO_EXPE_SUCCESS:
      return { ...state, solicitudValues: { loading: false, values: payload[0], error: null } }
   case FIND_SOLICITUD_BY_NUMERO_EXPE_ERROR:
      return { ...state, solicitudValues: { loading: false, values: {}, error: payload } }
   case RESET_SOLICITUD_VALUES_LOADING:
      return { ...state, solicitudValues: { ...initialState.solicitudValues, loading: true } }
   case RESET_SOLICITUD_VALUES:
      return { ...state, solicitudValues: { ...initialState.solicitudValues } }
   case SAVE_BANDEJA_DOC_LOADING:
      return { ...state, bandejaEntrada: { loading: true, data: [], error: null } }
   case SAVE_BANDEJA_DOC_SUCCESS:
      return { 
         ...state, 
         bandejaEntrada: { loading: false, data: payload, error: null },
         solicitudValues: { ...initialState.solicitudValues }
      }
   case SAVE_BANDEJA_DOC_ERROR:
      return { ...state, bandejaEntrada: { loading: false, data: [], error: payload } }
   default:
      return state
   }

}