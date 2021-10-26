import React from 'react'
import PropTypes from 'prop-types'
import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   Tooltip
} from 'recharts'
import {
   Button,
   Typography
} from '@material-ui/core'
import styled from 'styled-components'
import { PieChart as PChart } from '@material-ui/icons'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default function ChartBySexo({title, data}) {

   return (
      <Container>
         <Button
            fullWidth
            color='inherit'
            startIcon={<PChart fontSize='large' />}
         >
            <Typography variant='h4' color='textSecondary'>{title}</Typography>
         </Button>
         <ResponsiveContainer>
            <PieChart barSize={100} width={50} height={50}>
               <Tooltip 
                  labelStyle={{fontSize: 9, fontWeight: 1000}} 
                  contentStyle={{fontSize: 8}}
                  formatter={(value) => value.toLocaleString('es-PE')}
               />
               <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  label={({percent, value, name}) => (`${name}: ${value.toLocaleString('es-PE')} | ${(percent * 100).toFixed(0)}%`)}
                  outerRadius={30}
                  dataKey ='totalIntervenidos'
                  isAnimationActive={false}
               >
                  <Cell name='F' key='0' fill='#C14C51' />
                  <Cell name='M' key='1' fill='#5080B9' />
               </Pie>
            </PieChart>
         </ResponsiveContainer>
      </Container>
   )
}

ChartBySexo.propTypes = {
   title: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired
}