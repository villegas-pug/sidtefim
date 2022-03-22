import React, { useEffect, useRef, useState } from 'react'

import {
   Box,
   Typography,
   Avatar,
   Button,
} from '@material-ui/core'
import { 
   Storage, 
   FileUpload,
   AttachFile,
} from '@mui/icons-material'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
   avatar: {
      height: 70,
      width: 70
   }
})

import useFiscalizacionPosterior from 'hooks/useFiscalizacionPosterior'

export const AsideLeft = () => {

   /*» HOOK'S  */
   const fileRef = useRef(null)
   const [file, setFile] = useState(null)

   /*» CUSTOM HOOK'S  */
   const classes = useStyle()
   const { handleSaveAllSolicitudesSFM } = useFiscalizacionPosterior()

   /*» EFFECT'S  */
   useEffect(() => {
   }, [])

   /*» HANDLER'S  */
   const handleAttachment = () => { fileRef.current.click() }
   const handleChangeInputFile = ({ target: { files } }) => { setFile(files[0])  }
   const handleAceptar = () => {
      handleSaveAllSolicitudesSFM(file)
      setFile(null)
   }

   return(
      <Box
         height={170}
         mt={10}
         display='flex'
         justifyContent='space-around'
         alignItems='center'
         flexDirection='column'
      >
         <Avatar className={classes.avatar}>
            <Storage fontSize='large' />
         </Avatar>

         <Box
            width={200}
            display='flex'
            justifyContent='space-around'
         >
            <Button
               variant={ file ? 'contained' : 'outlined' }
               onClick={handleAttachment}
            >
               <AttachFile fontSize='medium' />
            </Button>
            <input ref={fileRef} type='file' accept='.xlsx' hidden onChange={handleChangeInputFile} />
            <Button
               variant='contained'
               startIcon={ <FileUpload fontSize='large' /> }
               onClick={handleAceptar}
               disabled={ !file }
            >
               <Typography variant='h4'>Aceptar</Typography>
            </Button>
         </Box>
      </Box>
   )
}