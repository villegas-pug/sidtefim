import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
   findAllNuevoTramiteNac,
   uploadNuevoTramiteNac,
   changeInputsFilter,
   saveFechaMPNuevoTramiteNac,
   toAssignRevisor,
   unassignRevisor,
   findAllAssignedInEvalByUsr,
   readAssignment,
   checkRequisitoTramiteNac,
   finishEvaluarTramiteNac
} from 'redux/actions/nuevoTramiteNacAction'

import { EVALUACION, RECEPCION_DNAC } from 'constants/etapasNacionalizacion'

const NUEVO_TRAMITE_NAC_TO_ASSIGN_REVISOR = 1
const UPLOAD_NUEVO_TRAMITE_NAC = 2
const TRAMITES_NUEVOS = 3
const TRAMITES_NO_LEIDOS = 4
const TRAMITES_LEIDOS = 5
const TRAMITES_FUERA_PLAZO = 6

const getCommonDb = (nuevoTramiteDb, filterType) => {
   switch (filterType) {
   case NUEVO_TRAMITE_NAC_TO_ASSIGN_REVISOR:
   case UPLOAD_NUEVO_TRAMITE_NAC:
      return nuevoTramiteDb?.filter(({ etapa: { idEtapa }}) => idEtapa === RECEPCION_DNAC || idEtapa === EVALUACION)
   case TRAMITES_NUEVOS:
      return nuevoTramiteDb?.filter(({ etapa: { idEtapa } }) => idEtapa ===  RECEPCION_DNAC)
   case TRAMITES_NO_LEIDOS:
      return nuevoTramiteDb?.filter(({ evaluarTramiteNac }) => evaluarTramiteNac?.leido === false)
   case TRAMITES_LEIDOS:
      return nuevoTramiteDb?.filter(({ evaluarTramiteNac }) => evaluarTramiteNac?.completado === false && evaluarTramiteNac?.leido === true)
   case TRAMITES_FUERA_PLAZO:
      return nuevoTramiteDb?.filter(({ isVencido }) => isVencido)
   default:
      return []
   }
}

