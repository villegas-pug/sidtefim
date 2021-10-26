import React from 'react'
import PropTypes from 'prop-types'
import { 
   BarChart, 
   Bar, 
   YAxis,
   XAxis, 
   Tooltip,
   CartesianGrid, 
   ResponsiveContainer,
} from 'recharts'
import {
   Button,
   Typography
} from '@material-ui/core'
import styled from 'styled-components'
import { Equalizer } from '@material-ui/icons'

const Container = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
`
const styles = {
   barLabel: {
      /* position: 'top',  */
      fontSize: 14,
      formatter: (value) => value.toLocaleString('es-PE')
   }
}

export default function ChartByRefugiados({ title, data }) {

   return (
      <Container>
         <Button
            fullWidth
            color='inherit'
            startIcon={<Equalizer fontSize='large' />}
         >
            <Typography variant='h4' color='textSecondary'>{title}</Typography>
         </Button>
         <ResponsiveContainer width='100%' height='100%'>
            <BarChart
               data={data}
            >
               <CartesianGrid strokeDasharray='1 1' />
               <Tooltip
                  labelStyle={{fontSize: 12, fontWeight: 1000}} 
                  contentStyle={{fontSize: 12}}
                  formatter={(value) => value.toLocaleString('es-PE') } 
               />
               <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toLocaleString('es-PEnp')}
               />
               <XAxis 
                  dataKey='añoOpe'
                  tickLine={false}
                  axisLine={false}
               />
               <Bar 
                  name='Refugiados' 
                  dataKey='totalRefugiados' 
                  fill='none'
                  stroke='#999'
                  barSize={40}
                  label={styles.barLabel} 
               />
            </BarChart>
         </ResponsiveContainer>
      </Container>
   )
}

ChartByRefugiados.propTypes = {
   title: PropTypes.string.isRequired,
   data: PropTypes.array.isRequired
}