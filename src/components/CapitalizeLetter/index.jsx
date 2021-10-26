import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const MyCapitalizeLetter = styled.title`
   font-size: ${({ size }) => size ? `${size}rem` : '1rem'};
   text-transform: capitalize;
`

export default function CapitalizeLetter({ title, ...rest }) {
   return (
      <MyCapitalizeLetter {...rest}>{title}</MyCapitalizeLetter>
   )
}

CapitalizeLetter.propTypes = {
   title: PropTypes.string.isRequired
}