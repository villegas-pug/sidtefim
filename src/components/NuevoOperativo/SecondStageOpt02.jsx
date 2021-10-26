import React, { useRef, useEffect} from 'react'
import {
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   CardMedia,
   Typography,
   Box,
   IconButton,
   Tooltip,
   CircularProgress
} from '@material-ui/core'
import { Storage, Publish, AttachFile, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Flash from 'react-reveal/Flash'
import styled from 'styled-components'

import MyButton from 'components/MuiButton'
import Noty from 'helpers/noty'
import {WARNING} from 'constants/levelLog'

import useOperativo from 'hooks/useOperativo'
import useStages from 'hooks/useStages'

const Body = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: calc(100vh - 300px);
`

const Footer = styled.div`
   position: absolute;
   bottom: 1rem;
   display: flex;
   justify-content: space-between;
`

const useStyles = makeStyles({
   root: {
      width: 300,
      padding: 10
   },
   media: {
      height: 140,
   },
   storage: {
      fontSize: 150,
      margin: 'auto'
   }
})

export default function SecondStageOpt02() {
   
   /*» HOOK'S  */
   const rFile = useRef({})
   const classes = useStyles()
   
   const { 
      operativoLoading,
      handleChangeInputUncontrolled, 
      handleSaveOperativo,
   } = useOperativo()
   
   const { handleResetStages } = useStages('NuevoOperativoSubMod')

   /*» EFFECT'S  */
   useEffect(() => () => {/*» Cleanup...*/
      if(rFile.current) rFile.current.value = ''
   }, [])

   /*» HANDLER'S  */
   const handleOnChageInputFile = ({ target: {files} }) => {  handleChangeInputUncontrolled({ file: files[0] })}
   const handleOnClickInputFile = () => { rFile.current.click() }
   const handleOnClickSave = () => {
      if(operativoLoading) Noty(WARNING, '¡Hay otro proceso en curso!')
      else handleSaveOperativo()
   }

   return (
      <>
         <Flash>
            <Body>
               <Card className={classes.root}>
                  <CardActionArea>
                     <CardMedia
                        className={classes.media}
                        title='Storage'
                     >
                        <Box display='flex' justifyContent='center' alignItems='center'>
                           <Storage color='action' className={classes.storage} />
                        </Box>
                     </CardMedia>
                     <CardContent>
                        <Typography gutterBottom variant='h3' color='textPrimary'>
                           ALMACENAMIENTO
                        </Typography>
                        <Typography variant='subtitle2' color='textSecondary' component='p'>
                           Eligir archivo en formato xlsx.
                        </Typography>
                     </CardContent>
                  </CardActionArea>
                  <CardActions>
                     <input 
                        type='file' 
                        ref={rFile} 
                        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                        onChange={handleOnChageInputFile} 
                        hidden 
                     />
                     <Tooltip title='Adjuntar archivo' arrow placement='left'>
                        <IconButton
                           edge='start'
                           size='medium'
                           onClick={handleOnClickInputFile}
                           disabled={operativoLoading}
                        >
                           <AttachFile fontSize='large' />
                        </IconButton>
                     </Tooltip>
                     <Tooltip title='Guardar' arrow placement='right' >
                        <IconButton
                           edge='end'
                           size='medium'
                           disabled={!rFile.current?.value}
                           onClick={handleOnClickSave}
                        >
                           {
                              operativoLoading 
                                 ? <CircularProgress size={34} color='inherit'  /> 
                                 : <Publish fontSize='large' />
                           }
                        </IconButton>
                     </Tooltip>
                  </CardActions>
               </Card>
            </Body>
            <Footer>
               <MyButton
                  variant='outlined'
                  color='secondary'
                  startIcon={<Cancel />}
                  onClick={handleResetStages}
                  disabled={operativoLoading}
               >
                  CANCELAR
               </MyButton>
            </Footer>
         </Flash>
      </>
   )
}