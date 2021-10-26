import React from 'react'
import Iframe from 'react-iframe'

export default function MesaDigitalRptSubMod() {
   return (
      <Iframe
         url='https://app.powerbi.com/reportEmbed?reportId=dc4783d4-3825-4c4d-a598-29a1b5830d5d&autoAuth=true&ctid=01ce8357-a75e-455e-8c4c-faaaa6dbd8fe&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXBhYXMtMS1zY3VzLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9'
         position='absolute'
         width='92%'
         height='85%'
         frameBorder={0}
         loading='eager'
         scrolling='no'
      />
   )
}

