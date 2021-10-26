import React, { useState, useRef, useMemo } from 'react'
import { 
   Box,
   IconButton,
   Tooltip,
   TableContainer,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   Paper,
   Typography
} from '@material-ui/core'
import { 
   Search,
   FormatListNumberedRtl
} from '@material-ui/icons'
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import MyTable from 'components/Table'
import SpeedDial from 'components/SpeedDial'
import DialogAppBar from 'components/DialogAppBar'
import MyTextField from 'components/Formik/MyTextField'
import SimpleModal from 'components/SimpleModal'

import useBreakpoints from 'hooks/useBreakpoints'
import usePreInscripcion from 'hooks/usePreInscripcion'


const renderPreInscripcionDetail = (record = {}) => (
   <TableContainer component={Paper}>
      <Table size='small'>
         <TableHead>
            <TableRow>
               <TableCell align='center'>
                  <Typography variant='h4'>DATO ADICIONAL</Typography>
               </TableCell>
               <TableCell align='center' width={400}>
                  <Typography variant='h4'>DESCRIPCIÓN</Typography>
               </TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {
               Object.entries(record)
                  .filter((entry, i, self) => i < self.length - 1)
                  .filter((entry, i) => i > 11)
                  .map((entry, i) => (
                     <TableRow key={i}>
                        <TableCell align='left'>{entry[0]}</TableCell>
                        <TableCell align='left'>{entry[1]}</TableCell>
                     </TableRow>
                  ))
            }
         </TableBody>
      </Table>
   </TableContainer>
)

export default function BuscarPreInscripcionSubMod() {

   /*» HOOK'S  */
   const [openFilterDialog, setOpenFilterDialog] = useState(false)
   const [openDetailModal, setOpenDetailModal] = useState(false)
   const [recordDetail, setRecordDetail] = useState({})
   const submitRef = useRef()

   /*» CUSTOM HOOK'S  */
   const { screens, currentScreen } = useBreakpoints()
   const { 
      filterOptions,
      loadingPreInscripcionDb,
      preInscripcionDb,
      handleChangeFilterOptions, 
      handleFindPreInscripcionByOpts 
   } = usePreInscripcion()

   /*» HANDLER'S ... */
   const handleSearch = () => { submitRef.current.click() }
   const handleModalDetails = (record) => { 
      setOpenDetailModal(true)
      setRecordDetail(record)
   }

   /*» DEPENDENCY'S ...  */
   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'NroCita', field: 'idCitaVerifica', width: 5},
         { title: 'FecInscripcion', field: 'fechaInscripcion', width: 10, type: 'date'},
         { title: 'TipoDocumento', field: 'docBeneficiario', width: 10},
         { title: 'NroDoc', field: 'numDocBeneficiario', width: 10},
         { 
            title: 'Ciudadano', 
            width: 200, 
            render: ({ nomBeneficiario, priApeBeneficiario, segApeBeneficiario}) => 
               `${nomBeneficiario}, ${priApeBeneficiario} ${segApeBeneficiario}`
         },
         { title: 'FecNac', field: 'fecNacBeneficiario', width: 10, type: 'date'},
         { title: 'Sexo', field: 'sexo', width: 5},
         { title: 'PaisNac', field: 'paisNacimiento', width: 10},
         { title: 'FecIngreso', field: 'fechaIngreso', width: 10},
      ],
      data: preInscripcionDb
   }), [preInscripcionDb])

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = {
      actions: [{ icon: 'Detalle' }],
      components: ({ action: { icon }, data }) => {
         if (icon === 'Detalle')
            return (
               <Tooltip
                  title='Detalle'
                  arrow
               >
                  <IconButton
                     onClick={() => { handleModalDetails(data) }}
                  >
                     <FormatListNumberedRtl />
                  </IconButton>
               </Tooltip>
            )
      }
   }

   /*» ARGUMENT : `optSpeedDialAction`  */
   const optSpeedDialAction = [
      {
         icon: <Search />,
         tooltip: 'Buscar',
         handleOnClick: () => { setOpenFilterDialog(true) }
      }, 
   ]

   return (
      <>
         <Fade>
            <Box height='75vh'>
               <MyTable 
                  isLoading={loadingPreInscripcionDb}
                  dataTable={dataTable} 
                  configTable={configTable}
                  pageSize={ 
                     currentScreen === screens.desktop 
                        ? 8
                        : currentScreen === screens.desktopWide
                           ? 14
                           : 8
                  }
               />
            </Box>
         </Fade>
         
         <SpeedDial 
            direction='right' 
            optSpeedDialAction={optSpeedDialAction}  
            opt={{ position: 'absolute', bottom: 0 }} 
         />

         {/*» MODAL: FILTER DIALOG ... */}
         <DialogAppBar 
            open={openFilterDialog} 
            setOpen={setOpenFilterDialog} 
            handleAction={handleSearch} 
         >
            <Box 
               mt={15}
               height='100%' 
            >
               <Formik
                  initialValues={filterOptions}
                  validationSchema={Yup.object({
                     /* nombres: Yup.string().required('¡Campo requerido!').min(3, '¡Ingrese por lo menos 3 carateres!'), */
                     /* apePat: Yup.string().required('¡Campo requerido!').min(3, '¡Ingrese por lo menos 3 carateres!') */
                  })}
                  onSubmit={(values) => {
                     handleFindPreInscripcionByOpts(values)
                     setOpenFilterDialog(false)
                  }}
               >
                  {
                     () => (
                        <Form
                           onChange={ handleChangeFilterOptions }
                        >
                           <Box
                              display='flex' 
                              justifyContent='space-around'
                           >
                              <MyTextField name='nombres' label='Nombres' size={15} focused />
                              <MyTextField name='apePat' label='Apellido Paterno' size={15} />
                              <MyTextField name='apeMat' label='Apellido Materno' size={15} />
                              <MyTextField name='nroDoc' label='Número Documento' size={15} />
                           </Box>
                           <input type='submit' ref={submitRef}  hidden />
                        </Form>
                     )
                  }
               </Formik>
            </Box>
         </DialogAppBar>
      
         {/*» MODAL: SHOW DETAIL'S ... */}
         <SimpleModal
            open={openDetailModal}
            setOpen={setOpenDetailModal}
         >
            <Box>
               {
                  renderPreInscripcionDetail(recordDetail)
               }   
            </Box>
         </SimpleModal>
      </>
   )
}