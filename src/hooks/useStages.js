import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
   nextStageNuevoOperativo,
   prevStageNuevoOperativo,
   resetStagesNuevoOperativo
} from 'redux/actions/stagesAction'
import { handleInputsReset } from 'redux/actions/operativoAction'

export default function useStages(subModName) {/*» SUB-MODULE... */
   /*» STORE HOOK'S... */
   const dispatch = useDispatch()
   const { 
      stages: stagesDb,
   } = useSelector(store => store)

   /*» HOOK'S  */
   const [{ currentStage, stages }, setCurrentSubmod] = useState({})

   /*» EFECT'S  */
   useEffect(() => {
      Array.of(stagesDb)
         .map(Object.values)
         .map(submod => {
            Object.values(submod).map((item) => {
               const resultSubmod = Object.values(item).find(({ submodName }) => submodName === subModName)
               if (resultSubmod) setCurrentSubmod(resultSubmod)
            })
         })
   }, [stagesDb])

   /*» HANDLER'S  */
   const handleNextStage = () => { dispatch(nextStageNuevoOperativo()) }
   const handlePrevStage = () => { dispatch(prevStageNuevoOperativo()) }
   const handleResetStages = () => {
      dispatch(resetStagesNuevoOperativo())
      dispatch(handleInputsReset())
   }

   /*» DEPENDENCY'S  */
   const componentByCurrentStage = useMemo(() => stages?.find(({ stage }) => stage === currentStage).component, [currentStage])

   return {
      stages,
      currentStage,
      componentByCurrentStage,

      handleNextStage,
      handlePrevStage,
      handleResetStages,
   }
}
