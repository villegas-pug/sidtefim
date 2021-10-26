import React, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import {
   Paper,
   FormControl,
   TextField,
   FormHelperText,
   Button,
   ButtonGroup, 
   Typography,
   Divider,
   CircularProgress
} from '@material-ui/core'
import { Print, DeleteSweep } from '@material-ui/icons'
import Fade from 'react-reveal/Fade'
import useProduccion from 'hooks/useProduccion'

const MARGIN_TOP = 10

const useStyle = makeStyles({
   paper: {
      padding: 15
   },
   formControl:{
      marginTop: MARGIN_TOP
   },
   buttonGroup:{
      marginTop: MARGIN_TOP + 1,
      marginLeft: 5,
   },
   textField:{
      width: 200
   }
})

const Body = styled.body`
   height: 80%;
   display: flex;
   justify-content: center;
   align-items: center;
`

export default function ProduccionRptSubMod() {

   /*» HOOK'S  */
   const classes = useStyle()
   const [refDate, setRefDate] = useState('')

   /*» CUSTOM-HOOK'S  */
   const { produccionWeekDbLoading, handleCountProduccionWeek } = useProduccion()

   /*» HANDLER'S  */
   const handleChangeRefDate = ({target: { value }}) => {setRefDate(value)}
   const handleResetRefDate = () => { setRefDate('') }
   const handleGenerarReporte = () => (handleCountProduccionWeek(refDate), handleResetRefDate())

   return (
      <Body>
         <Fade>
            <Paper variant='outlined' className={classes.paper}>
               <Typography gutterBottom variant='h5' color='primary'>GENERADOR DE REPORTES SEMANAL</Typography>
               <Divider />
               <FormControl className={classes.formControl}>
                  <TextField
                     type='date'
                     size='small'
                     value={refDate}
                     variant='outlined'
                     color='primary'
                     className={classes.textField}
                     onChange={handleChangeRefDate}
                  />
                  <FormHelperText>Ingrese una fecha como referencia</FormHelperText>
               </FormControl>
               <ButtonGroup className={classes.buttonGroup}>
                  <Button 
                     color='primary' 
                     variant='contained' 
                     startIcon={
                        produccionWeekDbLoading
                           ? <CircularProgress color='inherit' size={20} />
                           : <Print fontSize='large' />
                     } 
                     disabled={!refDate}
                     onClick={() => handleGenerarReporte()}
                  />
                  <Button 
                     color='primary' 
                     variant='contained' 
                     endIcon={<DeleteSweep fontSize='large' />} 
                     onClick={() => handleResetRefDate()}
                  />
               </ButtonGroup>
            </Paper>
         </Fade>
      </Body>
   )
}
