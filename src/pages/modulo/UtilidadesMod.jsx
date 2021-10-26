import React from 'react'

import SimpleCard from 'components/SimpleCard'
import Menu from 'components/Menu'

import useAuth from 'hooks/useAuth'

import { modulo } from 'constants/components'

const { UTILIDADES } = modulo

export default function UtilidadesMod() {

   /*-> HOOK'S ... */
   const { submodAuthenticated } = useAuth()

   return (
      <Menu>
         {
            submodAuthenticated[UTILIDADES]?.map((props, i) => (
               <SimpleCard key={i} {...props} />
            ))
         }
      </Menu>
   )
}
