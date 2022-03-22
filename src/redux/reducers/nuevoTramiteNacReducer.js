import { 
   FIND_ALL_NUEVO_TRAMITE_NAC_LOADING,
   FIND_ALL_NUEVO_TRAMITE_NAC_SUCCESS,
   FIND_ALL_NUEVO_TRAMITE_NAC_ERROR,
   UPLOAD_NUEVO_TRAMITE_NAC_LOADING,
   UPLOAD_NUEVO_TRAMITE_NAC_SUCCESS,
   UPLOAD_NUEVO_TRAMITE_NAC_ERROR,
   CHANGE_INPUTS_FILTER,
   SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_LOADING,
   SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_ERROR,
   SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_SUCCESS,
   TO_ASSIGN_REVISOR_LOADING,
   TO_ASSIGN_REVISOR_SUCCESS,
   TO_ASSIGN_REVISOR_ERROR,
   UNASSIGN_REVISOR_LOADING,
   UNASSIGN_REVISOR_SUCCESS,
   UNASSIGN_REVISOR_ERROR,
   FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_LOADING,
   FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_SUCCESS,
   FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_ERROR,
   READ_ASSIGNMENT_LOADING,
   READ_ASSIGNMENT_SUCCESS,
   READ_ASSIGNMENT_ERROR,
   CHECK_REQUISITO_TRAMITE_NAC_LOADING,
   CHECK_REQUISITO_TRAMITE_NAC_SUCCESS,
   CHECK_REQUISITO_TRAMITE_NAC_ERROR,
   FINISH_EVAL_TRAMITE_NAC_LOADING,
   FINISH_EVAL_TRAMITE_NAC_SUCCESS,
   FINISH_EVAL_TRAMITE_NAC_ERROR
} from 'redux/types/nuevoTramiteNacType'

const initialState = {
   loading: false,
   data: [],
   error: null,
   inputsFilter: {
      numeroTramite: '',
      administrado: ''
   },
   assignedInEvalByUsr: {
      loading: false,
      data: [],
      error: null
   }
}

export default function nuevoTramiteNacReducer(state = initialState, { type, payload }){
   switch (type) {
   case FIND_ALL_NUEVO_TRAMITE_NAC_LOADING:
   case UPLOAD_NUEVO_TRAMITE_NAC_LOADING:
   case SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_LOADING:
   case TO_ASSIGN_REVISOR_LOADING:
   case UNASSIGN_REVISOR_LOADING:
      return { ...state, loading: true, data: [], error: null }
   case FIND_ALL_NUEVO_TRAMITE_NAC_SUCCESS:
   case UPLOAD_NUEVO_TRAMITE_NAC_SUCCESS:
   case SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_SUCCESS:
   case TO_ASSIGN_REVISOR_SUCCESS:
   case UNASSIGN_REVISOR_SUCCESS:
      return { ...state, loading: false, data: payload, error: null }
   case FIND_ALL_NUEVO_TRAMITE_NAC_ERROR:
   case UPLOAD_NUEVO_TRAMITE_NAC_ERROR:
   case SAVE_FECHA_MP_NUEVO_TRAMITE_NAC_ERROR:
   case TO_ASSIGN_REVISOR_ERROR:
   case UNASSIGN_REVISOR_ERROR:
      return { ...state, loading: false, data: [], error: payload }
   case CHANGE_INPUTS_FILTER:
      return { ...state, inputsFilter: { ...state.inputsFilter, ...payload } }
   case FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_LOADING:
   case READ_ASSIGNMENT_LOADING:
   case CHECK_REQUISITO_TRAMITE_NAC_LOADING:
   case FINISH_EVAL_TRAMITE_NAC_LOADING:
      return { ...state, assignedInEvalByUsr: { loading: true, data: [], error: null } }
   case FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_SUCCESS:
   case READ_ASSIGNMENT_SUCCESS:
   case CHECK_REQUISITO_TRAMITE_NAC_SUCCESS:
   case FINISH_EVAL_TRAMITE_NAC_SUCCESS:
      return { ...state, assignedInEvalByUsr: { loading: false, data: payload, error: null } }
   case FIND_ALL_ASSIGNED_IN_EVAL_BY_USRDESIG_ERROR:
   case READ_ASSIGNMENT_ERROR:
   case CHECK_REQUISITO_TRAMITE_NAC_ERROR:
   case FINISH_EVAL_TRAMITE_NAC_ERROR:
      return { ...state, assignedInEvalByUsr: { loading: false, data: [], error: payload } }
   default:
      return state
   }

}