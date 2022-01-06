import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { 
   Grid,
   Box,
   IconButton,
   Typography,
   Paper,
   CircularProgress
} from '@mui/material'
import { 
   Add, 
   Mail,
   RemoveCircleOutline,
   Visibility,
} from '@mui/icons-material'
import useExpedienteMininter from 'hooks/useExpedienteMininter'

export default function AddFilePool({ record, handleAddMail, handleDowloadMail, handleDeleteMail }){

   /*» DEP'S  */
   const { idDetExpMininter } = record

   /*» HOOK'S  */
   const refFile = useRef([])

   /*» CUSTOM-HOOK'S  */
   const { 
      getMailFilesDb, 
      mininterDbLoading, 
      fileDownloadLoading
   } = useExpedienteMininter()

   /*» HANDLER'S  */
   const handleChangeFileDialog = ({ target: { files } }) => { handleAddMail(record, files[0])}
   const handleOpenFileDialog = () => { refFile.current.click() }

   return (
      <>
         <Box 
            display='flex' 
            minWidth={100}
            maxWidth={1000} 
            flexWrap='wrap'
            gap={1}
         >
            {/*» Action: Show file ... */}
            {
               getMailFilesDb(idDetExpMininter).map(({ idMailFile, descripcion }) => (
                  <Box key={idMailFile} display='flex' minWidth={100} height={100} justifyContent='center' alignItems='center' flexGrow={1}>
                     <Paper variant='outlined'>
                        <Grid container>
                           <Grid item container xs={12} justifyContent='center' alignItems='center'>
                              <Mail fontSize='large' color='info' />
                           </Grid>
                           <Grid item container xs={12} justifyContent='center' alignItems='center'>
                              <Typography variant='caption' color='GrayText'>{descripcion}</Typography>
                           </Grid>
                           <Grid item container xs={6} justifyContent='center' alignItems='center'>
                              <IconButton
                                 onClick={() => handleDeleteMail(idMailFile)}
                              >
                                 <RemoveCircleOutline fontSize='small' />
                              </IconButton>
                           </Grid>
                           <Grid item container xs={6} justifyContent='center' alignItems='center'>
                              <IconButton
                                 onClick={() => handleDowloadMail(idMailFile)}
                                 disabled={fileDownloadLoading}
                              >
                                 { fileDownloadLoading ? <CircularProgress size={20} color='inherit' /> : <Visibility fontSize='small' />}
                                 
                              </IconButton>
                           </Grid>
                        </Grid>
                     </Paper>
                  </Box>
               ))
            }

            {/*» Action: Add file ... */}
            <Box display='flex' width={140} height={100} justifyContent='center' alignItems='center'>
               <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                  <IconButton
                     onClick={handleOpenFileDialog}
                     disabled={mininterDbLoading}
                  >
                     <Add color={mininterDbLoading ? 'disabled' : 'primary'} fontSize='large' />
                  </IconButton>
                  <Typography variant='subtitle2' color='inherit'>Adjuntar correos</Typography>
                  <input 
                     ref={refFile} 
                     type='file' 
                     name='file' 
                     accept='.msg, *' 
                     hidden 
                     onChange={handleChangeFileDialog}
                  />
               </Box>
            </Box>
         </Box>
      </>
   )
}



AddFilePool.propTypes = {
   record: PropTypes.object.isRequired, 
   handleDowloadMail: PropTypes.func.isRequired, 
   handleDeleteMail: PropTypes.func.isRequired, 
   handleAddMail: PropTypes.func.isRequired
}