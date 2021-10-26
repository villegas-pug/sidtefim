import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Box } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import MyTable from 'components/Table'
import SpeedDial from 'components/SpeedDial'
import DialogAppBar from 'components/DialogAppBar'
import MyTextField from 'components/Formik/MyTextField'

import useBreakpoints from 'hooks/useBreakpoints'
import useRefugiado from 'hooks/useRefugiado'

export default function BuscarRefugiadoSubMod() {

   /*» HOOK'S  */
   const [openFilterDialog, setOpenFilterDialog] = useState(false)
   const submitRef = useRef()

   /*» CUSTOM HOOK'S  */
   const { screens, currentScreen, unsuscribeScreenResizeListener } = useBreakpoints()
   const { 
      filterOptions,
      loadingRefugiadoDb,
      refugiadoDb,
      handleChangeFilterOptions, 
      handleFindRefugiadoByOpts 
   } = useRefugiado()

   /*» EFFECT'S  */
   useEffect(() => () => { unsuscribeScreenResizeListener() }, [])

   /*» HANDLER'S ... */
   const handleSearch = () => { submitRef.current.click() }

   /*» DEPENDENCY'S ...  */
   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Nro.', field: 'idRefugiado', width: 5},
         { title: 'Condición', field: 'condicion', width: 10 },
         { title: 'Nombres', field: 'nombres', width: 50},
         { title: 'ApePat', field: 'paterno', width: 50},
         { title: 'ApeMat', field: 'materno', width: 50},
         { title: 'PaisNac', field: 'paisNacimiento', width: 15},
         { title: 'FecNac', field: 'fechaNacimiento', width: 15, type: 'date' }
      ],
      data: refugiadoDb
   }), [refugiadoDb])

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
                  isLoading={loadingRefugiadoDb}
                  dataTable={dataTable} 
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
                     nombres: Yup.string().required('¡Campo requerido!').min(2, '¡Ingrese por lo menos 2 caracteres!'),
                     paterno: Yup.string().required('¡Campo requerido!').min(2, '¡Ingrese por lo menos 2 caracteres!')
                  })}
                  onSubmit={(values) => {
                     handleFindRefugiadoByOpts(values)
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
                              <MyTextField name='paterno' label='Apellido Paterno' size={15} />
                              <MyTextField name='materno' label='Apellido Materno' size={15} />
                           </Box>
                           <input type='submit' ref={submitRef}  hidden />
                        </Form>
                     )
                  }
               </Formik>
            </Box>
         </DialogAppBar>
      </>
   )
}