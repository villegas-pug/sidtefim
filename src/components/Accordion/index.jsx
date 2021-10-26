import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Typography,
   TextField,
   InputAdornment,
   IconButton,
   Box,
   Tooltip
} from '@material-ui/core'
import { ExpandMore, Visibility, Add, HighlightOff } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
   },
}))

export default function MyAccordion({ groups }) {

   const classes = useStyles()

   const handleOnClickShowDoc = (item) => { console.log(item) }
   const handleOnClickDeleteDoc = (item) => { console.log(item) }
   const handleOnAddDoc = (item) => { console.log(item) }

   return (
      <div className={classes.root}>
         {
            groups.map(({ name, items }, i) => (
               <Accordion
                  key={i}
               >
                  <AccordionSummary
                     expandIcon={<ExpandMore />}
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <Box display='flex' alignItems='center'>
                        <IconButton
                           onClick={() => { handleOnAddDoc(name) }}
                        >
                           <Tooltip title='Agregar' arrow>
                              <Add />
                           </Tooltip>
                        </IconButton>
                        <Typography className={classes.heading}>{name}</Typography>
                     </Box>
                  </AccordionSummary>
                  {
                     items.map((item, i) => (
                        <AccordionDetails key={i}>
                           <TextField
                              variant='outlined'
                              fullWidth
                              disabled
                              value={item}
                              InputProps={{
                                 endAdornment: <InputAdornment position='end'>
                                    <IconButton
                                       onClick={() => { handleOnClickShowDoc(item) }}
                                    >
                                       <Visibility />
                                    </IconButton>
                                    <IconButton
                                       onClick={() => { handleOnClickDeleteDoc(item) }}
                                    >
                                       <HighlightOff />
                                    </IconButton>
                                 </InputAdornment>
                              }}
                           />
                        </AccordionDetails>
                     ))
                  }
               </Accordion>
            ))
         }
      </div>
   )
}

MyAccordion.propTypes = {
   groups: PropTypes.array.isRequired
}