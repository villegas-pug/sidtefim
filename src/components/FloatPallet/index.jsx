import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'

const Body = styled.div`
   /* outline: 1px solid #999; */
   position: fixed;
   right: 0;
   top: 4.5rem;
   height: ${({ height }) => height && `${height}rem`};
   padding: .3rem;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   z-index: 100;
   border-radius: .5rem;
`

const useStyle = makeStyles({
   iconButton:{
      backgroundColor: '#fff'
   }
})

export default function FloatPallet({ children, ...rest }) {
   /*» HOOK'S  */
   const classes = useStyle()

   return (
      <>
         <Body
            {...rest}
         >
            {
               children(classes)
            }
         </Body>
      </>
   )
}

FloatPallet.propTypes = {
   children: PropTypes.any.isRequired
}