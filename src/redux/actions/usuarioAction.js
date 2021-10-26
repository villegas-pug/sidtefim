import { api } from 'config/axios'
import {
   SUCCESS,
   WARNING,
   ERROR,
} from 'constants/levelLog'
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
import Noty from 'helpers/noty'

import { AUTHORIZATION, USER_AUTH } from 'constants/localStorage'

const findUserByLoginLoading = () => ({ type: FIND_USER_BY_LOGIN_LOADING })
const findUserByLoginSuccess = (payload) => ({ type: FIND_USER_BY_LOGIN_SUCCESS, payload })
const findUserByLoginError = (payload) => ({ type: FIND_USER_BY_LOGIN_ERROR, payload })

const loginLoading = () => ({ type: LOGIN_LOADING })
const loginSuccess = () => ({ type: LOGIN_SUCCESS })
const loginError = (payload) => ({type: LOGIN_ERROR, payload})

const updatePasswordByLoginLoading = () => ({type: UPDATE_PASSWORD_BY_LOGIN_LOADING})
const updatePasswordByLoginSuccess = () => ({type: UPDATE_PASSWORD_BY_LOGIN_SUCCESS})
const updatePasswordByLoginError = (payload) => ({type: UPDATE_PASSWORD_BY_LOGIN_ERROR, payload})

export const logout = () => (window.localStorage.clear(), { type: LOGOUT_SUCCESS })

export const findUserByLogin = () => async (dispatch, getStore) => {
   try {
      dispatch(findUserByLoginLoading())
      const { usuario: { userAuth, token  } } = getStore()
      const { data: { levelLog, data, message } } = await api({
         method: 'GET',
         url: `/microservicio-usuario/findByLogin/${userAuth}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })
   
      switch (levelLog) {
      case SUCCESS:
         dispatch(findUserByLoginSuccess(data))
         break
      case WARNING:
         dispatch(findUserByLoginError(message))
         break
      case ERROR:
         dispatch(findUserByLoginError(message))
         break
      }
   } catch (err) {
      dispatch(findUserByLoginError(err))
   }
}

export const login = (cred) => async (dispatch) => {
   try {
      dispatch(loginLoading())
      const { status, headers } = await api({
         method: 'POST',
         url: '/microservicio-usuario/login',
         data: cred,
      })
      
      const { token, userauth, usernameauth } = headers

      switch (status) {
      case 200:
         window.localStorage.setItem(AUTHORIZATION, `Bearer ${token}`)
         window.localStorage.setItem(USER_AUTH, userauth)
         Noty(SUCCESS, `¡Bienvenido ${usernameauth}!`)
         dispatch(loginSuccess())
         break
      }
   } catch (err) {
      dispatch(loginError(err))
      Noty(WARNING, '¡Usuario o contraseña invalidos!')
   }
}

export const updatePasswordByLogin = (cred) => async (dispatch, getStore) => {
   try {
      dispatch(updatePasswordByLoginLoading())
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message } } = await api({
         method: 'PUT',
         url: '/microservicio-usuario/updateAccount',
         data: cred,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch(updatePasswordByLoginSuccess())
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(updatePasswordByLoginError())
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(updatePasswordByLoginError())
         Noty(ERROR, message)
         break
      }
   } catch (err) {
      dispatch(updatePasswordByLoginError(err))
      Noty(ERROR, err)
   }
}