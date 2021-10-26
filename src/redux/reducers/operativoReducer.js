import {
   INPUT_CHANGE,
   INPUTS_RESET,
   SAVE_OPERATIVO_LOADING,
   SAVE_OPERATIVO_SUCCESS,
   SAVE_OPERATIVO_ERROR,
   LIST_OPERATIVO_LOADING,
   LIST_OPERATIVO_SUCCESS,
   LIST_OPERATIVO_ERROR,
   LIST_OPE_PIVOTED_LOADING,
   LIST_OPE_PIVOTED_SUCCESS,
   LIST_OPE_PIVOTED_ERROR,
   LIST_OPE_PIVOTED_NACIONALIDAD_LOADING,
   LIST_OPE_PIVOTED_NACIONALIDAD_SUCCESS,
   LIST_OPE_PIVOTED_NACIONALIDAD_ERROR,
   LIST_OPE_PIVOTED_SEXO_LOADING,
   LIST_OPE_PIVOTED_SEXO_SUCCESS,
   LIST_OPE_PIVOTED_SEXO_ERROR,
   LIST_OPE_BY_FILTER_TO_EXCEL_LOADING,
   LIST_OPE_BY_FILTER_TO_EXCEL_SUCCESS,
   LIST_OPE_BY_FILTER_TO_EXCEL_ERROR,
   LIST_OPE_PIVOTED_ANUAL_LOADING,
   LIST_OPE_PIVOTED_ANUAL_SUCCESS,
   LIST_OPE_PIVOTED_ANUAL_ERROR,
   LIST_INTERVENIDOS_PIVOTED_LOADING,
   LIST_INTERVENIDOS_PIVOTED_SUCCESS,
   LIST_INTERVENIDOS_PIVOTED_ERROR,
   LIST_TIPO_INFRACCION_PIVOTED_SUCCESS,
   LIST_TIPO_INFRACCION_PIVOTED_ERROR,
   LIST_TIPO_INFRACCION_PIVOTED_LOADING,
   LIST_TIPO_OPERATIVO_PIVOTED_LOADING,
   LIST_TIPO_OPERATIVO_PIVOTED_SUCCESS,
   LIST_TIPO_OPERATIVO_PIVOTED_ERROR,
   UPDATE_OPE_NRO_INFO_LOADING,
   UPDATE_OPE_NRO_INFO_SUCCESS,
   UPDATE_OPE_NRO_INFO_ERROR,
   RESET_OPE_BY_FILTER_TO_EXCEL,
   LIST_OPE_PIVOTED_MODALIDAD_LOADING,
   LIST_OPE_PIVOTED_MODALIDAD_SUCCESS,
   LIST_OPE_PIVOTED_MODALIDAD_ERROR,
   LIST_OPE_JZ_SUCCESS,
   LIST_OPE_JZ_LOADING,
   LIST_OPE_JZ_ERROR,
} from 'redux/types/operativoType'

const initialValues = {
   loading: false,
   data: [],
   error: null,
   filteredData: [],
   inputValues: {
      fechaOperativo: '',
      numeroOperativo: '',
      modalidadOperativo: '',
      numeroInforme: '',
      entidadSolicitaOperativo: '',
      establecimientoVisitado: '',
      dependencia: '',
      nombres: '',
      tipoDocumento: '',
      numeroDocumento: '',
      pais: '',
      sexo: '',
      infraccion: '',
      tipoInfraccion: '',
      disposicionPNP: '',
      situacionMigratoria: '',
      refugiado: '',
      conMenor: '',
      datosMenor: '',
      observaciones: '',
      file: null
   },
   pivotedOpeAnual:{
      loading: false,
      data: [],
      error: null
   },
   operativoJZ:{
      loading: false,
      data: [],
      error: null
   },
   pivotedIntervenidos:{
      loading: false,
      data: [],
      error: null
   },
   pivotedTipoInfraccion:{
      loading: false,
      data: [],
      error: null
   },
   pivotedTipoOperativo:{
      loading: false,
      data: [],
      error: null
   },
   pivotedOpe: {
      loading: false,
      data: [],
      error: null
   },
   pivotedOpeByNacionalidad: {
      loading: false,
      data: [],
      error: null
   },
   pivotedOpeBySexo: {
      loading: false,
      data: [],
      error: null
   },
   pivotedOpeByModalidad:{
      loading: false,
      data: [],
      error: null
   },
   opeByCustomFilterToExcel: {
      loading: false,
      data: [],
      error: null
   }
}

