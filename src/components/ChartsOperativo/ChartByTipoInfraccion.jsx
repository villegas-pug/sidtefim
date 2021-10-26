import React from 'react'
import PropTypes from 'prop-types'
import { 
   ResponsiveContainer,
   ComposedChart, 
   Bar,
   YAxis,
   XAxis,
   Tooltip,
   CartesianGrid,
   Line
} from 'recharts'
import { 
   Button,
   Typography
} from '@material-ui/core'
import {Equalizer} from '@material-ui/icons'
import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default function ChartByTipoInfraccion({title, data}) {
   return (
      <Container>
         <Button
            fullWidth
            variant='text'
            color='inherit'
            startIcon={<Equalizer fontSize='large' />}
         >
            <Typography variant='h4' color='textSecondary'>{title}</Typography>
         </Button>
         <ResponsiveContainer width='100%' height='100%'>
            <ComposedChart 
               layout='vertical'
               data={data}
            >
               <CartesianGrid stroke='#ccc' strokeDasharray='1 1' />
               <Tooltip
                  labelStyle={{fontSize: 12, fontWeight: 1000}} 
                  contentStyle={{fontSize: 12}}
                  formatter={(value) => value.toLocaleString('es-PE') } 
               />
               <YAxis 
                  type='category' 
                  dataKey='tipoInfraccion' 
                  scale='band'
                  fontSize={10}
                  width={600}
                  tickLine={false}
                  axisLine={false}
                  fontWeight={1000}
                  tickFormatter={(value) => value.toUpperCase()}
                  mirror
               />
               <XAxis 
                  type='number' 
                  tickLine={false}
                  axisLine={false}
               />
               <Bar
                  dataKey='totalInfraccion' 
                  stroke='#8884d8' 
                  fill='none' 
                  fillOpacity={0.25} 
                  barSize={15}
                  tooltipType='none'
               />
               <Line 
                  name='Intervenidos'
                  dataKey='totalInfraccion' 
                  activeDot
                  label={{
                     position: 'top', 
                     fill: '#333',
                     fontSize: 14,
                     fontWeight: 1000,
                     formatter: (value) => value.toLocaleString('es-PE')
                  }} 
                  strokeWidth={1}
                  stroke='#8884d8'
                  type='basisOpen'
               />
            </ComposedChart>
         </ResponsiveContainer>
      </Container>
   )
}

ChartByTipoInfraccion.propTypes = {
   title: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired
}