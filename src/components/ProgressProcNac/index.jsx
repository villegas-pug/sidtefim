import React from 'react'
import { optEtapaProcNac } from 'constants/optEtapaProcNac'
import _ from 'lodash'
import { Steps } from 'antd'

export default function ProgressProcNac({ current }) {
   const { Step } = Steps
   return (
      <>
         <Steps size='small' current={current - 1}>
            {
               optEtapaProcNac.map(({ id, etapa }) => (
                  <Step key={id} title={etapa} />
               ))
            }
         </Steps>
      </>
   )
}