export default function operativoReducer(state = initialValues, { type, payload }) {
   switch (type) {
   case INPUT_CHANGE:
      return { ...state, inputValues: { ...state.inputValues, ...payload } }
   case INPUTS_RESET:
      return { ...state, inputValues: { ...initialValues.inputValues } }
   case SAVE_OPERATIVO_LOADING:
      return { ...state, loading: true, data: [], error: null }
   case SAVE_OPERATIVO_SUCCESS:
      return { ...state, loading: false, data: payload, error: null }
   case SAVE_OPERATIVO_ERROR:
      return { ...state, loading: false, data: [], error: payload }
   case LIST_OPERATIVO_LOADING:
      return { ...state, loading: true, data: [], error: null }
   case LIST_OPERATIVO_SUCCESS:
      return { ...state, loading: false, data: payload, error: null }
   case LIST_OPERATIVO_ERROR:
      return { ...state, loading: false, data: [], error: payload }
   case LIST_OPE_PIVOTED_ANUAL_LOADING:
      return { ...state, pivotedOpeAnual: { loading: true, data: [], error: null } }
   case LIST_OPE_PIVOTED_ANUAL_SUCCESS:
      return { ...state, pivotedOpeAnual: { loading: false, data: payload, error: null } }
   case LIST_OPE_PIVOTED_ANUAL_ERROR:
      return { ...state, pivotedOpeAnual: { loading: false, data: [], error: payload } }
   case LIST_INTERVENIDOS_PIVOTED_LOADING:
      return { ...state, pivotedIntervenidos: { loading: true, data: [], error: null } } 
   case LIST_INTERVENIDOS_PIVOTED_SUCCESS:
      return { ...state, pivotedIntervenidos: { loading: false, data: payload, error: null } } 
   case LIST_INTERVENIDOS_PIVOTED_ERROR:
      return { ...state, pivotedIntervenidos: { loading: false, data: [], error: payload } } 
   case LIST_TIPO_INFRACCION_PIVOTED_LOADING:
      return { ...state, pivotedTipoInfraccion: { loading: true, data: [], error: null } }
   case LIST_TIPO_INFRACCION_PIVOTED_SUCCESS:
      return { ...state, pivotedTipoInfraccion: { loading: false, data: payload, error: null } }
   case LIST_TIPO_INFRACCION_PIVOTED_ERROR:
      return { ...state, pivotedTipoInfraccion: { loading: false, data: [], error: payload } }
   case LIST_TIPO_OPERATIVO_PIVOTED_LOADING:
      return { ...state, pivotedTipoOperativo: { loading: true, data: [], error: null } }
   case LIST_TIPO_OPERATIVO_PIVOTED_SUCCESS:
      return { ...state, pivotedTipoOperativo: { loading: false, data: payload, error: null } }
   case LIST_TIPO_OPERATIVO_PIVOTED_ERROR:
      return { ...state, pivotedTipoOperativo: { loading: false, data: [], error: payload } }
   case UPDATE_OPE_NRO_INFO_LOADING:
      return { ...state, loading: true, error: null }
   case UPDATE_OPE_NRO_INFO_SUCCESS:
      return { ...state, loading: false, data: payload, error: null }
   case UPDATE_OPE_NRO_INFO_ERROR:
      return { ...state, loading: false, data: [], error: payload }
   case LIST_OPE_PIVOTED_LOADING:
      return { ...state, pivotedOpe: { loading: true, data: [], error: null } }
   case LIST_OPE_PIVOTED_SUCCESS:
      return { ...state, pivotedOpe: { loading: false, data: payload, error: null } }
   case LIST_OPE_PIVOTED_ERROR:
      return { ...state, pivotedOpe: { loading: false, data: [], error: payload } }
   case LIST_OPE_PIVOTED_NACIONALIDAD_LOADING:
      return { ...state, pivotedOpeByNacionalidad: { loading: true, data: [], error: null } }
   case LIST_OPE_PIVOTED_NACIONALIDAD_SUCCESS:
      return { ...state, pivotedOpeByNacionalidad: { loading: false, data: payload, error: null } }
   case LIST_OPE_PIVOTED_NACIONALIDAD_ERROR:
      return { ...state, pivotedOpeByNacionalidad: { loading: false, data: [], error: payload } }
   case LIST_OPE_PIVOTED_SEXO_LOADING:
      return { ...state, pivotedOpeBySexo: { loading: true, data: [], error: null } }
   case LIST_OPE_PIVOTED_SEXO_SUCCESS:
      return { ...state, pivotedOpeBySexo: { loading: false, data: payload, error: null } }
   case LIST_OPE_PIVOTED_SEXO_ERROR:
      return { ...state, pivotedOpeBySexo: { loading: false, data: [], error: payload } }
   case LIST_OPE_PIVOTED_MODALIDAD_LOADING:
      return { ...state, pivotedOpeByModalidad: { loading: true, data: [], error: null } }
   case LIST_OPE_PIVOTED_MODALIDAD_SUCCESS:
      return { ...state, pivotedOpeByModalidad: { loading: false, data: payload, error: null } }
   case LIST_OPE_PIVOTED_MODALIDAD_ERROR:
      return { ...state, pivotedOpeByModalidad: { loading: false, data: [], error: payload } }
   case LIST_OPE_BY_FILTER_TO_EXCEL_LOADING:
      return { ...state, opeByCustomFilterToExcel: { loading: true, data: [], error: null } }
   case LIST_OPE_BY_FILTER_TO_EXCEL_SUCCESS:
      return { ...state, opeByCustomFilterToExcel: { loading: false, data: [], error: null } }
   case LIST_OPE_BY_FILTER_TO_EXCEL_ERROR:
      return { ...state, opeByCustomFilterToExcel: { loading: false, data: [], error: payload } }
   case RESET_OPE_BY_FILTER_TO_EXCEL:
      return { ...state, opeByCustomFilterToExcel: { loading: false, data: [], error: null } }
   case LIST_OPE_JZ_LOADING:
      return { ...state, operativoJZ: { loading: true, data: [], error: null } }
   case LIST_OPE_JZ_SUCCESS:
      return { ...state, operativoJZ: { loading: false, data: payload, error: null } }
   case LIST_OPE_JZ_ERROR:
      return { ...state, operativoJZ: { loading: false, data: [], error: payload } }
   default:
      return state
   }
}