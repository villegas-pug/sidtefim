import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
   Grid,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   ListItemAvatar,
   IconButton,
   Avatar,
   Paper,
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Stack,
   Checkbox,
   Divider,
   Box,
   CircularProgress,
   Badge
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { 
   LockOpen,
   FormatListNumberedRtl,
   Lock,
   Feed,
   ExpandMore,
   Cancel,
   Save,
   Mail,
   Drafts,
   CheckCircle,
   Done
} from '@mui/icons-material'
import { Typography, Button, TextField } from '@material-ui/core'
import { Fade } from 'react-reveal'
import { format } from 'date-fns'

import useNuevoTramiteNac from 'hooks/useNuevoTramiteNac'
import SimpleModal from 'components/SimpleModal'
import ModalLoader from 'components/Styled/ModalLoader'

const useStyle = makeStyles({
   paper: {
      height: '86vh',
      padding: 15,
      overflow: 'hidden'
   },
   accordionSummary: {
      paddingLeft: 25
   }
})

const getExpedienteReqDetailsUpdated = (expedienteReqDetailsState, assignedInEvalByUsrDb) => {
   const idEvalReqTramite = expedienteReqDetailsState[0]?.idEvalReqTramite ?? ''/*» filter value ...  */
   const [ evaluarTramiteNac ] = assignedInEvalByUsrDb.filter(({ evalRequisitoTramiteNac }) => {
      return evalRequisitoTramiteNac[0]?.idEvalReqTramite === idEvalReqTramite
   })

   const { evalRequisitoTramiteNac } = evaluarTramiteNac ?? {}
   return evalRequisitoTramiteNac
}

const isDisabledFinalizar = (expedienteReqDetails = []) => {
   return expedienteReqDetails.some(({ estado }) => estado === 'I')
}

export default function EvaluarExpedienteNacSubMod(){

   /*» CUSTOM-HOOK'S  */
   const classes = useStyle()
   const { 
      assignedInEvalByUsrDb,
      assignedInEvalByUsrDbLoading,
      countAssignedInEvalByUsrByLeido,
      countAssignedInEvalByUsrByNoLeido,
      handleFindAllAssignedInEvalByUsr
   } = useNuevoTramiteNac()

   /*» HOOK'S  */
   const [expedienteReqDetails, setExpedienteReqDetails] = useState([])
   const [expedienteDetails, setExpedienteDetails] = useState({})
   const [openModalExpedienteDetails, setOpenModalExpedienteDetails] = useState(false)

   /*» EFFECT'S  */
   useEffect(() => { handleFindAllAssignedInEvalByUsr()}, [])
   useEffect(() => {
      expedienteReqDetails.length > 0 
         && assignedInEvalByUsrDb.length > 0
         && setExpedienteReqDetails(getExpedienteReqDetailsUpdated(expedienteReqDetails, assignedInEvalByUsrDb))
   }, [assignedInEvalByUsrDb])

   /*» HANDLER'S  */
   const handleExpedienteReqDetails = (evalRequisitoTramiteNac) => { setExpedienteReqDetails(evalRequisitoTramiteNac)}
   const handleExpedienteDetails = (tramiteNac) => {
      setExpedienteDetails(tramiteNac)
      setOpenModalExpedienteDetails(true)
   }

   return (
      <>
         <Grid container spacing={1} height='80vh'>
            <Grid item xs={1}>
               <Fade left when={!assignedInEvalByUsrDbLoading}>
                  <Paper variant='outlined' className={classes.paper}>
                     <Stack 
                        justifyContent='center'
                        alignItems='center'
                        height={150} 
                        spacing={2}
                        divider={ <Divider orientation='horizontal' flexItem /> }
                     >
                        <Badge color='error' badgeContent={countAssignedInEvalByUsrByNoLeido}>
                           <Mail color='disabled' fontSize='large' />
                        </Badge>
                        <Badge color='primary' badgeContent={countAssignedInEvalByUsrByLeido}>
                           <Drafts color='disabled' fontSize='large' />
                        </Badge>
                     </Stack>
                  </Paper>
               </Fade>
            </Grid>
            <Grid item xs={3}>
               <Fade left when={!assignedInEvalByUsrDbLoading}>
                  <Paper variant='outlined' className={classes.paper}>
                     <ListOfAssignedToEval 
                        handleExpedienteReqDetails={handleExpedienteReqDetails} 
                        handleExpedienteDetails={handleExpedienteDetails} />
                  </Paper>
               </Fade>
            </Grid>
            <Grid item xs={8}>
               <Paper variant='outlined' className={classes.paper}>
                  <Fade top when={!assignedInEvalByUsrDbLoading && expedienteReqDetails?.length }>
                     <ListOfRequisitosByExpediente expedienteReqDetails={expedienteReqDetails} />
                  </Fade>
               </Paper>
            </Grid>
         </Grid>

         {/*» MODAL: DETAILS-EXPEDIENTE ...  */}
         <SimpleModal open={openModalExpedienteDetails} setOpen={setOpenModalExpedienteDetails}>
            <Stack 
               padding={2}
               width={1200} 
               height={220}
               justifyContent='space-between'
               alignItems='center' 
               direction='row' 
               flexWrap='wrap' 
               spacing={5} 
            >
               <TextField color='primary' label='Número Expediente' value={ expedienteDetails.numeroTramite }  style={{width: 120}} disabled />
               <TextField color='primary' label='Administrado' value={ expedienteDetails.administrado }  style={{width: 300}} disabled />
               <TextField color='primary' label='Sexo' value={ expedienteDetails.sexo }  style={{width: 50}} disabled />
               <TextField color='primary' label='Tipo Trámite' value={ expedienteDetails.tipoTramite }  style={{width: 400}} disabled />
               <TextField color='primary' label='Dependencia' value={ expedienteDetails.dependencia }  style={{width: 100}} disabled />
               <TextField color='primary' label='Estado Trámite' value={ expedienteDetails.estadoTramite }  style={{width: 100}} disabled />
               <TextField color='primary' label='Fecha Trámite' value={ expedienteDetails.fechaTramite }  style={{width: 200}} disabled />
               <TextField color='primary' label='Fecha Rec.Mesa.Partes' value={ expedienteDetails.fechaRecepcionMP }  style={{width: 200}} disabled />
               <TextField color='primary' label='Pais Nacimiento' value={ expedienteDetails.paisNacimiento }  style={{width: 100}} disabled />
            </Stack>
         </SimpleModal>

         {/*» LODAL:  */}
         { assignedInEvalByUsrDbLoading && <ModalLoader /> }
      </>
   )
}

