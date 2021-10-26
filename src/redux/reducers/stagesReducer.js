import React from 'react'
import {
   NEXT_STAGE_NUEVO_OPERATIVO,
   PREV_STAGE_NUEVO_OPERATIVO,
   RESET_STAGES_NUEVO_OPERATIVO
} from 'redux/types/stagesTypes'

import FirstStage from 'components/NuevoOperativo/FirstStage'
import SecondStage from 'components/NuevoOperativo/SecondStage'

const initialState = {
   procesos: {/*» MOD */
      nuevoOperativo: {/*» SUB-MOD  */
         submodName: 'NuevoOperativoSubMod',
         currentStage: 1,
         stages: [
            { stage: 1, description: 'Datos Operativo', component: <FirstStage /> },
            { stage: 2, description: 'Detalle Operativo', component: <SecondStage /> }
         ]
      },
   },
}

export default function stagesReducer(state = initialState, { type }) {
   const { procesos: { nuevoOperativo: { currentStage, stages } } } = state
   switch (type) {
   case NEXT_STAGE_NUEVO_OPERATIVO:
      return {
         ...state, procesos: {
            ...state.procesos,
            nuevoOperativo: {
               ...state.procesos.nuevoOperativo,
               currentStage: currentStage === stages.length ? currentStage : currentStage + 1,
            }
         }
      }
   case PREV_STAGE_NUEVO_OPERATIVO:
      return {
         ...state,
         procesos: {
            ...state.procesos,
            nuevoOperativo: {
               ...state.procesos.nuevoOperativo,
               currentStage: currentStage === 1 ? currentStage : currentStage - 1,
            }
         }
      }
   case RESET_STAGES_NUEVO_OPERATIVO:
      return {
         ...state, procesos: {
            ...state.procesos,
            nuevoOperativo: {
               ...state.procesos.nuevoOperativo,
               currentStage: 1
            }
         }
      }
   default:
      return state
   }
}