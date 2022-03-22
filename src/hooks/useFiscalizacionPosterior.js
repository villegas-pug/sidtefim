import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
   findAllMetadataOfFiles,
   saveAllSolicitudesSFM,
   findAllTipoTramite,
   findSolicitudByNumeroExpe,
   resetSolicitudValues,
   saveDocInBandejaEntrada
} from 'redux/actions/fiscalizacionPosteriorAction'

export default function useFiscalizacionPosterior(){

   /*» HOOK'S  */
   const { 
      loading: fiscalizacionPosteriorDbLoading,
      metadataFilesSolicitud: metadataFilesSolicitudDb,
      tipoTramite:{
         data: tipoTramiteDb
      },
      solicitudValues:{
         loading: solicitudValuesDbLoading,
         values: solicitudValuesDb
      },
      bandejaEntrada: {
         loading: bandejaEntradaDbLoading,
         data: bandejaEntradaDb,
      }
   } = useSelector(store => store.fiscalizacionPosterior)
   const dispatch = useDispatch()

   /*» HANDLER'S  */
   const handleFindAllMetadataOfFiles = () => { dispatch(findAllMetadataOfFiles()) }
   const handleSaveAllSolicitudesSFM = (file) => { 
      const frmData = new FormData()
      frmData.append('file', file)
      dispatch(saveAllSolicitudesSFM(frmData)) 
   }
   const handleFindAllTipoTramite = () => { dispatch(findAllTipoTramite()) }
   const handleFindSolicitudByNumeroExpe = (values) => { dispatch(findSolicitudByNumeroExpe(values)) }
   const handleResetSolicitudValues = () => { dispatch(resetSolicitudValues()) }
   const handleSaveDocInBandejaEntrada = (expediente) => { dispatch(saveDocInBandejaEntrada(expediente)) }

   /*» DEP'S  */
   const simpleTipoTramiteDb = useMemo(() => tipoTramiteDb.map(({ descripcion }) => descripcion), [tipoTramiteDb])

   return {
      fiscalizacionPosteriorDbLoading,
      metadataFilesSolicitudDb,
      tipoTramiteDb,
      simpleTipoTramiteDb,
      solicitudValuesDb,
      solicitudValuesDbLoading,
      bandejaEntradaDbLoading,
      bandejaEntradaDb,

      handleFindAllMetadataOfFiles,
      handleSaveAllSolicitudesSFM,
      handleFindAllTipoTramite,
      handleFindSolicitudByNumeroExpe,
      handleResetSolicitudValues,
      handleSaveDocInBandejaEntrada,
   }

}