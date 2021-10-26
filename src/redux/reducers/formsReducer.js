import {
   ACTULIZAR_INPUTVALUES_PROCNAC,
   LIMPIAR_INPUTVALUES_PROCNAC
} from 'redux/actions/formsAction'


export const initialValues = {
   inputValuesProcNac: {
      idProcNac: '',
      documento: '',
      numeroDocumento: '',
      numeroTramite: '',
      fechaInicioTramite: '',
      administrado: '',
      nacionalidad: '',
      domicilio: '',
      distrito: '',
      correo: '',
      telefono: '',
      tipoSolicitud: '',
      tipoTramite: '',
      fechaRegistro: '',
      fechaAsignacionTramite: '',
      estado: '',
      completo: '',
   }
}

export default function formsReducer(state = initialValues, { type, payload }) {
   switch (type) {
   case ACTULIZAR_INPUTVALUES_PROCNAC:
      return { ...state, inputValuesProcNac: { ...payload } }
   case LIMPIAR_INPUTVALUES_PROCNAC:
      return { ...state, inputValuesProcNac: initialValues.inputValuesProcNac }
   default:
      return state
   }
}