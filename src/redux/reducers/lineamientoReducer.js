const initialState = {
   groups: [
      {
         name: 'Ley y Reglamento',
         items: ['Ley y Reglamento 01', 'Ley y Reglamento 02']
      },
      {
         name: 'Normativa legal vigente',
         items: ['Norma 01', 'Norma 02', 'Norma 03']
      },
   ]
}

export default function lineamientoReducer(state = initialState, { type }) {
   switch (type) {
   case 'test':
      return {}
   default:
      return state
   }
}
