import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
   Grid,
   Box,
   ButtonGroup,
   Button,
   IconButton,
   Avatar
} from '@material-ui/core'
import { 
   SkipPrevious, 
   SkipNext,
   Home
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import useItem from 'hooks/useItem'
import useAuth from 'hooks/useAuth'

import { modulo } from 'constants/components'

import PendientesRptList from 'components/Nacionalizacion/PendientesRptList'

const Body = styled.body`
   height: 85vh;
   display: flex;
   justify-content: center;
   align-items: center;
`

const useStyle = makeStyles({
   gridContainer: {
      height: '100%',
   },
   gridAside: {
      borderRight: '1px solid #999'
   }
})

export default function NacionalizacionRptSubMod({ history }) {

   /*» HOOK'S */
   const [item, setItem] = useState(null)


   /*» CUSTOM-HOOK'S  */
   const classes = useStyle()
   const { items, renderItem } = useItem()
   const { pathAuthenticated } = useAuth()
   
   /*» EFFECT'S  */

   /*» HANDLER'S  */
   const handlePrevNav = () => setItem(null)
   const handleRedirectMain = () => {history.push(pathAuthenticated[modulo.REPORTES])}

   /*» RENDERING CONDITIONAL  */
   
   return (
      <Body>
         <Grid 
            container 
            spacing={5} 
            className={classes.gridContainer}
         >

            {/*» ASIDE  */}
            <Grid 
               item 
               container 
               xs={2} 
               justify='center' 
               alignItems='flex-start'
               className={classes.gridAside}
            >
               <Box 
                  display='flex' 
                  height={80} 
                  flexDirection='column' 
                  alignItems='center' 
                  justifyContent='space-between'
               >
                  <Avatar>
                     <IconButton
                        onClick={() => handleRedirectMain()}
                     >
                        <Home fontSize='large' />
                     </IconButton>
                  </Avatar>
                  <ButtonGroup
                     color='primary' 
                     variant='contained'
                  >
                     <Button
                        disabled={!item}
                        startIcon={<SkipPrevious />}
                        onClick={() => handlePrevNav()}
                     ></Button>
                     <Button endIcon={<SkipNext />} disabled></Button>
                  </ButtonGroup>
               </Box>
            </Grid>

            {/*» CONTENT  */}
            <Grid 
               item 
               xs={10}
            >
               {
                  item 
                     ? renderItem(item)
                     : <PendientesRptList items={items} setItem={setItem} />
               }
            </Grid>
         </Grid>
      </Body>
   )
}

NacionalizacionRptSubMod.propTypes = {
   history: PropTypes.object.isRequired
}