import React from 'react'
import { useState, useEffect, useRef } from 'react'

import { components } from 'config/components'

import useAuth from './useAuth'

import { ITEM } from 'constants/componentType'

export default function useItem(){

   /*» HOOK'S'  */
   const pathName = useRef(window.location.pathname.split('/'))
   const [items, setItems] = useState([])

   /*» CUSTOM - HOOK'S'  */
   const { userCredentials } = useAuth()
   
   /*» EFFECT'S' */
   useEffect(() => {
      const mod = `/${pathName.current[2]}`
      const submod = `/${pathName.current[3]}`
      setItems(
         userCredentials.usrProcedimiento
            .filter(({procedimiento : { rutaMod, rutaSubmod, tipo }}) => 
               rutaMod === mod && rutaSubmod === submod && tipo === ITEM)
            .map(({ procedimiento }) => procedimiento)
      )
   }, [userCredentials])

   /*» RENDER-METHOD'S  */
   const renderItem = (key, props = {}) => {
      const Item = items.some(({ nombre }) => nombre === key) ? components[key] : null
      return Item ? <Item {...props} /> : <></>
   }

   return {
      items,
      renderItem
   }
}