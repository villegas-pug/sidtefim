import React from 'react'

import SimpleCard from 'components/SimpleCard'
import Menu from 'components/Menu'

import { modulo } from 'constants/components'
import useAuth from 'hooks/useAuth'

const { GESTION_TRAMITES } = modulo

export default function GestionTramiteMod() {

   /*» HOOK'S  */
   const { submodAuthenticated } = useAuth()

   return (
      <Menu>
         {
            submodAuthenticated[GESTION_TRAMITES]?.map((props, i) => (
               <SimpleCard key={i} {...props} />
            ))
         }
      </Menu>
   )
}