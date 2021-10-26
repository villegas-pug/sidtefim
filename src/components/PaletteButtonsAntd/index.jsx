import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from '@material-ui/core'
import { Button } from 'antd'

const PaletteButtonsAntd = styled.div`
   width: 2.5rem;
   display: flex;
   flex-flow:column;
   justify-content: space-around;
   z-index: 50;
`

export default function MyPaletteButtonsAntd({ optFloatPalette, ...rest }) {

   return (
      <PaletteButtonsAntd {...rest}>
         {
            optFloatPalette.map(({ title, icon: Icon, loading, handleClick }) => (
               <Tooltip key={title} title={title} placement='rightTop'>
                  <Button
                     shape='circle'
                     type='ghost'
                     icon={<Icon />}
                     loading={loading}
                     size='large'
                     onClick={handleClick}
                  />
               </Tooltip>
            ))
         }
      </PaletteButtonsAntd>
   )
}

MyPaletteButtonsAntd.propTypes = {
   optFloatPalette: PropTypes.object.isRequired
}