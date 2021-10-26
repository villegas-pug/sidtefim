import React from 'react'

import useAuth from 'hooks/useAuth'

import SimpleCard from 'components/SimpleCard'
import Menu from 'components/Menu'

import { modulo } from 'constants/components'

const { PROCESOS } = modulo

function ProcesosMod() {

   /*» HOOK'S  */
   const { submodAuthenticated } = useAuth()

   return (
      <Menu>
         {
            submodAuthenticated[PROCESOS]?.map((props, i) => (
               <SimpleCard key={i} {...props} />
            ))
         }
      </Menu>
   )
}

export default React.memo(ProcesosMod)