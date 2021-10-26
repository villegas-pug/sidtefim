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

export default function ChartByTipoOpe({title, data}) {
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
                  dataKey='tipoOperativo' 
                  scale='band'
                  fontSize={11}
                  fontWeight={1000}
                  width={600}
                  tickLine={false}
                  axisLine={false}
                  mirror
                  tickFormatter={(value) => value.toUpperCase()}
               />
               <XAxis 
                  type='number' 
                  tickLine={false}
                  axisLine={false}
               />
               <Bar
                  dataKey='totalOperativo' 
                  fill='none'
                  stroke='#82ca9d' 
                  fillOpacity={0.25} 
                  barSize={15}
                  tooltipType='none'
               />
               <Line 
                  name='Operativo'
                  dataKey='totalOperativo' 
                  activeDot
                  label={{
                     position: 'top', 
                     fill: '#333',
                     fontSize: 14,
                     fontWeight: 1000,
                     formatter: (value) => value.toLocaleString('es-PE')
                  }} 
                  strokeWidth={1}
                  stroke='#82ca9d'
                  type='basisOpen'
               />
            </ComposedChart>
         </ResponsiveContainer>
      </Container>
   )
}

ChartByTipoOpe.propTypes = {
   title: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired
}