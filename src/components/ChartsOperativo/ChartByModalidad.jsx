import React from 'react'
import PropTypes from 'prop-types'
import { 
   PieChart, 
   Pie, 
   Cell,
   Legend,
   ResponsiveContainer 
} from 'recharts'
import { 
   Button,
   Typography
} from '@material-ui/core'
import { PieChart as PieChartIcon } from '@material-ui/icons'
import styled from 'styled-components'

const Body = styled.body`
   grid-column: 2 / -1;
   grid-row: 1 / -1;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
`

export default function ChartByModalidad({data, title}) {
   return (
      <Body>
         <Button
            fullWidth
            color='inherit'
            startIcon={<PieChartIcon fontSize='large' />}
         >
            <Typography variant='h4' color='textSecondary'>{title}</Typography>
         </Button>
         <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
               <Pie
                  dataKey='totalOperativos'
                  data={data}
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  label={{fontSize: 18}}
                  isAnimationActive={false}
               >
                  <Cell name='Presencial' key='0' fill='#004795' />
                  <Cell name='Remoto' key='1' fill='#2BC2D5' />
               </Pie>
               <Legend 
                  iconType='triangle' 
                  verticalAlign='middle' 
                  align='right' 
                  layout='vertical' 
               />
            </PieChart>
         </ResponsiveContainer>
      </Body>
   )
}

ChartByModalidad.propTypes = {
   data: PropTypes.array.isRequired,
   title: PropTypes.string.isRequired
}