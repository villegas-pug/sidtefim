import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
   constructor(props){
      super(props)
      this.state = {
         hasError: false,
      }
   }

   /* static getDerivedStateFromError(){
      return {
         hasError: true,
      }
   } */

   render() {
      if(this.state.hasError) return <h1>Oops!...! Ocurrió un error...</h1>
      return <>{this.props.children}</>
   }
}

ErrorBoundary.propTypes = {
   children: PropTypes.any.isRequired
}