export default function useNuevoTramiteNac(){

   /*» STORE-HOOK'S  */
   const { 
      loading: nuevoTramiteDbLoading, 
      data: nuevoTramiteDb,
      inputsFilter,
      assignedInEvalByUsr: {
         data: assignedInEvalByUsrDb,
         loading: assignedInEvalByUsrDbLoading
      } 

   } = useSelector(store => store.nuevoTramiteNac)
   const dispatch = useDispatch()

   /*» HOOK'S  */
   const [commonDb, setCommonDb] = useState([])
   const filterType = useRef(-1)

   /*» EFFECT'S */
   useEffect(() => { setCommonDb(getCommonDb(nuevoTramiteDb, filterType.current)) }, [nuevoTramiteDb])

   /*» DEP'S */
   const countAssignedInEvalByUsrByLeido = useMemo(() => {
      return assignedInEvalByUsrDb?.filter(({ leido }) => leido).length || 0
   }, [assignedInEvalByUsrDb])

   const countAssignedInEvalByUsrByNoLeido = useMemo(() => {
      return assignedInEvalByUsrDb?.filter(({ leido }) => !leido).length || 0
   }, [assignedInEvalByUsrDb])
   
   
   /*» HANDLER'S */
   const handleTramitesNuevos = () => {
      handleFindAllNuevoTramiteNac()
      filterType.current = TRAMITES_NUEVOS
   }
   const handleTramitesNoLeidos = () => { 
      handleFindAllNuevoTramiteNac()
      filterType.current = TRAMITES_NO_LEIDOS
   }
   const handleTramitesLeidos = () => {
      handleFindAllNuevoTramiteNac()
      filterType.current = TRAMITES_LEIDOS
   }
   const handleTramitesFueraPlazo = () => {
      handleFindAllNuevoTramiteNac()
      filterType.current = TRAMITES_FUERA_PLAZO
   }
   const handleFindAllNuevoTramiteNac = () => dispatch(findAllNuevoTramiteNac())
   const handleTramiteNacToAssignRevisor = () => {
      handleFindAllNuevoTramiteNac()
      filterType.current = NUEVO_TRAMITE_NAC_TO_ASSIGN_REVISOR
   }
   const handleChangeInputsFilter = ({ target: { name, value } }) => {
      dispatch(changeInputsFilter({[name]: value}))
   }
   const  handleUploadNuevoTramiteNac = ({ target: { files } }) => {
      const frmData = new FormData()
      frmData.append('file', files[0])
      dispatch(uploadNuevoTramiteNac(frmData))
      filterType.current = UPLOAD_NUEVO_TRAMITE_NAC
   }
   const handleSearchByInputs = (values) => {
      const { numeroTramite: numeroTramiteInput, administrado: administradoInput } = values
      let dbFiltered = nuevoTramiteDb.filter(({ numeroTramite, administrado }) => (
         numeroTramite.toLowerCase().includes(numeroTramiteInput.toLowerCase()) 
         && administrado.toLowerCase().includes(administradoInput.toLowerCase())
      ))
      setCommonDb(dbFiltered)
   }
   const handleSaveFechaMPNuevoTramiteNac = (nuevoTramiteNac, values) => {
      dispatch(saveFechaMPNuevoTramiteNac({ ...nuevoTramiteNac, ...values }))
   }
   const handleToAssignRevisor = (nuevoTramiteNac, value) => {
      dispatch(toAssignRevisor({ ...nuevoTramiteNac, evaluarTramiteNac: value }))
   }
   const handleUnassignRevisor = (nuevoTramiteNac) => { dispatch(unassignRevisor(nuevoTramiteNac)) }

   const handleFindAllAssignedInEvalByUsr = () => { dispatch(findAllAssignedInEvalByUsr()) }
   const handleReadAssignment = (evaluarTramiteNac) => { dispatch(readAssignment(evaluarTramiteNac)) }
   const handleCheckRequisitoTramiteNac = (evalRequisitoTramiteNac) => { dispatch(checkRequisitoTramiteNac(evalRequisitoTramiteNac)) }
   
   const handleFinishEvaluarTramiteNac = (IdEvalReqTramite) => {
      dispatch(finishEvaluarTramiteNac(getEvalTramiteByIdEvalReqTramite(IdEvalReqTramite)))
   }

   const getEvalTramiteByIdEvalReqTramite = useCallback((id) => {
      return assignedInEvalByUsrDb.find(({ evalRequisitoTramiteNac }) => {
         return evalRequisitoTramiteNac.some(({ idEvalReqTramite }) => idEvalReqTramite === id)
      })
   }, [assignedInEvalByUsrDb])

   return {
      commonDb,
      nuevoTramiteDb,
      nuevoTramiteDbLoading,
      assignedInEvalByUsrDb,
      assignedInEvalByUsrDbLoading,

      inputsFilter,

      countTramitesNuevos: getCommonDb(nuevoTramiteDb, TRAMITES_NUEVOS).length,
      countTramitesNoLeidos: getCommonDb(nuevoTramiteDb, TRAMITES_NO_LEIDOS).length,
      countTramitesLeidos: getCommonDb(nuevoTramiteDb, TRAMITES_LEIDOS).length,
      countTramitesFueraPlazo: getCommonDb(nuevoTramiteDb, TRAMITES_FUERA_PLAZO).length,
      countAssignedInEvalByUsrByLeido,
      countAssignedInEvalByUsrByNoLeido,

      getEvalTramiteByIdEvalReqTramite,

      handleFindAllNuevoTramiteNac,
      handleUploadNuevoTramiteNac,
      handleTramiteNacToAssignRevisor,
      handleChangeInputsFilter,
      handleSearchByInputs,
      handleTramitesNuevos,
      handleTramitesNoLeidos,
      handleTramitesLeidos,
      handleTramitesFueraPlazo,
      handleSaveFechaMPNuevoTramiteNac,
      handleToAssignRevisor,
      handleUnassignRevisor,
      handleFindAllAssignedInEvalByUsr,
      handleReadAssignment,
      handleCheckRequisitoTramiteNac,
      handleFinishEvaluarTramiteNac
   }
}