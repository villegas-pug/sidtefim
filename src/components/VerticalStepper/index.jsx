import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Check, NavigateNext, NavigateBefore, DoneAll, RotateLeft } from '@material-ui/icons'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
   },
   actionsContainer: {
      marginBottom: theme.spacing(2),
   },
   resetContainer: {
      padding: theme.spacing(3),
   },
}))

export default function VerticalLinearStepper(props) {

   /*-> HOOK'S  */
   const classes = useStyles()
   const [activeStep, setActiveStep] = useState(0)

   /*» CICLO DE VIDA...  */
   useEffect(() => setActiveStep(0), [])

   /*-> DEPENDENCIAS  */
   /* const { steps } = props */

   const steps = [
      { title: 'Copia de la Partida o Acta de Nacimiento certificada por Consulado visada por el Ministerio de Relaciones Exteriorres del Perú o apostillada', estado: false },
      { title: 'IMAGEN DEL CARNET DE EXTRANJERIA EN PDF', estado: false },
      { title: 'DOC. DE INDENTIFICACIÓN DEL REPRESENTANTE LEGAL', estado: false },
      { title: 'Copia del acta de nacimiento emitida por Reniec del Hijo(A) Peruano.', estado: false },
      { title: 'Solicitud de la congregación o autoridad eclesiástica o asociación religiosa a la que real y efectivamente vendrá a integrarse, firmada por el representante legal, debidamente acreditado, indicando en todos los casos nombres y apellidos del beneficiario y tiempo que permanecerá en el País. En el caso de religiosos católicos, dicha solicitud deberá estar visada por la Dirección de Asuntos de la Iglesia Católica del Ministerio de Justicia (Cuando domicilie en Lima) o el Obispo de la Jurisdicción respectiva (Cuando domicilie en provincia). En el caso de las asociaciones religiosas no Católicas. La solicitud deberá encontrarse visada por la dirección de asuntos Internacionales del Ministerio de Justicia y Derechos Humanos.', estado: false },
      { title: 'Partida o Acta de defunción', estado: false },
      { title: 'Declaración Jurada por cambio de domicilio', estado: false },
   ]

   /*-> HANDLER'S  */
   const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) }
   const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) }
   const handleReset = () => { setActiveStep(0) }

   return (
      <div className={classes.root}>
         <Stepper activeStep={activeStep} orientation="vertical">
            {
               steps.map(({ title, content }, i) => (
                  <Step key={title}>
                     <StepLabel>{title}</StepLabel>
                     <StepContent>

                        <div className={classes.actionsContainer}>
                           <div>
                              <Button
                                 disabled={activeStep === 0}
                                 variant='outlined'
                                 className={classes.button}
                                 onClick={handleBack}
                              >
                                 <NavigateBefore />
                                 Atrás
                              </Button>
                              <Button
                                 variant="outlined"
                                 color='primary'
                                 className={classes.button}
                                 onClick={handleNext}
                              >
                                 {
                                    activeStep === steps.length - 1
                                       ? <><Check />Culminar</>
                                       : <><NavigateNext />Siguiente</>
                                 }
                              </Button>
                           </div>
                        </div>
                     </StepContent>
                  </Step>
               ))
            }
         </Stepper>
         {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
               <Typography>Todos los requisitos fueron completados</Typography>
               <Button
                  variant='contained'
                  onClick={handleReset}
                  className={classes.button}
               >
                  <RotateLeft />
                  Reiniciar
               </Button>
               <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  onClick={handleReset}
               >
                  <DoneAll />
                  Aprobar
               </Button>
            </Paper>
         )}
      </div>
   )
}
