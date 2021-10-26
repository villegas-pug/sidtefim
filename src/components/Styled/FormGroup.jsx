import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FormGroup = styled.div`
   display: inline-block;
   padding: .5rem;
   min-height: 4rem;
`
export default function MyFormGroup({ children }) {
   return (
      <FormGroup>
         {children}
      </FormGroup>
   )
}

MyFormGroup.propTypes = {
   children: PropTypes.any.isRequired
}