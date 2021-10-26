import React from 'react'
import {
   AccessTime,/*-> Pendiente  */
   Email, /*-> Asignado */
   Drafts, /*-> Leido  */
   CheckCircle,/*-> Aprobado  */
   Error, /*-> Obserbado  */
   Cancel,/*->Improcedente | Anulado  */
} from '@material-ui/icons'

export const optEstadoProcNac = [
   { id: 'P', descripcion: 'Pendiente', Icono: <AccessTime /> },
   { id: 'G', descripcion: 'Asigando', Icono: <Email /> },
   { id: 'L', descripcion: 'Leido', Icono: <Drafts /> },
   { id: 'A', descripcion: 'Aprobado', Icono: <CheckCircle /> },
   { id: 'O', descripcion: 'Observado', Icono: <Error /> },
   { id: 'I', descripcion: 'Improcedente', Icono: <Cancel /> },
   { id: 'R', descripcion: 'Anulado', Icono: <Cancel /> },
]