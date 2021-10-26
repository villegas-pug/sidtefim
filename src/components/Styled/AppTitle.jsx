import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontFamily } from 'config/font'

const AppTitle = styled.title`
   display: block;
   font-family: ${fontFamily.DrawerTitle};
   font-size: ${({ size }) => (size ? `${size}rem` : '1.8rem')};
   color: ${({ color }) => (color ? color : '#000')};
   text-align: ${({ align }) => align ?? 'center'};
`

export default function MyAppTitle({name, ...rest}) {
   return (
      <AppTitle {...rest}>{name}</AppTitle>
   )
}

MyAppTitle.propTypes = {
   name: PropTypes.string.isRequired
}