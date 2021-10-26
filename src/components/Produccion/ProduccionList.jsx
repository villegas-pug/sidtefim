import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
   List,
   ListItem,
   ListItemSecondaryAction,
   ListItemText,
   ListItemAvatar,
   Checkbox,
   FormControl,
   FormHelperText,
   Input,
   InputAdornment,
   Typography,
   Button,
   Divider
} from '@material-ui/core'
import { 
   AddShoppingCart,
   DoneAll,
   FilterList
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useDebounce } from 'use-debounce'

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: 5,
      width: 1000,
      height: 200,
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
   },
   button:{
      marginTop: 15
   },
   formControl:{
      marginLeft: 10
   },
   input: {
      marginTop: 5,
      width: 300
   }
}))

export default function ProduccionList({ data, handleSelection, title }) {

   /*» HOOK'S  */
   const classes = useStyles()
   const shoppingCart = useRef([])
   const [refData, setRefData] = useState(data)
   const [idChecked, setIdChecked] = useState('')
   const [filter, setFilter] = useState('')
   const [debounceFilter] = useDebounce(filter, 500)

   /*» EFFECT'S  */
   useEffect(() => {
      setRefData(
         data.filter(({ descripcion }) => {
            return descripcion.toLowerCase().includes(filter.toLowerCase())
         })
      )
   }, [debounceFilter])


   /*» HANDLER'S  */
   const handleToggle = (selectedId) => (shoppingCart.current = data.find(({idActividad}) => idActividad === selectedId), setIdChecked(selectedId))
   const handleFinishSelection = () => { handleSelection(shoppingCart.current)}
   const handleChangeFilter = ({target:{ value }}) => { setFilter(value) }

   return (
      <>
         <Typography gutterBottom variant='h4' color='primary'>{title}</Typography>
         <Divider />
         <FormControl className={classes.formControl}>
            <Input
               autoFocus
               className={classes.input}
               startAdornment={
                  <InputAdornment>
                     <FilterList />
                  </InputAdornment>
               }
               onChange={handleChangeFilter}
            />
            <FormHelperText>Escriba un filtro</FormHelperText>
         </FormControl>
         <List dense className={classes.root}>
            {
               refData.map(({idActividad, descripcion}) => (
                  <ListItem key={idActividad} button>
                     <ListItemAvatar>
                        <AddShoppingCart /> 
                     </ListItemAvatar>
                     <ListItemText id={idActividad} primary={descripcion} />
                     <ListItemSecondaryAction>
                        <Checkbox
                           color='primary'
                           edge='end'
                           onChange={() => handleToggle(idActividad)}
                           checked={idChecked === idActividad}
                        />
                     </ListItemSecondaryAction>
                  </ListItem>
               ))
            }
         </List>
         <Button
            color='primary'
            variant='contained'
            startIcon={<DoneAll fontSize='large' />}
            className={classes.button}
            onClick={() => handleFinishSelection()}
         />
      </>
   )
}

ProduccionList.propTypes = {
   data: PropTypes.array.isRequired,
   handleSelection: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired
}