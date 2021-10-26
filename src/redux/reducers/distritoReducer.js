import {
   LIST_DISTRITO_LOADING,
   LIST_DISTRITO_SUCCESS,
   LIST_DISTRITO_ERROR
} from 'redux/types/distritoType'

const initialState = {
   loading: false,
   data: [],
   error: null
}

export default function distritoReducer(state = initialState, { type, payload }) {
   switch (type) {
   case LIST_DISTRITO_LOADING:
      return { loading: true, data: [], error: null }
   case LIST_DISTRITO_SUCCESS:
      return { loading: false, data: payload, error: null }
   case LIST_DISTRITO_ERROR:
      return { loading: false, data: [], error: payload }
   default:
      return state
   }
}