import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
   toListProcPNac,
   downloadProcByCustomFilter
} from 'redux/actions/nacionalizacionAction'

export default function useNacionalizacion(){
   
   /*» STORE HOOK'S  */
   const dispatch = useDispatch()
   const { 
      loading: procnacDbLoading,
      procPNacDb
   } = useSelector(store => store.nacionalizacion)

   /*» HOOK'S  */
   const [añoProcNacDistinct, setAñoProcNacDistinct] = useState([])
   const mapCountProcNacByAño = useRef({})
   const tipoProcNacDistinct = useRef([])
   const etapaProcNacDistinct = useRef([])

   /*» EFFECT'S  */
   useEffect(() => {
      procPNacDb.length > 0 
         && setAñoProcNacDistinct(new Set(procPNacDb.map(({añoTramite}) => añoTramite)))
   }, [procPNacDb])
   useEffect(() => {
      procPNacDb.length > 0 
         && (tipoProcNacDistinct.current = new Set(procPNacDb.map(({tipoTramite}) => tipoTramite)))
   }, [procPNacDb])
   useEffect(() => {
      procPNacDb.length > 0 
         && (etapaProcNacDistinct.current = new Set(procPNacDb.map(({etapaTramite}) => etapaTramite)))
   }, [procPNacDb])
   useEffect(() => {
      if(procPNacDb.length > 0){
         mapCountProcNacByAño.current = procPNacDb.reduce((map, {añoTramite, contarPendiente}) => 
            (map[añoTramite] = (map[añoTramite] || 0) + contarPendiente, map), {})
      }
   }, [procPNacDb])


   /*» HANDLER'S  */
   const handleToListProcPNac = () => { dispatch(toListProcPNac()) }

   const filterProcNacByAñoAndTipoProc = (año, tipo) => {
      const mapNac = procPNacDb.filter(({añoTramite, tipoTramite}) => año === añoTramite && tipo === tipoTramite)
         .reduce((map, record) => {
            const { tipoTramite, contarPendiente } = record
            map[tipoTramite] = {
               ...record,
               contarPendiente: (map[tipoTramite] ? map[tipoTramite].contarPendiente : 0) + contarPendiente
            } 
            return map
         }, {})
      return Object.values(mapNac)
   }
   const filterProcNacByAñoAndTipoProcAndEtapa = (año, tipo, etapa) => {
      return procPNacDb.filter(
         ({añoTramite, tipoTramite, etapaTramite}) => 
            año === añoTramite && tipo === tipoTramite && etapaTramite === etapa
      )
   }
   const handleDownloadProcByCustomFilter = (payload) => { dispatch(downloadProcByCustomFilter(payload)) }

   return {
      procPNacDb,
      procnacDbLoading,
      añoProcNacDistinct,
      mapCountProcNacByAño: mapCountProcNacByAño.current,
      tipoProcNacDistinct: tipoProcNacDistinct.current,
      etapaProcNacDistinct: etapaProcNacDistinct.current,

      handleToListProcPNac,
      filterProcNacByAñoAndTipoProc,
      filterProcNacByAñoAndTipoProcAndEtapa,
      handleDownloadProcByCustomFilter
   }
}