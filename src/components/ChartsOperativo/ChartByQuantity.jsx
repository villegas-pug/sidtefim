import React from 'react'
import PropTypes from 'prop-types'
import { 
   LineChart, 
   Line,
   XAxis, 
   YAxis, 
   CartesianGrid, 
   Tooltip, 
   ResponsiveContainer, 
   Legend,
} from 'recharts'
import {
   Typography,
   Button
} from '@material-ui/core'
import {Timeline} from '@material-ui/icons'
import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default function ChartByQuantity({title, data}) {
   return (
      <Container>
         <Button
            fullWidth
            variant='text'
            startIcon={<Timeline fontSize='large' />}
            color='inherit'
         >
            <Typography variant='h4' color='textSecondary'>
               {title}
            </Typography>
         </Button>
         <ResponsiveContainer width='100%' height='100%'>
            <LineChart
               data={data}
            >
               <CartesianGrid strokeDasharray='1 1' />
               <XAxis 
                  dataKey='monthOpe' 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
               />
               <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toLocaleString('es-PE') }
                  tickCount={12}
                  fontSize={12}
               />
               <Tooltip
                  labelStyle={{fontSize: 12, fontWeight: 1000}} 
                  contentStyle={{fontSize: 12}}
                  formatter={(value) => value.toLocaleString('es-PE')}
               />
               <Legend
                  iconType='star' 
                  iconSize={14}
                  wrapperStyle={{fontSize: 12}}
                  height={1}
               />
               <Line type='monotone' dataKey='2019' line stroke='#2BC2D5' />
               <Line type='monotone' dataKey='2020' line stroke='#0680D7' />
               <Line type='monotone' dataKey='2021' line stroke='#004795' activeDot={{r: 6}} />
            </LineChart>
         </ResponsiveContainer>
      </Container>
   )
}

ChartByQuantity.propTypes = {
   title: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired
}