import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export default function PublicRoutes({ 
   isAuthenticated, 
   path,
   component: Component,
   ...rest
}){
   return (
      <>
         <Route
            {...rest}
            path={path}
            render={(props) => (
               !isAuthenticated
                  ? <Component { ...props } />
                  : <Redirect to='/' />
            )}
         />
      </>
   )
}

PublicRoutes.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   path: PropTypes.string.isRequired,
   component: PropTypes.func.isRequired
}