import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Flash from 'react-reveal/Flash'

const Menu = styled.body`
   display: flex;
   height: calc(100vh - 5.5rem);
   justify-content: space-around;
   align-items: center;
   flex-wrap: wrap;
   gap: .5rem;
`

export default function MyMenu({ children }) {
   return (
      <Flash>
         <Menu>
            {children}
         </Menu>
      </Flash>
   )
}

MyMenu.propTypes = {
   children: PropTypes.any.isRequired
}