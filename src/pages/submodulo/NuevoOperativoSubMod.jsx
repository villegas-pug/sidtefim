import React, { useEffect } from 'react'

import SteperMui from 'components/StepperMui'

import useStages from 'hooks/useStages'
import useEmpresa from 'hooks/useEmpresa'
import useDistrito from 'hooks/useDistrito'
import usePais from 'hooks/usePais'

export default function NuevoOperativoSubMod() {

   /*» CUSTOM-HOOK'S  */
   const { stages, currentStage, componentByCurrentStage } = useStages('NuevoOperativoSubMod')
   const { handleListEmpresa } = useEmpresa()
   const { handleListDistrito } = useDistrito()
   const { handleListPais } = usePais()

   /*» EFFECT'S:  */
   useEffect(() => { handleListEmpresa() }, [])
   useEffect(() => { handleListDistrito() }, [])
   useEffect(() => { handleListPais() }, [])

   return (
      <>
         <>
            <SteperMui activeStep={currentStage} steps={stages} />
         </>
         {
            componentByCurrentStage
         }
      </>
   )
}
