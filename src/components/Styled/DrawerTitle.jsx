import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontFamily } from 'config/font'

const DrawerTitle = styled.title`
   display: block;
   font-family: ${fontFamily.DrawerTitle};
   font-weight: 100;
   font-size: ${({ size }) => size ? `${size}rem` : '1.2rem'};
   color: #999;
   text-align: right;   
`

export default function MyDrawerTitle({title, ...rest}) {
   return (
      <DrawerTitle
         {...rest}
      >
         {title}
      </DrawerTitle>
   )
}

MyDrawerTitle.propTypes = {
   title: PropTypes.string.isRequired
}