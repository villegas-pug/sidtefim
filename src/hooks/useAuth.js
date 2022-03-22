import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
   findAllUser,
   findUserByLogin,
   login,
   logout,
   updatePasswordByLogin
} from 'redux/actions/usuarioAction'

import { 
   MODULO,
   SUB_MODULO,
   ITEM, 
   SUB_ITEM,
} from 'constants/componentType'
import { httpStatus } from 'constants/httpStatus'
import { SGTM } from 'constants/areas'
import { EVALUADOR } from 'constants/cargos'

import useHttpStatus from './useHttpStatus'

export default function useAuth(){

   /*» STORE-HOOK'S  */
   const { 
      loading: authLoading,
      token,
      userCredentials,
      users: {
         data: usersDb
      }
   } = useSelector(store => store.usuario)
   const dispatch = useDispatch()

   /*» HOOK'S... */
   const [componentsAuth, setComponentsAuth] = useState([])
   const [redirectComponentsAuth, setRedirectComponentsAuth] = useState([])
   const [modAuthenticated, setModAuthenticated] = useState([])
   const [submodAuthenticated, setSubmodAuthenticated] = useState([])
   const [pathAuthenticated, setPathAuthenticated] = useState([])
   const { status } = useHttpStatus()

   /*» EFFECT'S */
   useEffect(() => { status === httpStatus.FORBIDDEN && handleLogout() }, [status])

   useEffect(() => {
      Object.keys(userCredentials).length
         && setComponentsAuth(userCredentials.usrProcedimiento.map(({procedimiento}) => procedimiento))
   }, [userCredentials])

   useEffect(() => {
      componentsAuth.length
         && setRedirectComponentsAuth(
            componentsAuth
               .filter(({ tipo }) => tipo !== ITEM && tipo !== SUB_ITEM)
               .map((procedimiento) => procedimiento)
         )
   }, [componentsAuth])
   
   useEffect(() => {
      setPathAuthenticated(
         componentsAuth?.reduce((map, { nombre, rutaPrincipal }) => (map[nombre] = rutaPrincipal, map), {})
      )
   }, [componentsAuth])

   useEffect(() => {
      setModAuthenticated(componentsAuth?.filter(({ tipo }) => tipo === MODULO))
   }, [componentsAuth])

   useEffect(() => {
      let submod = {}
      modAuthenticated?.map(({ nombre: nombreMod, rutaMod: rutaModOfMap }) => {
         componentsAuth
            .filter(({ tipo }) => tipo === SUB_MODULO)
            .filter(({ rutaMod }) => rutaModOfMap === rutaMod)
            .map((record) => { 
               submod[nombreMod] = typeof(submod[nombreMod]) !== 'undefined' 
                  ? [...submod[nombreMod], record] 
                  : [record] 
            })
      }) 
      setSubmodAuthenticated(submod)
   }, [modAuthenticated])

   /*» HANDLER'S  */
   const handleFindAllUser = () => { dispatch(findAllUser()) }
   const handleFindUserByLogin = () => { dispatch(findUserByLogin()) }
   const handleLogin = (cred) => { dispatch(login(cred)) }
   const handleLogout = () => { dispatch(logout()) }
   const handleUpdatePasswordByLogin = (cred) => { dispatch(updatePasswordByLogin(cred)) }

   /*» DEP'S  */
   const evaluadorSgtmDb = useMemo(() => (usersDb.filter(({ area, cargo }) => area === SGTM && cargo === EVALUADOR)), [usersDb])



   return {
      usersDb,
      evaluadorSgtmDb,
      isAuthenticated: Boolean(Object.values(userCredentials).length),
      token,
      authLoading,
      userCredentials,

      componentsAuth,
      redirectComponentsAuth,/*» Components that rendered other components as MOD and SUB_MOD ... */
      modAuthenticated,
      submodAuthenticated,
      pathAuthenticated,

      handleFindAllUser,
      handleFindUserByLogin,
      handleUpdatePasswordByLogin,
      handleLogin,
      handleLogout
   }
}