import React from 'react'
import PropTypes from 'prop-types'
import {
   Card,
   CardHeader,
   Avatar,
   CardContent,
   List,
   ListItem,
   ListItemText,
   ListItemIcon,
   Grid
} from '@material-ui/core'
import { PersonOutline, ChevronRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
   card: {
      width: '60rem'
   }
}) 

export default function FichaInterpolDetalle({ data }) {

   /*» HOOK'S  */
   const classes = useStyle()

   const {
      nombres,
      apellidos,
      sexo,
      cedula,
      pasaporte,
      nacionalidad,
      fechaEmision,
      fechaLugarNacimiento,
      motivo,
      procedencia,
      sede,
   } = data

   return (
      <>
         <Card className={classes.card}>
            <CardHeader
               avatar={<Avatar><PersonOutline /></Avatar>}
               title={`${nombres}, ${apellidos}`}
               subheader={nacionalidad}
            />
            <CardContent>
               <Grid container>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Pasaporte' secondary={pasaporte} />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Cédula' secondary={cedula} />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Nacionalidad' secondary={nacionalidad} />
                        </ListItem>
                     </List>
                  </Grid>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Sexo' secondary={sexo} />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Fecha Emisión' secondary={fechaEmision} />
                        </ListItem>
                     </List>
                  </Grid>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Fecha y Lugar de Nacimiento' secondary={fechaLugarNacimiento} />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Motivo' secondary={motivo} />
                        </ListItem>
                     </List>
                  </Grid>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Procedencia' secondary={procedencia} />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Sede' secondary={sede} />
                        </ListItem>
                     </List>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>

      </>
   )
}

FichaInterpolDetalle.propTypes = {
   data: PropTypes.object.isRequired
}