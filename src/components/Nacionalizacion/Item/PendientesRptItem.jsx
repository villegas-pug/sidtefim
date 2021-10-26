import React, { useState, useEffect } from 'react'
import {
   TreeView,
   TreeItem,
} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { 
   Remove, 
   Add,
   GetApp,
   Update
} from '@material-ui/icons'
import { 
   Box,
   IconButton,
   Tooltip,
   Divider,
   Typography,
   Button
} from '@material-ui/core'
import styled from 'styled-components'
import uuid from 'short-uuid'
import { Scrollbars } from 'react-custom-scrollbars'
import Fade from 'react-reveal/Fade'

import ModalLoader from 'components/Styled/ModalLoader'

import useNacionalizacion from 'hooks/useNacionalizacion'
import useSubitem from 'hooks/useSubitem'

import { item } from 'constants/components'

const Body = styled.body`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: stretch;
`

const useStyle = makeStyles({
   treeView: {
      width: '65vw',
   },
   typographyRoot:{
      fontSize: 20
   },
   iconButton: {
      height: 30,
      width: 30,
   },
   buttonTitle:{
      marginBottom: 10,
   }
})

export default function PendientesRptItem() {
   
   /*» HOOK'S */
   const [expanded, setExpanded] = useState([])
   const [selected, setSelected] = useState([])

   /*» CUSTOM-HOOK'S  */
   const classes = useStyle()
   const {
      procnacDbLoading,
      tipoProcNacDistinct,
      etapaProcNacDistinct,
      añoProcNacDistinct,
      filterProcNacByAñoAndTipoProc,
      filterProcNacByAñoAndTipoProcAndEtapa,
      mapCountProcNacByAño,
      handleToListProcPNac,
      handleDownloadProcByCustomFilter
   } = useNacionalizacion()
   const { subitems } = useSubitem(item.PENDIENTES)

   console.log(subitems)

   /*» EFFECT'S  */
   useEffect(() => { handleToListProcPNac() }, [])

   /*» HANDLER'S  */
   const handleToggle = (e, idItem) => { setExpanded(idItem) }
   const handleSelected = (e, idItem) => { setSelected(idItem) }
   
   return (
      <>
         <Body>
            <Fade>
               <Button
                  variant='contained'
                  color='default'
                  startIcon={<Update fontSize='small' />}
                  disableElevation
                  fullWidth
                  className={classes.buttonTitle}
               >
                  <Typography 
                     variant='h4' 
                     color='textPrimary'
                  >
                     PENDIENTE EN PROCESO DE ATENCIÓN
                  </Typography>
               </Button>
               <Scrollbars
                  autoHide
                  autoHeight
                  autoHeightMax='70vh'
               >
                  <Box display='flex' justifyContent='center'>
                     <TreeView
                        expanded={expanded}
                        selected={selected}
                        defaultCollapseIcon={<Remove fontSize='large' />}
                        defaultExpandIcon={<Add fontSize='large' />}
                        className={classes.treeView}
                        onNodeToggle={handleToggle}
                        onNodeSelect={handleSelected}
                     >
                        {
                           [...añoProcNacDistinct].map((año) => (
                              <>
                                 <TreeItem
                                    key={año} 
                                    nodeId={año}
                                    label={
                                       <Box m={1} display='flex' justifyContent='space-between'>
                                          <Box>
                                             <Typography 
                                                variant='h1' 
                                                color='textSecondary' 
                                                className={classes.typographyRoot}
                                             >
                                                {año}
                                             </Typography>
                                             <Typography 
                                                variant='h5' 
                                                color='error'
                                             >
                                             PENDIENTES: {mapCountProcNacByAño[año].toString().padStart(4, '0')}
                                             </Typography>
                                          </Box>
                                          <Tooltip title='Descargar' placement='right-start' arrow>
                                             <IconButton 
                                                onClick={() => handleDownloadProcByCustomFilter({año})}
                                             >
                                                <GetApp />
                                             </IconButton>
                                          </Tooltip>
                                       </Box>
                                    }
                                 >
                                    {
                                       [...tipoProcNacDistinct].map((tipo) => (
                                          filterProcNacByAñoAndTipoProc(año, tipo)
                                             .map(({nro, tipoTramite, contarPendiente}) => (
                                                <TreeItem 
                                                   key={nro}
                                                   nodeId={nro}
                                                   label={
                                                      <Box 
                                                         p={1} 
                                                         display='flex' 
                                                         justifyContent='space-between'
                                                      >
                                                         <Box 
                                                            display='flex' 
                                                            alignItems='center' 
                                                            justifyContent='space-between' 
                                                            width={370}
                                                         >
                                                            <Typography 
                                                               variant='h5' 
                                                               color='textPrimary'
                                                            >
                                                               {tipoTramite}
                                                            </Typography>
                                                            <Typography 
                                                               variant='h6' 
                                                               color='error'
                                                            >
                                                            P: {contarPendiente.toString().padStart(3, '0')}
                                                            </Typography>
                                                         </Box>
                                                         <Tooltip title='Descargar'  placement='right-start' arrow>
                                                            <IconButton 
                                                               className={classes.iconButton}
                                                               onClick={() => handleDownloadProcByCustomFilter({año, tipo})}
                                                            >
                                                               <GetApp />
                                                            </IconButton>
                                                         </Tooltip>
                                                      </Box>
                                                   }
                                                >
                                                   {
                                                      [...etapaProcNacDistinct].map(etapa => (
                                                         filterProcNacByAñoAndTipoProcAndEtapa(año, tipo, etapa)
                                                            .map(({nro, etapaTramite, contarPendiente}) => (
                                                               <TreeItem 
                                                                  key={nro}
                                                                  nodeId={uuid.generate()}
                                                                  label={
                                                                     <Box 
                                                                        p={1} 
                                                                        display='flex' 
                                                                        justifyContent='space-between'
                                                                     >
                                                                        <Box 
                                                                           display='flex' 
                                                                           alignItems='center' 
                                                                           justifyContent='space-between' 
                                                                           width={270}
                                                                        >
                                                                           <Typography variant='h5' color='textPrimary'>{etapaTramite}</Typography>
                                                                           <Typography variant='h6' color='error'>P: {contarPendiente.toString().padStart(3, '0')}</Typography>
                                                                        </Box>
                                                                        <Tooltip title='Descargar'  placement='right-start' arrow>
                                                                           <IconButton 
                                                                              className={classes.iconButton}
                                                                              onClick={() => handleDownloadProcByCustomFilter({año, tipo, etapa})}
                                                                           >
                                                                              <GetApp />
                                                                           </IconButton>
                                                                        </Tooltip>
                                                                     </Box>
                                                                  }
                                                               />
                                                            )) 
                                                      ))
                                                   }
                                                </TreeItem>
                                             ))
                                       ))
                                    }
                                 </TreeItem>
                                 <Divider className={classes.dividerTree} />
                              </>
                           ))
                        }
                     </TreeView>
                  </Box>
               </Scrollbars>
            </Fade>
         </Body>

         <Box display='flex' flexWrap='wrap' justifyContent='center'>
            {
               subitems.map(({idProcedimiento, nombre}) => (
                  <h3 key={idProcedimiento}>{nombre}</h3>
               ))
            }
         </Box>

         {/*» MODAL-LOADING  */}
         {
            procnacDbLoading && <ModalLoader />
         }
      </>
   )
}