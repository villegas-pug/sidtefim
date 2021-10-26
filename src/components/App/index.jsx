import React, { useEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import PrivateRoutes from 'routers/PrivateRoutes'
import PublicRoutes from 'routers/PublicRoutes'
import DashboardRouters from 'routers/DashboardRoutes'
import Portal from 'pages/Portal'
import Drawer from 'components/Drawer'

import useAuth from 'hooks/useAuth'

import './style.css'

export default function App() {

   /*» CUSTOM HOOK'S...  */
   const { 
      isAuthenticated, 
      token, 
      handleFindUserByLogin, 
   } = useAuth()

   /*» EFFECT'S:  */
   useEffect(() => { handleFindUserByLogin() }, [token])

   return (
      <BrowserRouter basename='/sidtefim'>
         <Drawer>
            <Switch>
               <PublicRoutes isAuthenticated={isAuthenticated} component={Portal} path='/portal' exact />
               <PrivateRoutes isAuthenticated={isAuthenticated} component={DashboardRouters} path='/' />
            </Switch>
         </Drawer>
      </BrowserRouter>
   )
}