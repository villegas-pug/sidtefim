import React, { useEffect, useRef, useState } from 'react'

import {
   Paper,
   Grid,
   Box,
   Divider,
   CircularProgress,
   Button
} from '@material-ui/core'
import { 
   Save,
   AttachFile
} from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import InfoCard from 'components/InfoCard'
import MyTextField from 'components/Formik/MyTextField'
import useCeremonia from 'hooks/useCeremonia'

import Noty from 'helpers/noty'

import { WARNING } from 'constants/levelLog'
import { MESSAGGE_WARNING_FIELD_FILE_EMPTY } from 'constants/messages'

const useStyle = makeStyles({
   paperBody: {
      margin: 'auto',
      height: 85,
      width: 420,
      padding: 15
   },
   gridBody:{
      height: '50vh'
   },
   form:{
      height: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'start',
   }
})

export default function NuevaCeremoniaSubMod(){

   /*» HOOK'S  */
   const classes = useStyle()
   const refAttachment = useRef(null)
   const refReset = useRef(null)
   const [attachment, setAttachment] = useState(null)

   /*» CUSTOM-HOOK'S  */
   const { 
      loadingCeremoniaDb, 
      sumarizzeCeremoniaDb, 
      handleSaveAllCeremonia, 
      handleGetSumarizzeCeremonia 
   } = useCeremonia()

   /*» EFFECT'S  */
   useEffect(() => { handleGetSumarizzeCeremonia() }, [])

   /*» HANDLER'S  */
   const handleOpenAttachment = () => refAttachment.current.click()
   const handleChangeAttachment = ({ target: { files } }) => setAttachment(files[0])
   const handleReset = () => {
      refReset.current.click()
      setAttachment(null)
   }

   return (
      <>
         <Box mt={2}>
            <Grid container spacing={5} className={classes.gridRoot}>
               <Grid item container xs={12}>
                  <Fade top when={!loadingCeremoniaDb}>
                     <Box width={'93vw'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
                        {
                           sumarizzeCeremoniaDb?.map(({iconName, indicador, total}) => (
                              <InfoCard 
                                 key={iconName} 
                                 iconName={iconName} 
                                 title={indicador} 
                                 value={total} 
                              />
                           ))
                        }
                     </Box>
                  </Fade>
               </Grid>
               <Grid item xs={12}><Divider /></Grid>
               <Grid item xs={12}>
                  <Zoom duration={250}>
                     <Box width={'93vw'} height={'50vh'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
                        <Paper className={classes.paperBody}>
                           <Formik
                              initialValues={{
                                 fechaCeremonia: ''
                              }}
                              validationSchema={Yup.object({
                                 fechaCeremonia: Yup.string().required('¡Campo requerido!')
                              })}
                              onSubmit={(values) =>{
                                 if(!attachment){
                                    Noty(WARNING, MESSAGGE_WARNING_FIELD_FILE_EMPTY)
                                    return
                                 }

                                 handleSaveAllCeremonia(values, attachment)
                                 handleReset()
                              }}
                           >
                              {
                                 () => (
                                    <Form className={classes.form}>
                                       <MyTextField type='date' name='fechaCeremonia' label='Fecha Ceremonia' size={15} />
                                       <Button 
                                          variant={attachment ? 'contained' : 'outlined' }
                                          color='primary'
                                          disabled={loadingCeremoniaDb}
                                          onClick={handleOpenAttachment}
                                       >
                                          <AttachFile />
                                       </Button>
                                       <Button 
                                          type='submit' 
                                          variant='contained' 
                                          color='primary'
                                          disabled={loadingCeremoniaDb}
                                       >
                                          {
                                             loadingCeremoniaDb ? <CircularProgress color='inherit' size={24} /> : <Save />
                                          }
                                       </Button>
                                       <input type='reset' hidden ref={refReset}/>
                                    </Form>
                                 )
                              }
                           </Formik>
                           {/*» input-file  */}
                           <input type='file' accept='.xlsx' hidden ref={refAttachment} onChange={handleChangeAttachment} />
                        </Paper>
                     </Box>
                  </Zoom>
               </Grid>
            </Grid>
         </Box>
      </>
   )
}
