import { 
   ALLOW_TO_REGISTER_PRODUCCION_SDFM, 
   COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_ERROR, 
   COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_LOADING, 
   COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_SUCCESS, 
   COUNT_ACTIVIDAD_WEEK_BY_USER_ERROR, 
   COUNT_ACTIVIDAD_WEEK_BY_USER_LOADING, 
   COUNT_ACTIVIDAD_WEEK_BY_USER_SUCCESS, 
   DELETE_ACTIVIDAD_BY_ID_ERROR, 
   DELETE_ACTIVIDAD_BY_ID_LOADING, 
   DELETE_ACTIVIDAD_BY_ID_SUCCESS, 
   DELETE_PRODUCCION_BY_ID_ERROR, 
   DELETE_PRODUCCION_BY_ID_LOADING, 
   DELETE_PRODUCCION_BY_ID_SUCCESS, 
   DENY_TO_REGISTER_PRODUCCION_SDFM, 
   LIST_ACTIVIDAD_ERROR, 
   LIST_ACTIVIDAD_LOADING, 
   LIST_ACTIVIDAD_SUCCESS, 
   SAVE_ACTIVIDAD_ERROR, 
   SAVE_ACTIVIDAD_LOADING, 
   SAVE_ACTIVIDAD_SUCCESS, 
   SAVE_PRODUCCION_SDFM_ERROR, 
   SAVE_PRODUCCION_SDFM_LOADING,
   SAVE_PRODUCCION_SDFM_SUCCESS,
   SELECTED_ID_PRODUCCION_ON_TODAY_LIST
} from 'redux/types/produccionType'

const initialValues = {
   loading: false,
   data: [],
   error: null,
   sdfm: {
      allowRegisterProd: false,
      selectedIdOnTodayActivityList: -1,
      loading: false,
      data: [],
      error: null,
      produccionCurrentWeek: {
         loading: false,
         data: [],
         error: null,
      },
      produccionWeek:{
         loading: false,
         data: [],
         error: null,
      }
   },
   actividadDb: {
      loading: false,
      data: {
         descripcionActividadDb: [],
         accionDesarrolladaDb: []
      },
      error: null
   }
}

export default function produccionReducer(state = initialValues, { type, payload }){
   switch (type) {
   case ALLOW_TO_REGISTER_PRODUCCION_SDFM:
      return { ...state, sdfm: { ...state.sdfm, allowRegisterProd: true } }
   case DENY_TO_REGISTER_PRODUCCION_SDFM:
      return { ...state, sdfm: { ...state.sdfm, allowRegisterProd: false } }
   case SAVE_PRODUCCION_SDFM_LOADING:
      return { ...state, sdfm: {...state.sdfm, loading: true, data: [], error: null }}
   case SAVE_PRODUCCION_SDFM_SUCCESS:
      return { ...state, sdfm: {...state.sdfm, loading: false, data: payload, error: null }}
   case SAVE_PRODUCCION_SDFM_ERROR:
      return { ...state, sdfm: {...state.sdfm, loading: false, data: [], error: payload }}
   case DELETE_PRODUCCION_BY_ID_LOADING:
      return { ...state, sdfm: {...state.sdfm, loading: true, data: [], error: null }}
   case DELETE_PRODUCCION_BY_ID_SUCCESS:
      return { ...state, sdfm: {...state.sdfm, loading: false, data: payload, error: null }}
   case DELETE_PRODUCCION_BY_ID_ERROR:
      return { ...state, sdfm: {...state.sdfm, loading: false, data: [], error: payload }}
   case SELECTED_ID_PRODUCCION_ON_TODAY_LIST:
      return { ...state, sdfm: { ...state.sdfm, selectedIdOnTodayActivityList: payload  } }
   case COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_LOADING:
      return { ...state, sdfm: { ...state.sdfm, produccionCurrentWeek: { loading: true, data: [], error: null } } }
   case COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_SUCCESS:
      return { ...state, sdfm: { ...state.sdfm, produccionCurrentWeek: { loading: false, data: payload, error: null } } }
   case COUNT_ACTIVIDAD_CURRENT_WEEK_BY_USER_ERROR:
      return { ...state, sdfm: { ...state.sdfm, produccionCurrentWeek: { loading: false, data: [], error: payload } } }
   case COUNT_ACTIVIDAD_WEEK_BY_USER_LOADING:
      return { ...state, sdfm: { ...state.sdfm, produccionWeek: { loading: true, data: [], error: null } } }
   case COUNT_ACTIVIDAD_WEEK_BY_USER_SUCCESS:
      return { ...state, sdfm: { ...state.sdfm, produccionWeek: { loading: false, data: [], error: null } } }
   case COUNT_ACTIVIDAD_WEEK_BY_USER_ERROR:
      return { ...state, sdfm: { ...state.sdfm, produccionWeek: { loading: false, data: [], error: payload } } }

   case LIST_ACTIVIDAD_LOADING:
   case SAVE_ACTIVIDAD_LOADING:
   case DELETE_ACTIVIDAD_BY_ID_LOADING:
      return { ...state, actividadDb: { loading: true, data: [], error: null } }
   case LIST_ACTIVIDAD_SUCCESS:
   case SAVE_ACTIVIDAD_SUCCESS:
   case DELETE_ACTIVIDAD_BY_ID_SUCCESS:
      return { ...state, actividadDb: { 
         loading: false, 
         data: {
            descripcionActividadDb: payload.filter(({tipo}) => tipo === 'ACTIVIDAD'),
            accionDesarrolladaDb: payload.filter(({tipo}) => tipo === 'ACCION')
         }, 
         error: null 
      }}
   case LIST_ACTIVIDAD_ERROR:
   case SAVE_ACTIVIDAD_ERROR:
   case DELETE_ACTIVIDAD_BY_ID_ERROR:
      return { ...state, actividadDb: { loading: false, data: [], error: payload } }
   default:
      return state
   }
}