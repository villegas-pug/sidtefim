import { useState } from 'react'

import Noty from 'helpers/noty'
import { ERROR } from 'constants/levelLog'

export default function useLocalStorage(key){

   /*» HOOK'S  */
   const [value, setValue] = useState(() => {
      try {
         return window.localStorage.getItem(key) 
            ? JSON.stringify(window.localStorage.getItem(key)) 
            : null
      } catch (err) {
         Noty(ERROR, err)
         return null
      }
   })

   /*» HANDLER'S  */
   const setValueToLocalStorage = (newItem) => (window.localStorage.setItem(key, newItem), setValue(newItem))
   const removeItemInLocalStorage = () => { window.localStorage.removeItem(key) }
   const removeAllLocalStorage = () => { window.localStorage.clear() }

   return [
      value,
      setValueToLocalStorage,
      removeItemInLocalStorage,
      removeAllLocalStorage
   ]
}