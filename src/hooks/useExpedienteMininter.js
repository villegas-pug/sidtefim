import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
   findByNumeroExpediente,
   findByNumeroExpedienteAndUsr,
   findAllUbicacionMininter,
   findByUbicacion,
   findAllResumenPlazoOficios,
   saveDetExpMininter,
   saveOficioInExpediente,
   saveMailFileInOficio,
   saveExpedienteMininter,
   deleteDetExpMininter,
   deleteMailFileById,
   downloadMailFile,
   downloadFileResumenPlazoOficios
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
      },
      resumenPlazoOficios: {
         loading: resumenPlazoOficiosLoadingDb,
         data: resumenPlazoOficiosDb,
      },
      fileDownload: {  loading: fileDownloadLoading }
   } = useSelector(store => store.expedienteMininter)
   const dispatch = useDispatch()

   /*» HANDLER'S ... */
   const handleFindByNumeroExpediente = (numeroTramite) => numeroTramite.length >= 5 && dispatch(findByNumeroExpediente(numeroTramite))
   const handleFindByNumeroExpedienteAndUsr = (numeroTramite) => numeroTramite.length >= 5 && dispatch(findByNumeroExpedienteAndUsr(numeroTramite))
   const handleFindAllUbicacionMininter = () => { dispatch(findAllUbicacionMininter()) }
   const handleSaveDetExpeMininter = (detExpeMininter) => dispatch(saveDetExpMininter(detExpeMininter))
   const handleSaveOficioInExpediente = (detExpeMininter) => dispatch(saveOficioInExpediente(detExpeMininter))
   const handleDeleteDetExpeMininter = (detExpeMininter) => dispatch(deleteDetExpMininter(detExpeMininter))
   const handleSaveExpedienteMininter = () => dispatch(saveExpedienteMininter())
   const handleGetRptByUbicacionExpeMininter = (payload) => dispatch(findByUbicacion(payload.ubicacion))
   const handleAddMailToOficio = (detExpedienteMininter, file) => { dispatch(saveMailFileInOficio(detExpedienteMininter, file)) }
   const handleDeleteMail = (idMailFile) => { dispatch(deleteMailFileById(idMailFile)) }
   const handleDownloadMail = (idMailFile) => { dispatch(downloadMailFile(idMailFile)) }
   const handleDownloadFileResumenPlazoOficios = (estadoPlazo) => { dispatch(downloadFileResumenPlazoOficios(estadoPlazo)) }
   const handleFindAllResumenPlazoOficios = () => { dispatch(findAllResumenPlazoOficios()) }

   /*» DEPENDENCY'S ... */
   const isNewToMiniter = useMemo(() => Boolean(nacionalizacionDb) && !expedienteMininterDb, [nacionalizacionDb, expedienteMininterDb])
   const isOldToMininter = useMemo(() => Boolean(nacionalizacionDb) && Boolean(expedienteMininterDb), [nacionalizacionDb, expedienteMininterDb])
   const detExpedienteMininterDb = useMemo(() => expedienteMininterDb?.detExpedienteMininter || [], [expedienteMininterDb])
   const getMailFilesDb = useCallback((idDetExp) => detExpedienteMininterDb?.filter(({ idDetExpMininter }) => idDetExpMininter === idDetExp)[0]?.mailFiles || [], [detExpedienteMininterDb])

   return {
      mininterDbLoading,
      fileDownloadLoading,
      nacionalizacionDb,
      expedienteMininterDb,
      detExpedienteMininterDb,
      mininterDbWarning,
      ubicacionMininterDb,
      resumenPlazoOficiosLoadingDb,
      resumenPlazoOficiosDb,
      getMailFilesDb,

      isNewToMiniter,
      isOldToMininter,

      handleFindByNumeroExpediente,
      handleFindByNumeroExpedienteAndUsr,
      handleFindAllUbicacionMininter,
      handleFindAllResumenPlazoOficios,
      handleSaveDetExpeMininter,
      handleSaveOficioInExpediente,
      handleDeleteDetExpeMininter,
      handleSaveExpedienteMininter,
      handleGetRptByUbicacionExpeMininter,
      handleAddMailToOficio,
      handleDeleteMail,
      handleDownloadMail,
      handleDownloadFileResumenPlazoOficios
   }
}