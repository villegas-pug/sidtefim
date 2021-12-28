import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
   findByNumeroExpediente,
   findByNumeroExpedienteAndUsr,
   findAllUbicacionMininter,
   saveDetExpMininter,
   saveOficioInExpediente,
   saveMailFileInOficio,
   deleteDetExpMininter,
   saveExpedienteMininter,
   findByUbicacion
} from 'redux/actions/expedienteMininterAction'

export default function useExpedienteMininter(){

   /*» HOOK'S STORE ... */
   const { 
      loading: mininterDbLoading,
      data: {
         nacionalizacion: nacionalizacionDb,
         expedienteMininter: expedienteMininterDb
      },
      warning: mininterDbWarning,
      ubicacionMininter: {
         data: ubicacionMininterDb
      }
   } = useSelector(store => store.expedienteMininter)
   const dispatch = useDispatch()

   /*» HANDLER'S ... */
   const handleFindByNumeroExpediente = (numeroTramite) => numeroTramite.length >= 5 && dispatch(findByNumeroExpediente(numeroTramite))
   const handleFindByNumeroExpedienteAndUsr = (numeroTramite) => numeroTramite.length >= 5 && dispatch(findByNumeroExpedienteAndUsr(numeroTramite))
   const handleFindAllUbicacionMininter = () => dispatch(findAllUbicacionMininter())
   const handleSaveDetExpeMininter = (detExpeMininter) => dispatch(saveDetExpMininter(detExpeMininter))
   const handleSaveOficioInExpediente = (detExpeMininter) => dispatch(saveOficioInExpediente(detExpeMininter))
   const handleDeleteDetExpeMininter = (detExpeMininter) => dispatch(deleteDetExpMininter(detExpeMininter))
   const handleSaveExpedienteMininter = () => dispatch(saveExpedienteMininter())
   const handleGetRptByUbicacionExpeMininter = (payload) => dispatch(findByUbicacion(payload.ubicacion))
   const handleAddMailToOficio = (detExpedienteMininter, file) => { dispatch(saveMailFileInOficio(detExpedienteMininter, file)) }

   const handleDowloadMail = () => {}
   const handleDeleteMail = () => {}

   /*» DEPENDENCY'S ... */
   const isNewToMiniter = useMemo(() => Boolean(nacionalizacionDb) && !expedienteMininterDb, [nacionalizacionDb, expedienteMininterDb])
   const isOldToMininter = useMemo(() => Boolean(nacionalizacionDb) && Boolean(expedienteMininterDb), [nacionalizacionDb, expedienteMininterDb])
   const detExpedienteMininterDb = useMemo(() => expedienteMininterDb?.detExpedienteMininter || [], [expedienteMininterDb])

   return {
      mininterDbLoading,
      nacionalizacionDb,
      expedienteMininterDb,
      detExpedienteMininterDb,
      mininterDbWarning,
      ubicacionMininterDb,

      isNewToMiniter,
      isOldToMininter,

      handleFindByNumeroExpediente,
      handleFindByNumeroExpedienteAndUsr,
      handleFindAllUbicacionMininter,
      handleSaveDetExpeMininter,
      handleSaveOficioInExpediente,
      handleDeleteDetExpeMininter,
      handleSaveExpedienteMininter,
      handleGetRptByUbicacionExpeMininter,
      handleAddMailToOficio,
      handleDeleteMail,
      handleDowloadMail,
   }
}