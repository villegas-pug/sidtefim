import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
   Typography,
   AppBar,
   Tabs,
   Tab,
   Box,
   Grid
} from '@material-ui/core'
import SimpleCard from 'components/SimpleCard'

const lineamientos = {
   subdireccion1: ['Ley y Reglamento', 'Normativa legal vigente', 'Convenios Bilaterales', 'Decisiones CAN', 'Comunicados y documentos', 'Planificación y Organización', 'Normativa Interna'],
   subdireccion2: ['Ley y Reglamento', 'Normativa legal vigente', 'Convenios Bilaterales', 'Decisiones CAN', 'Comunicados y documentos'],
}

const TabPanel = (props) => {

   const { children, value, index, ...other } = props

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   )
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
}

function a11yProps(index) {
   return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
   }
}

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
   },
}))

export default function FixedTab() {
   const classes = useStyles()
   const theme = useTheme()
   const [value, setValue] = React.useState(0)

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   const handleChangeIndex = (index) => {
      setValue(index)
   }

   return (
      <div className={classes.root}>
         <AppBar position="static" color="default">
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="primary"
               textColor="primary"
               variant="fullWidth"
               aria-label="full width tabs example"
            >
               <Tab label="SUBDIRECCIÓN DE GESTIÓN TÉCNICA MIGRATORIA" {...a11yProps(0)} />
               <Tab label="SUBDIRECCIÓN DE FISCALIZACIÓN MIGRATORIA" {...a11yProps(1)} />
            </Tabs>
         </AppBar>

         <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
         >
            <TabPanel value={value} index={0} dir={theme.direction}>
               <Grid container spacing={3}>
                  {
                     lineamientos.subdireccion1.map((lineamiento, i) => (
                        <Grid item key={i} xs={3}>
                           <SimpleCard titulo={lineamiento} descripcion='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam in mollitia enim quaerat nobis, natus odit saepe velit harum excepturi.' />
                        </Grid>
                     ))
                  }
               </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
               <Grid container spacing={3}>
                  {
                     lineamientos.subdireccion2.map((lineamiento, i) => (
                        <Grid item key={i} xs={3}>
                           <SimpleCard titulo={lineamiento} descripcion='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam in mollitia enim quaerat nobis, natus odit saepe velit harum excepturi.' />
                        </Grid>
                     ))
                  }
               </Grid>
            </TabPanel>
         </SwipeableViews>
      </div>
   )
}