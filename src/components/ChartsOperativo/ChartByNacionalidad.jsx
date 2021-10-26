import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
   ComposedChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Line
} from 'recharts'
import {
   Button,
   Typography
} from '@material-ui/core'
import { Equalizer } from '@material-ui/icons'

export default function ChartByNacionalidad({title, data, fieldName}) {
   
   const [orderedData, setOrderedData] = useState([])
   
   useEffect(() => {
      setOrderedData(
         data.sort((prev, next) => {
            if (prev[fieldName] > next[fieldName]) return -1
            else if (prev[fieldName] < next[fieldName]) return 1
            else 0
         })
            .slice(0, 15)
      )
   }, [data])

   return (
      <body style={{height: '100%'}}>
         <Button
            fullWidth
            variant='text'
            color='inherit'
            startIcon={<Equalizer fontSize='large' />}
         >
            <Typography variant='h5' color='textSecondary'>{title}</Typography>
         </Button>
         <ResponsiveContainer width='100%' height='100%'>
            <ComposedChart
               layout='vertical'
               data={orderedData}
            >
               <CartesianGrid strokeDasharray='2 2'  />
               <Tooltip
                  labelStyle={{fontSize: 12, fontWeight: 1000}} 
                  contentStyle={{fontSize: 12}}
                  formatter={(value) => value.toLocaleString('es-PE') } 
               />
               <XAxis 
                  type='number' 
                  tickLine={false} 
                  axisLine={false}
                  fontSize={14}
                  tickFormatter={(value) => value.toLocaleString('es-PE')}
               />
               <YAxis 
                  dataKey='pais' 
                  type='category'
                  fontSize={10}
                  tickLine={false} 
                  axisLine={false} 
                  width={150}
               />
               <Bar 
                  name='Intervenidos' 
                  dataKey={fieldName}
                  barSize={8} 
                  fill='none'
                  stroke='#004795'
                  tooltipType='none'
               />
               <Line
                  name='Intervenidos'
                  dataKey={fieldName} 
                  activeDot
                  label={{
                     position: 'insideBottomRight',
                     fill: '#222',
                     fontSize: 14,
                     fontWeight: 1000,
                     formatter: (value) => value.toLocaleString('es-PE')
                  }} 
                  strokeWidth={1}
                  stroke='#004795'
                  type='basisOpen'
               />
            </ComposedChart>
         </ResponsiveContainer>
      </body>
   )
}

ChartByNacionalidad.propTypes = {
   title: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired,
   fieldName: PropTypes.string.isRequired
}