const ListOfAssignedToEval = ({ handleExpedienteReqDetails, handleExpedienteDetails }) => {
   
   /*» CUSTOM-HOOK'S  */
   /* const classes = useStyle() */
   const { assignedInEvalByUsrDb, handleReadAssignment } = useNuevoTramiteNac()

   /*» HOOK'S  */
   const [selectedAssignedToEval, setSelectedAssignedToEval] = useState(-1)

   /*» HANDLER'S  */
   const handleSelectedAssignedToEval = (i, evalRequisitoTramiteNac) => { 
      setSelectedAssignedToEval(i) 
      handleExpedienteReqDetails(evalRequisitoTramiteNac)
   }

   return (
      <List dense>
         {assignedInEvalByUsrDb?.map((evaluarTramiteNac, i) => {
            const { tramiteNac, evalRequisitoTramiteNac, leido } = evaluarTramiteNac
            return (
               <ListItem
                  key={tramiteNac.numeroTramite}
                  secondaryAction={
                     <>
                        <IconButton
                           onClick={() => handleReadAssignment(evaluarTramiteNac)}
                           disabled={leido}
                        >
                           { leido ? <LockOpen /> : <Lock /> }
                        </IconButton>    
                        <IconButton
                           onClick={() => handleExpedienteDetails(tramiteNac)}
                        >
                           <FormatListNumberedRtl />
                        </IconButton>    
                     </>
                  }
                  disablePadding
               >
                  <ListItemButton
                     selected={selectedAssignedToEval === i}
                     onClick={() => handleSelectedAssignedToEval(i, evalRequisitoTramiteNac)}
                  >
                     <ListItemAvatar>
                        <Avatar><Feed /></Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={<Typography variant='h3'>{tramiteNac.numeroTramite}</Typography>} />
                  </ListItemButton>
               </ListItem>
            )
         })}
      </List>
   )
}

