import React, {useState, useMemo, useEffect} from 'react'
import { 
   GridOn,
   MultilineChart
} from '@material-ui/icons'
import {
   FormControl,
   FormHelperText,
   Typography, 
   ButtonGroup,
   Button,
} from '@material-ui/core'
import Flash from 'react-reveal/Flash'
import styled from 'styled-components'

import OperativoChartRpt from 'components/NavOperativoRptSubMod/OperativoChartRpt'
import OperativoGridRpt from 'components/NavOperativoRptSubMod/OperativoGridRpt'

import useDistrito from 'hooks/useDistrito'

const Nav = styled.nav`
   height: 85%;
   display: flex;
   justify-content: center;
   align-items: center;
`

export default function DashboardOperativoSubMod() {

   /*» HOOK'S */
   const [currentNavigation, setCurrentNavigation] = useState(null)

   /*» CUSTOM-HOOK'S  */
   const { handleListDistrito } = useDistrito()

   /*» EFFECT'S  */
   useEffect(() => { handleListDistrito() }, [])

   /*» DEPENDENCY'S  */
   const typeNavigation = useMemo(() => ([
      { name: 'chartRpt', component: <OperativoChartRpt handleCurrentNav={setCurrentNavigation} /> },
      { name: 'gridRpt', component: <OperativoGridRpt handleCurrentNav={setCurrentNavigation} /> },
   ]), [currentNavigation])

   /*» HANDLER'S  */
   const handleNavigation = (typeNav) => { setCurrentNavigation(typeNav) }

   return (
      <>
         {/*» NAVIGATION  */}
         {
            currentNavigation === null 
            && (
               <Nav>
                  <Flash>
                     <FormControl>
                        <ButtonGroup
                           variant='contained'
                           color='primary' 
                           size='large'
                        >
                           <Button
                              startIcon={<GridOn fontSize='large' />}
                              onClick={() => handleNavigation('gridRpt')}
                           >
                              <Typography variant="h4" color="initial">Reportes</Typography>
                           </Button>
                           <Button
                              startIcon={<MultilineChart fontSize='large' />}
                              onClick={() => handleNavigation('chartRpt')}
                           >
                              <Typography variant="h4" color="initial">Estadísticos</Typography>
                           </Button>
                        </ButtonGroup>
                        <FormHelperText>¡Selecciona el tipo de informe que desea visualizar!</FormHelperText>
                     </FormControl>
                  </Flash>
               </Nav>
            )
         }

         {/*» BODY  */}
         {
            typeNavigation.find(nav => nav.name === currentNavigation)?.component
         }
      </>
   )
}