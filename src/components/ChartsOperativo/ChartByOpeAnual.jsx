import React from 'react'
import PropTypes from 'prop-types'
import { 
   BarChart, 
   Bar, 
   XAxis, 
   YAxis, 
   Tooltip,
   CartesianGrid, 
   ResponsiveContainer 
} from 'recharts'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { Equalizer as BarChartIcon  } from '@material-ui/icons'


const Container = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
`

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`

const TriangleBar = (props) => {
   const { fill, x, y, width, height } = props
   return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />
}

TriangleBar.propTypes = {
   fill: PropTypes.string,
   x: PropTypes.number,
   y: PropTypes.number,
   width: PropTypes.number,
   height: PropTypes.number,
}

export default function ChartByOpeAnual({ title, data }) {
   
   return (
      <Container>
         <Button
            fullWidth
            color='inherit'
            startIcon={<BarChartIcon fontSize='large' />}
         >
            <Typography variant='h4' color='textSecondary'>{title}</Typography>
         </Button>
         <ResponsiveContainer width='100%' height='100%'>
            <BarChart
               data={data}
            >
               <CartesianGrid strokeDasharray='1 1' />
               <XAxis 
                  dataKey='añoOpe' 
                  tickLine={false}
                  axisLine={false}
               />
               <YAxis 
                  axisLine={false} 
                  tickLine={false} 
               />
               <Tooltip 
                  labelStyle={{fontSize: 12, fontWeight: 1000}} 
                  contentStyle={{fontSize: 12}}
                  formatter={(value) => value.toLocaleString('es-PE')}
               />
               <Bar 
                  name='Intervenidos' 
                  dataKey='totalOpe' 
                  fill='#004795'
                  label={{position: 'center', fontSize: 14, fill:'#fff' }}
                  minPointSize={5}
               />
            </BarChart>
         </ResponsiveContainer>
      </Container>
   )
}

ChartByOpeAnual.propTypes = {
   title: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired
}