import { 
   FIND_USER_BY_LOGIN_ERROR, 
   FIND_USER_BY_LOGIN_LOADING, 
   FIND_USER_BY_LOGIN_SUCCESS, 
   LOGIN_ERROR, 
   LOGIN_LOADING,
   LOGIN_SUCCESS,
   LOGOUT_SUCCESS,
   UPDATE_PASSWORD_BY_LOGIN_ERROR,
   UPDATE_PASSWORD_BY_LOGIN_LOADING,
   UPDATE_PASSWORD_BY_LOGIN_SUCCESS
} from 'redux/types/usuarioType'

import { AUTHORIZATION, USER_AUTH } from 'constants/localStorage'

const initialState = {
   loading: false,
   userAuth: window.localStorage.getItem(USER_AUTH),
   token: window.localStorage.getItem(AUTHORIZATION),
   userCredentials: {},
   error: null,
}

export default function usuarioReducer(state = initialState, { type, payload }) {
   switch (type) {
   case FIND_USER_BY_LOGIN_LOADING:
      return { ...state, loading: true, userCredentials: {}, error: null }
   case FIND_USER_BY_LOGIN_SUCCESS:
      return { ...state, loading: false, userCredentials: payload.reduce((prev, next) => (prev = next, prev), {}), error: null }
   case FIND_USER_BY_LOGIN_ERROR:
      return { ...state, loading: false, userCredentials: {}, error: payload }
   case LOGIN_LOADING:
      return { ...state, loading: true, error: null }
   case LOGIN_SUCCESS:
      return { 
         ...state,
         token: window.localStorage.getItem(AUTHORIZATION), 
         userAuth: window.localStorage.getItem(USER_AUTH), 
         loading: false,
         error: null 
      }
   case LOGIN_ERROR:
      return { ...state, loading: false, error: payload }
   case UPDATE_PASSWORD_BY_LOGIN_LOADING:
      return { ...state, loading: true, error: null }
   case UPDATE_PASSWORD_BY_LOGIN_SUCCESS:
      return { ...state, loading: false, error: null }
   case UPDATE_PASSWORD_BY_LOGIN_ERROR:
      return { ...state, loading: false, error: payload }
   case LOGOUT_SUCCESS:
      return {...state, token: '', userAuth: '', userCredentials: {}}
   default:
      return state
   }
}