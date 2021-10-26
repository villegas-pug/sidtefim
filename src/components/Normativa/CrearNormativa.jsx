import React, { } from 'react'
import {
   Button,
   Box
} from '@material-ui/core'
import Flash from 'react-reveal/Flash'
import { CreateNewFolder } from '@material-ui/icons'
import Accordion from 'components/Accordion'
import { useSelector } from 'react-redux'

export default function CrearGrupo() {
   /*» HOOK'S STORE  */
   const { lineamiento: { groups } } = useSelector(store => store)

   /*» HOOK'S  */

   /*» HANDLER'S  */

   /*» ARGUMENT'S : `optSpeedDialAction`  */

   const handleOnClickCrearNormativa = () => {
   }

   return (
      <>
         <Flash>
            <>
               {/*» HEADER... */}
               <Box display='flex' p={1}>
                  <Box flexGrow={1}></Box>
                  <Box flexGrow={0}>
                     <Button
                        variant='contained'
                        size='large'
                        onClick={handleOnClickCrearNormativa}
                     >
                        <CreateNewFolder />
                        CREAR GRUPO NORMATIVO
                     </Button>
                  </Box>
               </Box>

               {/*» BODY... */}
               <Box display='flex' mt={1} justifyContent='center'>
                  <Box width='100%'>
                     {
                        <Accordion groups={groups} />
                     }
                  </Box>
               </Box>
            </>
         </Flash>
      </>
   )
}