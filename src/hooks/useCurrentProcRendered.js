import { useEffect, useRef, useState } from 'react'
import useAuth from './useAuth'

export default function useCurrentProcRendered(){

   /*» HOOK'S  */
   const subModPath = useRef(window.location.pathname.split('/')[3])
   const [currentProcRendered, setCurrentProcRendered] = useState({})
   const { componentsAuth } = useAuth()


   useEffect(() => {
      setCurrentProcRendered(
         componentsAuth.filter(({ rutaSubmod }) => rutaSubmod.replace('/', '') === subModPath.current)[0]
      )
   }, [componentsAuth])


   return {
      currentProcRendered
   }

}