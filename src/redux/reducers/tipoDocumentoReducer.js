const initialState = {
   loading: false,
   data: [
      { idTipoDocumento: 'MEMORANDUM', descripcion: 'MEMORANDUM' },
      { idTipoDocumento: 'OFICIO', descripcion: 'OFICIO' },
      { idTipoDocumento: 'CARTA', descripcion: 'CARTA' },
   ],
   error: null
}

export default function tipoDocumentoReducer(state = initialState, { type }) {
   switch (type) {
   default:
      return state
   }
}