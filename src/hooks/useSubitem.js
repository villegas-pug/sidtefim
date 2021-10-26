import { useEffect, useState } from 'react'

import useAuth from './useAuth'

import { SUB_ITEM } from 'constants/componentType'

export default function useSubitem(itemName){
   
   /*» HOOK'S  */
   const [subitems, setSubitems] = useState([])

   /*» CUSTOM-HOOK  */
   const { componentsAuth } = useAuth()

   /*» EFFECT'S  */
   useEffect(() => {
      setSubitems(componentsAuth.filter(({tipo, refItem}) => 
         tipo === SUB_ITEM && refItem.toUpperCase() === itemName.toUpperCase()))
   }, [componentsAuth])

   return {
      subitems
   }
}