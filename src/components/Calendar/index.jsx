import React, { useState } from 'react'
import { Calendar, Badge, ConfigProvider } from 'antd'
import esPE from 'antd/lib/locale/es_ES'
import styled from 'styled-components'
import Pulse from 'react-reveal/Pulse'


const Container = styled.div`
   display: flex;
   flex-flow:column;
`

function getListData(value) {
   let listData
   switch (value.date()) {
   case 8:
      listData = [
         { type: 'warning', content: 'Cita tomada.' },
         { type: 'success', content: 'Cita tomada.' },
      ]
      break
   case 13:
      listData = [
         { type: 'warning', content: 'Cita tomada.' },
         { type: 'success', content: 'Cita tomada.' },
         { type: 'error', content: 'Cita tomada.' },
      ]
      break
   case 15:
      listData = [
         { type: 'warning', content: 'Cita tomada.' },
         { type: 'error', content: 'Cita tomada.' },
         { type: 'error', content: 'Cita tomada.' },
      ]

      break
   case 16:
      listData = [
         { type: 'warning', content: 'Cita tomada.' },
      ]
      break
   default:
   }
   return listData || []
}

function dateCellRender(value) {
   const listData = getListData(value)
   return (
      <ul style={{ paddingLeft: 0 }}>
         {
            listData.map((item, i) => (
               <li style={{ textDecoration: 'none' }}>
                  <Badge key={i} status={item.type} text={item.content} />
               </li>
            ))
         }
      </ul>
   )
}

function monthCellRender() {
   return (
      <div className="notes-month">
         <section>Test</section>
      </div>
   )
}

export default function Calendario() {
   const [daySelected, setDaySelected] = useState()
   return (
      <Pulse>
         <Container>
            <div style={{ height: '5rem', backgroundColor: '#1f1f1f10' }}>
               <h1>{daySelected}</h1>
            </div>
            <ConfigProvider locale={esPE}>
               <Calendar
                  dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender}
                  onSelect={(meta) => { setDaySelected(meta.calendar('dd/MM/yyyy')) }}
               />
            </ConfigProvider>
         </Container>
      </Pulse>
   )
}