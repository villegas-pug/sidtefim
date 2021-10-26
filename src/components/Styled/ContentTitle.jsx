import React from 'react'
import styled from 'styled-components'
import { fontFamily } from 'config/font'

const ContentTitle = styled.title`
   display: block;
   font-family: ${fontFamily.ContentTitle};
   font-size: 1.5rem;
   font-weight: 1000;
   text-align: center;
   color: #999;
   padding-bottom: 1rem;
   text-transform: uppercase;
   letter-spacing: 3px;
`

export default function ({ title }) {
   return (
      <ContentTitle>{title}</ContentTitle>
   )
}