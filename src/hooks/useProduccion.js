import { useState, useEffect } from 'react'
import { 
   format, 
   getISODay,
   parseISO,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { 
   allowToRegisterProduccion,
   denyToRegisterProduccion,
   saveProduccionSdfm,
   deleteProduccionById,
   selectedIdProduccionOnTodayList,
   countActividadCurrentWeek,
   countActividadWeek,
   listActividad,
   saveActividad,
   deleteActividadById
} from 'redux/actions/produccionAction'

import DetalleProduccion from 'models/DetalleProduccion'

const date = new Date()
const currentDayOfWeek = getISODay(date)

export default function useProduccion(){

   /*» HOOK'S STORE */
   const {
      sdfm: { 
         allowRegisterProd,
         selectedIdOnTodayActivityList,
         data: produccionTodayDb,
         loading: produccionTodayLoading,
         produccionCurrentWeek: {
            loading: produccionCurrentWeekDbLoading,
            data: produccionCurrentWeekDb
         },
         produccionWeek:{
            loading: produccionWeekDbLoading
         }
      },
      actividadDb: {
         loading: actividadDbLoading,
         data: {
            descripcionActividadDb,
            accionDesarrolladaDb
         }
      }
   } = useSelector(store => store.produccion)
   const dispatch = useDispatch()

   /*» HOOK'S...  */
   const history = useHistory()
   const [productionAdvanceByDay, setProductionAdvanceByDay] = useState([])
   const [listViewRightAside, setListViewRightAside] = useState({})

   /*» EFFECT'S... */
   useEffect(() => {
      const advanceByWeek = []
      let progress = 0
      produccionCurrentWeekDb.forEach(({fecha, dia, contarActividad}) => {
         progress = contarActividad > 0 ? progress + 0.2 : progress
         advanceByWeek.push({
            dayOfWeek: dia, 
            date: format(parseISO(fecha), 'PPPP', { locale: es }),
            enableToday: currentDayOfWeek === getISODay(parseISO(fecha)),
            progress: contarActividad > 0 ? progress : 0
         })
      })
      setProductionAdvanceByDay(advanceByWeek)
   }, [produccionCurrentWeekDb])

   useEffect(() => {
      setListViewRightAside(
         produccionTodayDb.find(({ idProduccion }) => idProduccion === selectedIdOnTodayActivityList)
      )
   }, [selectedIdOnTodayActivityList])

   /*» HANDLER'S  */
   const handleAllowRegisterProd = () => { dispatch(allowToRegisterProduccion()) } 
   const handleDenyRegisterProd = () => { dispatch(denyToRegisterProduccion()) } 
   const handleRegistrarActividad = (path) => (handleAllowRegisterProd(), history.push(path))

   const handleSaveProduccion = (actividad, accion) => {
      const detalleProduccion = new DetalleProduccion(actividad, accion)
      dispatch(saveProduccionSdfm(detalleProduccion))
   }

   const handleDeleteProduccionById = (idProd) => { dispatch(deleteProduccionById(idProd))}
   const handleSelectedIdProduccionOnTodayList = (idProd) => { dispatch(selectedIdProduccionOnTodayList(idProd)) }
   const handleCountActividadCurrentWeek = () => { dispatch(countActividadCurrentWeek()) }
   const handleCountProduccionWeek = (refDate) => { dispatch(countActividadWeek(refDate)) }
   const handleListActividad = () => { dispatch(listActividad()) }
   const handleSaveActividad = (newActividad) => { dispatch(saveActividad(newActividad)) }
   const handleDeleteActividadById = (idActividad) => { dispatch(deleteActividadById(idActividad)) }

   return {
      produccionTodayDb,
      produccionTodayLoading,
      produccionWeekDbLoading,
      produccionCurrentWeekDbLoading,
      allowRegisterProd,
      productionAdvanceByDay,
      descripcionActividadDb,
      accionDesarrolladaDb,
      actividadDbLoading,
      listViewRightAside,

      handleListActividad,
      handleSaveActividad,
      handleAllowRegisterProd,
      handleDenyRegisterProd,
      handleRegistrarActividad,
      handleSaveProduccion,
      handleDeleteProduccionById,
      handleSelectedIdProduccionOnTodayList,
      handleCountActividadCurrentWeek,
      handleCountProduccionWeek,
      handleDeleteActividadById
   }
}