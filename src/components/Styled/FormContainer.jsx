import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FormContainer = styled.form`
   padding: 0 .5rem;
   margin: auto;
   display: flex;
   flex-wrap: wrap;
   justify-content: flex-start;
   border: 1px solid #999;
   border:0;

   div, label{
      margin-left: .5rem;
   }

`

export default function MyFormContainer({children, handleSubmit}) {
   return (
      <FormContainer
         onSubmit={handleSubmit}
      >
         {children}
      </FormContainer>
   )
}

MyFormContainer.propTypes = {
   children: PropTypes.any.isRequired, 
   handleSubmit: PropTypes.func.isRequired
}