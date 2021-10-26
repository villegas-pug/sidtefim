import React, { useState, useRef, useMemo, useEffect } from 'react'
import {
   Paper,
   Box,
   Switch, 
   FormControl,
   FormControlLabel,
   FormHelperText,
   TextField,
   IconButton,
   Button,
   Tooltip,
   CircularProgress
} from '@material-ui/core'
import {
   FindInPage,
   Update,
   DeleteSweep,
   Edit,
   Save,
   GetApp
} from '@material-ui/icons'
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
/* import { format } from 'date-fns'
import { es } from 'date-fns/locale' */

import MyTextField from 'components/Formik/MyTextField'
import Table from 'components/Table'
import FormGroup from 'components/Styled/FormGroup'
import SpeedDials from 'components/SpeedDial'

import useOperativo from 'hooks/useOperativo'
import useBreakpoints from 'hooks/useBreakpoints'
import SimpleModal from 'components/SimpleModal'

import Noty from 'helpers/noty'
import { WARNING } from 'constants/levelLog'
import ModalLoader from 'components/Styled/ModalLoader'

export default function BuscarOperativoSubMod() {

   /*» HOOK'S...*/
   const [openModal, setOpenModal] = useState(true)
   const [checked, setChecked] = useState(false)

   const rIdOpe = useRef(0)
   const rSearch = useRef()
   const rReset = useRef()
   const rNroInfo = useRef('')
   
   /*» CUSTOM HOOK'S ... */
   const { 
      operativoLoading,
      operativoDb,
      opeByCustomFilterToExcelLoading,

      handleFindByApprox, 
      handleFindAllOperativo,
      handleUpdateOpeById,
      handleFindOpeByFilterToExcel
   } = useOperativo()

   const { 
      currentScreen,
      screens,
      unsuscribeScreenResizeListener 
   } = useBreakpoints()
   

   /*» EFFECT'S ... */
   useEffect(() => () => { unsuscribeScreenResizeListener() }, [])/*» Clean up... */
   useEffect(() => { !operativoLoading && setOpenModal(false) }, [operativoLoading])
   useEffect(() => {
      console.log(currentScreen)
   }, [currentScreen])

   /*» HANDLER'S ...  */
   const handleOnChecked = ({ target: { checked } }) => { setChecked(checked) }
   const handleOnSearch = () => { rSearch.current.click() }
   const handleOnRefresh = () => { handleFindAllOperativo() }
   const handleOnClickActualizar = (idOpe) => (rIdOpe.current = idOpe, setOpenModal(true))
   const handleOnSaveInModal = () => {
      if (rNroInfo.current?.value) {
         handleUpdateOpeById(rIdOpe.current, rNroInfo.current.value)
         rNroInfo.current.value = ''
         rIdOpe.current = ''
      }
      else {
         Noty(WARNING, '¡Número informe invalido!')
         rNroInfo.current.focus()
      }
   }

   /*  const handleDownload = () => {
      rDownloadRpt.current.handleDownload()
   } */
  
   /*» DEPENDENCY'S  */
   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Detalle' }, {icon: 'Actualizar'}],
      components: ({ action: { icon }, data: { idOperativo }}) => {
         if (icon === 'Detalle')
            return (
               <Tooltip 
                  title='Exportar a excel'
                  placement='left-end'
                  arrow
               >
                  <IconButton
                     onClick={() => {handleFindOpeByFilterToExcel({idOpe: idOperativo})}}
                  >
                     <GetApp/>
                  </IconButton>
               </Tooltip>
            )
         else if(icon === 'Actualizar')
            return(
               <Tooltip title="Actualizar N° Info" arrow placement='right-end'>
                  <IconButton
                     onClick={() => {handleOnClickActualizar(idOperativo)}}
                  >
                     <Edit />
                  </IconButton>
               </Tooltip>
            )
      }
   }), [operativoDb])

   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { 
            title: 'Nro', 
            field: 'idOperativo', 
            type: 'number', 
            width: 5,
            render: ({idOperativo}) => idOperativo.toString().padStart(7, '0')
         },
         { title: 'N°Informe', field: 'numeroInforme', width: 15, type: 'number' },
         { 
            title: 'T.Intervenidos', 
            field: 'detOperativo', 
            type: 'number', 
            width: 60,
            render: ({detOperativo}) => detOperativo.length
         },
         { 
            title: 'T.Infractores', 
            field: 'detOperativo', 
            width: 60,
            type: 'number', render: ({detOperativo}) => detOperativo?.filter(({infraccion}) => infraccion === 'SI').length
         },
         { title: 'Dependencia', field: 'dependencia', width: 70, render: ({dependencia: {nombre}}) => nombre },
         { 
            title: 'FecOperativo', 
            field: 'fechaOperativo', 
            type: 'date',
            width: 60, 
            /* render: ({ fechaOperativo }) => format(new Date(fechaOperativo), 'P', { locale: es })  */
            render: ({ fechaOperativo }) => 
               new Intl.DateTimeFormat('es-PE', { dateStyle: 'short', timeZone: 'America/Lima' }).format(Date.parse(fechaOperativo))
         },
         { title: 'Modalidad', field: 'modalidadOperativo', width: 40},
         { 
            title: 'Tipo Operativo', 
            field: 'entidadSolicitaOperativo', 
            width: 200,
            render: ({entidadSolicitaOperativo: { descripcion }}) => descripcion
         }
      ],
      data: operativoDb
   }), [operativoDb])

   /*» ARGUMENT : `optSpeedDialAction`  */
   const optSpeedDialAction = [
      {
         icon: <FindInPage />,
         tooltip: 'Buscar',
         fabProps: { disabled: true },
         handleOnClick: () => { handleOnSearch() }
      }, {
         tooltip: 'Refrescar',
         icon: <Update />,
         handleOnClick: () => { handleOnRefresh() }
      },{
         tooltip: 'Limpiar',
         icon: <DeleteSweep />,
         fabProps: { disabled: true },
         handleOnClick: () => { () => console.log('Limpiar...') }
      },
   ]

   const optFrm = {
      initialValues: {
         fechaOperativo: '',
      },
      validationSchema: Yup.object({
         fechaOperativo: Yup.string().required('¡Fecha requerida!'),
      }),
      onSubmit: (values) => { handleFindByApprox(values)},
   }

   return (
      <>
         {/* HEADER... */}
         {/* <AppTitle name='» BUSCAR OPERATIVO' align='left' size={1} color='#777' /> */}
         <FormControlLabel
            label={ checked ? 'Ocultar filtro' : 'Mostrar filtro'}
            style={{marginLeft: 5}}
            control={
               <Switch
                  disabled
                  color='primary'
                  checked={checked}
                  onChange={handleOnChecked}
               />
            }
         />

         {
            checked && (
               <Fade top>
                  <Formik {...optFrm}>
                     {
                        ({ values: {fechaOperativo} }) => (
                           <Form>
                              <Paper elevation={5} style={{ padding: 5 }} >
                                 <Box display='flex' justifyContent='flex-start'  >
                                    <FormGroup>
                                       <MyTextField 
                                          name='fechaOperativo' 
                                          type='date' 
                                          value={fechaOperativo} 
                                          label='Fecha operativo' 
                                          size={15} 
                                       />
                                    </FormGroup>
                                 </Box>
                              </Paper>
                              <input type='submit' ref={rSearch} hidden />
                              <input type='reset' ref={rReset} hidden />
                           </Form>
                        )
                     }
                  </Formik>
               </Fade>
            )
         }

         {/* » BODY */}
         <Box mt={.5}>
            <Fade clear>
               <Table
                  isLoading={operativoLoading}
                  dataTable={dataTable}
                  configTable={configTable}
                  pageSize={ 
                     currentScreen === screens.desktop 
                        ? 7 
                        : currentScreen === screens.desktopWide
                           ? 13 
                           : 7
                  }
               />
            </Fade>
         </Box>
         
         {/*» FLOAT  */}
         <SpeedDials 
            direction='right'
            position='absolute'
            opt={{bottom: 2}} 
            optSpeedDialAction={optSpeedDialAction}
         />

         {/*» MODAL  */}
         {
            openModal && (
               <SimpleModal open={openModal} setOpen={setOpenModal}>
                  <Box display='flex' p={1} width={200} height={120} flexDirection='column'>
                     <FormControl style={{flexGrow: 1}}>
                        <TextField 
                           fullWidth 
                           color='primary'
                           inputRef={rNroInfo}
                           autoFocus
                        />
                        <FormHelperText>Ingresar el nuevo N° Informe</FormHelperText>
                     </FormControl>
                     <Button
                        variant='contained'
                        color='primary'
                        startIcon={ operativoLoading ? <CircularProgress color='inherit' size={20} /> : <Save />}
                        onClick={handleOnSaveInModal}
                        disabled={operativoLoading}
                     >
                        Guardar
                     </Button>
                  </Box>
               </SimpleModal>
            )
         }

         {/*» Modal-Loader  */}
         {
            opeByCustomFilterToExcelLoading && <ModalLoader />
         }
      </>
   )
}