import React from 'react'
import AsignarProcedimientoNac from 'components/AsignarProcedimientoNac'
import RegistrarProcedimiento from 'components/RegistrarProcedimientoNac'
import Calendar from 'components/Calendar'


export const optComponents = {
   registrarProcedimiento: <RegistrarProcedimiento />,
   asignarProcedimientoNac: <AsignarProcedimientoNac />,
   evaluarProcedimientoNac: <Calendar />,
}