import { useSelector, useDispatch } from 'react-redux'
import {
   handleInputOnChange,
   handleInputsReset,
   saveOperativo,
   toListOperativo,
   toListOpePivoted,
   toListOpePivotedByNacionalidad,
   toListOpePivotedBySexo,
   toListOpePivotedByModalidad,
   toListOpeByFilterToExcel,
   toListOpeAnualPivoted,
   toListIntervenidosPivoted,
   toListTipoInfraccionPivoted,
   toListTipoOpePivoted,
   toUpdateOpeById,
   resetListOpeByFilterToExcel,
   toListOperativoJZ
} from 'redux/actions/operativoAction'

export default function useOperativo() {

   /*» STORE HOOK'S  */
   const dispatch = useDispatch()

   /*»CUSTOM HOOK'S  */
   const { 
      loading: operativoLoading, 
      data: operativoDb, 
      inputValues,
      pivotedOpeAnual:{
         data: opeAnualPivotedDb
      },
      pivotedIntervenidos:{
         data: intervenidosPivotedDb
      },
      pivotedTipoInfraccion:{
         data: tipoInfraccionPivotedDb
      },
      pivotedTipoOperativo:{
         data: tipoOpePivotedDb
      },
      operativoJZ:{
         data: operativoJZDb
      },
      pivotedOpe: {
         data: opePivotedDb
      },
      pivotedOpeByNacionalidad: {
         data: opePivotedByNacionalidadDb
      },
      pivotedOpeBySexo:{
         data: opePivotedBySexoDb
      },
      pivotedOpeByModalidad:{
         data: opePivotedByModalidadDb
      },
      opeByCustomFilterToExcel:{
         loading: opeByCustomFilterToExcelLoading,
         data: opeByCustomFilterToExcelDb
      }
   } = useSelector(store => store.operativo)
   
   /*» EFFECT'S  */
   /*» Si, usuario pertenece a JZLima ... */
   /* useEffect(() => { dispatch(handleInputOnChange({ dependencia })) }, [dependencia]) */

   /*» HANDLER'S */
   /*» Input's ... */
   const handleChangeInputControlled = ({ target: { name, value } }) => { dispatch(handleInputOnChange({ [name]: value })) }

   /*» Inputs: <Autocomplete /> | <Select /> ... */
   const handleChangeInputUncontrolled = (meta) => { dispatch(handleInputOnChange(meta)) }

   const handleInputsOnReset = () => { dispatch(handleInputsReset()) }
   const handleSaveOperativo = () => { dispatch(saveOperativo()) }
   const handleFindByApprox = (payload) => { console.log(payload) }
   const handleFindAllOperativo = () => { dispatch(toListOperativo()) }
   const handleFindAllOpeJZ = () => { dispatch(toListOperativoJZ()) }
   const handleFindAllOpeAnualPivoted = () => { dispatch(toListOpeAnualPivoted()) }
   const handleFindOpeByFilterToExcel = ({distrito = {}, tipoOperativo = {}, ...rest }) => { 
      dispatch(toListOpeByFilterToExcel({ ...rest, distrito: distrito || {}, tipoOperativo: tipoOperativo || {} })) 
   }
   const handleResetOpeByFilterToExcel = () => { dispatch(resetListOpeByFilterToExcel()) }
   const handleFindAllIntervenidosPivoted = (payload) => { dispatch(toListIntervenidosPivoted(payload)) }
   const handleFindTipoInfraccionPivoted = (payload) => { dispatch(toListTipoInfraccionPivoted(payload)) }
   const handleFindTipoOpePivoted = (payload) => { dispatch(toListTipoOpePivoted(payload)) }
   const handleFindAllOpePivoted = () => { dispatch(toListOpePivoted()) }
   const handleFindOpePivotedByNacionalidad = (payload) => { dispatch(toListOpePivotedByNacionalidad(payload)) }
   const handleFindOpePivotedBySexo = (payload) => { dispatch(toListOpePivotedBySexo(payload)) }
   const handleFindOpePivotedByModalidad = (payload) => { dispatch(toListOpePivotedByModalidad(payload)) }
   const handleUpdateOpeById = (idOpe, newNumeroInforme) => { dispatch(toUpdateOpeById(idOpe, newNumeroInforme)) }

   return {
      operativoDb,
      operativoLoading,
      opeAnualPivotedDb,
      opePivotedDb,
      operativoJZDb,
      opePivotedByNacionalidadDb,
      opePivotedBySexoDb,
      opePivotedByModalidadDb,
      opeByCustomFilterToExcelLoading,
      opeByCustomFilterToExcelDb,
      intervenidosPivotedDb,
      tipoInfraccionPivotedDb,
      tipoOpePivotedDb,
      
      inputValues,

      handleChangeInputControlled,
      handleChangeInputUncontrolled,
      handleInputsOnReset,
      handleSaveOperativo,
      handleFindAllOpeJZ,
      handleFindByApprox,
      handleFindAllOpeAnualPivoted,
      handleFindAllOperativo,
      handleFindAllOpePivoted,
      handleFindOpePivotedByNacionalidad,
      handleFindOpePivotedBySexo,
      handleFindOpePivotedByModalidad,
      handleFindOpeByFilterToExcel,
      handleResetOpeByFilterToExcel,
      handleFindAllIntervenidosPivoted,
      handleFindTipoInfraccionPivoted,
      handleFindTipoOpePivoted,
      handleUpdateOpeById
   }
}