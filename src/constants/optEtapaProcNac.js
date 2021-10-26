import React from 'react'
import { Progress } from 'antd'

export const optEtapaProcNac = [
   { id: 1, etapa: 'REGISTRO DE DATOS', progress: <Progress percent={30} size='small' status='active' /> },
   { id: 2, etapa: 'EVALUACIÓN', progress: <Progress percent={60} size='small' status='active' /> },
   { id: 3, etapa: 'ENTREGA DE TITULO', progress: <Progress percent={100} size='small' /> }
]