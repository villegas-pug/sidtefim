import {
   NEXT_STAGE_NUEVO_OPERATIVO,
   PREV_STAGE_NUEVO_OPERATIVO,
   RESET_STAGES_NUEVO_OPERATIVO
} from 'redux/types/stagesTypes'

export const nextStageNuevoOperativo = () => ({ type: NEXT_STAGE_NUEVO_OPERATIVO })
export const prevStageNuevoOperativo = () => ({ type: PREV_STAGE_NUEVO_OPERATIVO })
export const resetStagesNuevoOperativo = () => ({ type: RESET_STAGES_NUEVO_OPERATIVO })