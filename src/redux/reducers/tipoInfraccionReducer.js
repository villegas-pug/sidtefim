const initialState = {
   loading: false,
   data: [
      { id: 'NO APLICA', description: 'NO APLICA' },
      { id: 'POR INGRESAR AL PAÍS SIN REALIZAR EL CONTROL MIGRATORIO', description: 'POR INGRESAR AL PAÍS SIN REALIZAR EL CONTROL MIGRATORIO' },
      { id: 'EXCESO DE PERMANENCIA', description: 'EXCESO DE PERMANENCIA' },
      { id: 'POR REALIZAR ACTIVIDADES QUE NO CORESPONDEN A LA CALIDAD MIGRATORIA, VISA O PERMISO ASIGNADO O DESNATURALIZARLA.', description: 'POR REALIZAR ACTIVIDADES QUE NO CORESPONDEN A LA CALIDAD MIGRATORIA, VISA O PERMISO ASIGNADO O DESNATURALIZARLA.' },
      { id: 'NO HABER REALIZADO EL CONTROL MIGRATORIO', description: 'NO HABER REALIZADO EL CONTROL MIGRATORIO' },
   ],
   error: null
}

export default function paisReducer(state = initialState, { type }) {
   switch (type) {
   default:
      return state
   }
}