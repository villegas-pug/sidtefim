import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { 
   Grid,
   Box,
   IconButton,
   Typography,
   Paper
} from '@mui/material'
import { 
   Add, 
   Mail,
   Delete,
   DownloadDone
} from '@mui/icons-material'


export default function AddFilePool({ data, handleAddMail, handleDowloadMail, handleDeleteMail }){

   /*» HOOK'S  */
   const refFile = useRef([])

   /*» HANDLER'S  */
   const handleChangeFile = ({ target: { files } }) => { handleAddMail(data, files[0])}
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
               data?.mailFiles.map(({ idMailFile, descripcion }) => (
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
                                 <DownloadDone fontSize='small' />
                              </IconButton>
                           </Grid>
                           <Grid item container xs={6} justifyContent='center' alignItems='center'>
                              <IconButton
                                 onClick={() => handleDowloadMail(idMailFile)}
                              >
                                 <Delete fontSize='small' />
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
                  >
                     <Add color='primary' fontSize='large' />
                  </IconButton>
                  <Typography variant='subtitle2' color='inherit'>Adjuntar correos</Typography>
                  <input 
                     ref={refFile} 
                     type='file' 
                     name='file' 
                     accept='*.msj' 
                     hidden 
                     onChange={handleChangeFile}
                  />
               </Box>
            </Box>
         </Box>
      </>
   )
}



AddFilePool.propTypes = {
   data: PropTypes.object.isRequired, 
   handleDowloadMail: PropTypes.func.isRequired, 
   handleDeleteMail: PropTypes.func.isRequired, 
   handleAddMail: PropTypes.func.isRequired
}