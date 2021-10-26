const initialValues = {
   loading: false,
   data: [
      { idTipo: 1, descripcion: 'Exceso de permancencia', activo: 1 },
      { idTipo: 2, descripcion: 'Ingreso ilegal', activo: 1 },
      { idTipo: 3, descripcion: 'Actos de corrupción', activo: 1 },
   ],
   error: null
}

export default function tipoOperativoReducer(state = initialValues, { type }) {
   switch (type) {
   case false:
      break

   default:
      return state
   }
}