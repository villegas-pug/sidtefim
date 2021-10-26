import { useState, useRef, useEffect } from 'react'
import { breakpoints, screens as screenDb } from 'constants/breakpoints'

const findScreen = (outerWidth) => breakpoints.find(({ measure }) => outerWidth >= measure)?.name

export default function useBreakpoints() {

   const screens = useRef(screenDb)
   const [currentScreen, setCurrentScreen] = useState(findScreen(window.screen.width))

   /*» EFFECT'S  */
   useEffect(() => { window.addEventListener('resize', findScreenByBreakPoint)}, [])

   /*» HANDLER'S   */
   const unsuscribeScreenResizeListener = () => { window.removeEventListener('resize', findScreenByBreakPoint)}
   const findScreenByBreakPoint = ({ target: { outerWidth } }) => { setCurrentScreen(findScreen(outerWidth)) }

   return {
      currentScreen,
      screens: screens.current,

      unsuscribeScreenResizeListener
   }
}