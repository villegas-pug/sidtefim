import React, { useState } from 'react'
import {
   FormControl,
   RadioGroup,
   Radio,
   FormControlLabel,
   FormHelperText,
   Button,
   Divider, Typography
} from '@material-ui/core'
import { Save, Cancel, NavigateNext, NavigateBefore } from '@material-ui/icons'
import Flash from 'react-reveal/Flash'

import styled from 'styled-components'
import MyButton from 'components/MuiButton'

import useStages from 'hooks/useStages'
import SecondStageOpt02 from './SecondStageOpt02'
import useOperativo from 'hooks/useOperativo'

const Body = styled.div`
   display: flex;
   justify-content: space-around;
   align-items: center;
   height: calc(100vh - 300px);
`

const Footer = styled.div`
   display: flex;
   justify-content: space-around;
`

const SUBSTAGE_DEFAULT = 'Stage principal'
const SUBSTAGE_NO_REGISTRA_INTERVENIDOS = 'Operativo no registra intervenidos.'
const SUBSTAGE_A_PARTIR_HOJA_EXCEL = 'A partir de una hoja excel.'

export default function SecondStage() {

   /*» HOOK'S */
   const { handleResetStages, handlePrevStage } = useStages()
   const [tipoRegistroSelected, setTipoRegistroSelected] = useState('')
   const [currentSubStage, setCurrentSubStage] = useState(SUBSTAGE_DEFAULT)

   /*» CUSTOM-HOOK'S  */
   const { handleSaveOperativo } = useOperativo()

   /*» HANDLER'S  */
   const handleOnChangeRadio = ({ target: { value } }) => { setTipoRegistroSelected(value) }
   const handleRenderOrSave = () => {
      if (tipoRegistroSelected === SUBSTAGE_NO_REGISTRA_INTERVENIDOS) handleSaveOperativo()
      else setCurrentSubStage(tipoRegistroSelected)
   }

   /*» COMPONENT'S ENVIROMENT  */
   const renderDefaultComponent = () => (
      <Flash>
         <Body>
            <FormControl>
               <Typography gutterBottom variant='h4' color='primary'>TIPO DE REGISTRO</Typography>
               <Divider />

               <RadioGroup 
                  name='tipoRegistro' 
                  onChange={handleOnChangeRadio} 
                  value={tipoRegistroSelected}
               >
                  <FormControlLabel 
                     value={SUBSTAGE_NO_REGISTRA_INTERVENIDOS}
                     label={SUBSTAGE_NO_REGISTRA_INTERVENIDOS}
                     control={<Radio color='default' />} 
                  />
                  <FormControlLabel 
                     value={SUBSTAGE_A_PARTIR_HOJA_EXCEL}
                     label={SUBSTAGE_A_PARTIR_HOJA_EXCEL}
                     control={<Radio color='default' />} 
                  />
               </RadioGroup>
               <FormHelperText>Seleccione para continuar...</FormHelperText>
            </FormControl>
         </Body>
         <Footer>
            <MyButton
               variant='outlined'
               color='secondary'
               startIcon={<Cancel />}
               onClick={handleResetStages}
            >
               CANCELAR
            </MyButton>
            <Button
               variant='contained'
               startIcon={<NavigateBefore />}
               onClick={handlePrevStage}
               style={{ marginLeft: 'auto', marginRight: 5 }}
            >
               <Typography variant='h4' color='initial'>REGRESAR</Typography>
            </Button>
            <Button
               variant='contained'
               endIcon={tipoRegistroSelected !== SUBSTAGE_NO_REGISTRA_INTERVENIDOS && <NavigateNext />}
               startIcon={ tipoRegistroSelected === SUBSTAGE_NO_REGISTRA_INTERVENIDOS 
                              && <Save size='small' color='inherit' /> }
               disabled={!tipoRegistroSelected}
               onClick={handleRenderOrSave}
            >
               <Typography variant='h4' color='initial'>
                  {
                     tipoRegistroSelected === SUBSTAGE_NO_REGISTRA_INTERVENIDOS  ? 'GUARDAR' : 'SIGUIENTE'
                  }
               </Typography>
            </Button>
         </Footer>
      </Flash >
   )
      
   return (
      <>
         {currentSubStage === SUBSTAGE_DEFAULT && renderDefaultComponent()}
         {currentSubStage === SUBSTAGE_A_PARTIR_HOJA_EXCEL && <SecondStageOpt02 />}
      </>
   )
}