const ListOfRequisitosByExpediente = ({ expedienteReqDetails }) => {

   /*» CUSTOM-HOOK´s  */
   const classes = useStyle()
   const { 
      assignedInEvalByUsrDbLoading, 
      handleCheckRequisitoTramiteNac,
      handleFinishEvaluarTramiteNac
   } = useNuevoTramiteNac()

   /*» HOOK'S  */
   const refEvalRequisitoTramiteNac = useRef({})
   const [openModalCheckRequisito, setOpenModalCheckRequisito] = useState(false)

   /*» EFFECTS'S  */
   /*» Cuando el stado `openModalCheckRequisito` sea desmontado, limpia la ref `refEvalRequisitoTramiteNac` ...  */
   useEffect( () => { if(!openModalCheckRequisito) refEvalRequisitoTramiteNac.current = {} }, [openModalCheckRequisito])

   return (
      <>
         <Stack 
            height='81vh'
            direction='column' 
         >
            {
               expedienteReqDetails?.map(({ idEvalReqTramite, requisitoTipoTramite : { requisito: { descripcion } }, fechaHoraInicio, fechaHoraFin, estado }, i) => (
                  <>
                     <Accordion key={idEvalReqTramite}>
                        <AccordionSummary 
                           expandIcon={<ExpandMore fontSize='large' color='disabled' style={{color: estado === 'F' && '#fff'}} />}
                           aria-controls='panel1a-content'
                           className={classes.accordionSummary}
                           style={{ backgroundColor: estado === 'F' ? '#004795' : '#EEEEF1' }}
                        >
                           <Stack direction='row' spacing={3}>
                              { 
                                 estado === 'F' 
                                    ? <CheckCircle fontSize='small' style={{color: '#fff'}} /> 
                                    : <Cancel fontSize='small' color='disabled' /> 
                              }
                              <Typography variant={ estado === 'F' ? 'h3' : 'h4' } style={{ color: estado === 'F' && '#fff' }}>
                                 { descripcion }
                              </Typography>
                           </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Stack 
                              direction='row' 
                              justifyContent='center'
                              alignItems='center'
                              spacing={5} 
                              divider={ <Divider orientation='vertical' flexItem /> }
                           >
                              <Stack direction='row' spacing={1}>
                                 <Typography variant='h4'>Fecha y Hora Inicio: </Typography>
                                 <Typography variant='h5'>{format(new Date(fechaHoraInicio), 'PPpp')}</Typography>
                              </Stack>
                              <Stack direction='row' spacing={1}>
                                 <Typography variant='h4'>Fecha y Hora Fin: </Typography>
                                 <Typography variant='h5'>{fechaHoraFin ? format(new Date(fechaHoraFin), 'PPpp') : '-'}</Typography>
                              </Stack>
                              <Stack direction='row' spacing={1}>
                                 <Typography variant='h4'>Estado: </Typography>
                                 <Typography variant='h5'>{estado === 'I' ? 'INICIADO' : 'FINALIZADO'}</Typography>
                              </Stack>
                              <Stack>
                                 <Checkbox 
                                    color='primary' 
                                    checked={ estado === 'F' }
                                    onClick={ () => { 
                                       setOpenModalCheckRequisito(true)
                                       refEvalRequisitoTramiteNac.current = { idEvalReqTramite, estado: estado === 'I' ? 'F' : 'I' }
                                    } }
                                 />
                              </Stack>
                           </Stack>
                        </AccordionDetails>
                     </Accordion>
                     <Divider flexItem />

                     {/*» RENDERING CONDITIONAL: Button `Finalizar` */}
                     {
                        expedienteReqDetails.length === i + 1
                           && (
                              <Stack mt={1} direction='row' justifyContent='flex-end'>
                                 <Button 
                                    variant='contained' 
                                    color='primary'
                                    disabled={isDisabledFinalizar(expedienteReqDetails)}
                                    startIcon={ <Done  /> }
                                    onClick={() => { handleFinishEvaluarTramiteNac(idEvalReqTramite) }}
                                 >
                                    <Typography variant='h3'>FINALIZAR</Typography>
                                 </Button>
                              </Stack>
                           )         
                     }
                     
                  </>
               ))
            }
         </Stack>

         {/*» MODAL-CHECK-REQUISITO  */}
         <SimpleModal open={openModalCheckRequisito} setOpen={setOpenModalCheckRequisito} >
            <Box display='flex' width={230} flexDirection='column'>
               <Box display='flex' justifyContent='center' mb={2}>
                  <Typography variant='h5'>¡Presiona el boton aceptar, para confirmar!</Typography>
               </Box>
               <Box display='flex' justifyContent='space-between'>
                  <Button 
                     variant='contained' 
                     color='primary'
                     startIcon={
                        assignedInEvalByUsrDbLoading
                           ? <CircularProgress size={20} color='inherit' /> 
                           : <Save fontSize='small' />
                     }
                     disabled={assignedInEvalByUsrDbLoading}
                     onClick={() => { 
                        handleCheckRequisitoTramiteNac(refEvalRequisitoTramiteNac.current)
                        setOpenModalCheckRequisito(false)
                     }}
                  >
                     <Typography variant='h4' color='initial'>Aceptar</Typography>
                  </Button>
                  <Button 
                     variant='contained' 
                     color='secondary'
                     disabled={assignedInEvalByUsrDbLoading}
                     startIcon={<Cancel fontSize='small' />}
                     onClick={() => setOpenModalCheckRequisito(false)}
                  >
                     <Typography variant='h4' color='initial'>Cancelar</Typography>
                  </Button>
               </Box>
            </Box>
         </SimpleModal>
      </>
   )
}

ListOfAssignedToEval.propTypes = {
   handleExpedienteReqDetails: PropTypes.func.isRequired,
   handleExpedienteDetails: PropTypes.func.isRequired
}

ListOfRequisitosByExpediente.propTypes = {
   expedienteReqDetails: PropTypes.array.isRequired
}

EvaluarExpedienteNacSubMod.propTypes = {}