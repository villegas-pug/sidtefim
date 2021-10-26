import React, { useState, useRef } from 'react'
import Flash from 'react-reveal/Flash'
import {
   Paper,
   FormControl,
   InputLabel,
   OutlinedInput,
   FormHelperText,
   InputAdornment,
   IconButton,
   MenuItem,
   Select,
   Grid,
   Tooltip
} from '@material-ui/core'
import { AttachFile, Edit } from '@material-ui/icons'
import Table from 'components/Table'

const docs = ['Ley y Reglamento', 'Normativa legal vigente', 'Convenios Bilaterales', 'Decisiones CAN', 'Comunicados y documentos', 'Planificación y Organización', 'Normativa Interna']

export default function ElaboracionNormativa() {

   const [tipoDoc, setTipoDoc] = useState('')
   const rDocAnexo = useRef()

   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = () => ({
      columns: [
         { title: 'Nro', field: 'idDoc', type: 'number', width: 10 },
         { title: 'AREA', field: 'area', width: 50 },
         { title: 'TIPO DOCUMENTO', field: 'tipoDocumento', width: 80 },
         { title: 'DESCRIPCIÓN', field: 'descripcion', width: 150 },
      ],
      data: [
         { idDoc: 1, }
      ]
   })

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = () => ({
      actions: [{ icon: 'Editar' }, { icon: 'Exportar Excel' }],
      components: ({ action: { icon }}) => {
         if (icon === 'Editar')
            return (
               <Tooltip
                  title='Editar'
                  arrow
               >
                  <IconButton
                     onClick={() => { }}
                  >
                     <Edit />
                  </IconButton>
               </Tooltip >)
         else if (icon === 'Exportar Excel') {
            return
         }
      }
   })

   const handleChange = e => { setTipoDoc(e.target.value) }

   const handleOnAdjuntar = () => { rDocAnexo.current.click() }

   return (
      <>
         <Flash>
            {/*» HEADER...  */}
            <>
               <Paper elevation={2} style={{ padding: 15 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <FormControl variant='outlined'>
                           <InputLabel htmlFor='documento'>ADJUNTAR DOCUMENTO</InputLabel>
                           <OutlinedInput
                              style={{ width: '50rem' }}
                              id='documento'
                              labelWidth={200}
                              disabled
                              endAdornment={
                                 <InputAdornment
                                    position='end'
                                 >
                                    <IconButton
                                       onClick={() => { handleOnAdjuntar() }}
                                    >
                                       <AttachFile />
                                    </IconButton>
                                 </InputAdornment>
                              }
                           />
                           <FormHelperText></FormHelperText>
                        </FormControl>
                        <input type='file' ref={rDocAnexo} hidden />
                     </Grid>
                     <Grid item xs={6}>
                        <FormControl variant='outlined'>
                           <InputLabel htmlFor="tipoDocumento">TIPO DOCUMENTO</InputLabel>
                           <Select
                              id="tipoDocumento"
                              style={{ width: '25rem' }}
                              value={tipoDoc}
                              onChange={handleChange}
                              variant='outlined'
                              labelWidth={150}
                           >
                              {
                                 docs.map((doc, i) => (
                                    <MenuItem 
                                       key={i} 
                                       value={i}
                                    >
                                       {doc.toUpperCase()}
                                    </MenuItem>
                                 ))
                              }
                           </Select>
                        </FormControl>
                     </Grid>
                  </Grid>
               </Paper>
            </>

            {/*» BODY...  */}
            <>
               <div style={{ marginTop: 5 }}>
                  <Table dataTable={dataTable} configTable={configTable} />

               </div>
            </>
         </Flash>
      </>
   )
}
