import {
   LIST_EMPRESA_LOADING,
   LIST_EMPRESA_SUCCESS,
   LIST_EMPRESA_ERROR
} from 'redux/types/empresaType'

const initialValues = {
   loading: false,
   data: [],
   error: null
}

export default function empresaReducer(state = initialValues, { type, payload }) {
   switch (type) {
   case LIST_EMPRESA_LOADING:
      return { loading: true, data: [], error: null }
   case LIST_EMPRESA_SUCCESS:
      return { loading: false, data: payload, error: null }
   case LIST_EMPRESA_ERROR:
      return { loading: false, data: [], error: payload }
   default:
      return state
   }
}