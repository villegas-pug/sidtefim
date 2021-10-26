/*» PROCEDIMIENTO: Registrar Datos...  */

export const ACTULIZAR_INPUTVALUES_PROCNAC = 'ACTULIZAR_INPUTVALUES_PROCNAC'
export const LIMPIAR_INPUTVALUES_PROCNAC = 'LIMPIAR_INPUTVALUES_PROCNAC'

export const actualizarInpuValuesProcNac = (payload) => ({ type: ACTULIZAR_INPUTVALUES_PROCNAC, payload })
export const limpiarInpuValuesProcNac = () => ({ type: LIMPIAR_INPUTVALUES_PROCNAC })