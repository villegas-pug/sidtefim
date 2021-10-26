import React from 'react'
import { Route } from 'react-router-dom'
import { components } from 'config/components'
import useAuth from 'hooks/useAuth'

export default function DashboardRouters(){

   /*» CUSTOM HOOK'S  */
   const { redirectComponentsAuth } = useAuth()

   return (
      <>
         {
            redirectComponentsAuth?.map(({ idProcedimiento, nombre, rutaPrincipal }) => (
               <Route 
                  key={idProcedimiento} 
                  path={rutaPrincipal}
                  component={components[nombre]} 
                  exact 
               />
            ))
         }
      </>
   )
}