import React from 'react'

import useAuth from 'hooks/useAuth'

import SimpleCard from 'components/SimpleCard'
import Menu from 'components/Menu'

import { modulo } from 'constants/components'

const { REPORTES } = modulo

export default function ReportesMod() {

   /*» HOOK'S  */
   const { submodAuthenticated } = useAuth()

   return (
      <Menu>
         {
            submodAuthenticated[REPORTES]?.map((props, i) => (
               <SimpleCard key={i} {...props} />
            ))
         }
      </Menu>
   )
}