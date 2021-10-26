import { lazy } from 'react'

/*» MOD'S  */
const HomeMod = lazy(() => import('pages/modulo/HomeMod'))
const ActividadesMod = lazy(() => import('pages/modulo/ActividadesMod'))
const PerfilMod = lazy(() => import('pages/modulo/PerfilMod'))
const UtilidadesMod = lazy(() => import('pages/modulo/UtilidadesMod'))
const ReporteMod = lazy(() => import('pages/modulo/ReportesMod'))
const LineamientoMod = lazy(() => import('pages/modulo/LineamientosMod'))
const ProcesosMod = lazy(() => import('pages/modulo/ProcesosMod'))

/*» SUBMOD'S  */
const RptMesaDigitalSubMod = lazy(() => import('pages/submodulo/MesaDigitalRptSubMod'))
const NuevoOperativoSubMod = lazy(() => import('pages/submodulo/NuevoOperativoSubMod'))
const NuevoInterpolSubMod = lazy(() => import('pages/submodulo/NuevoInterpolSubMod'))
const NuevaActividadSubMod = lazy(() => import('pages/submodulo/NuevaActividadSubMod'))
const BuscarInterpolSubMod = lazy(() => import('pages/submodulo/BuscarInterpolSubMod'))  
const BuscarOperativoSubMod = lazy(() => import('pages/submodulo/BuscarOperativoSubMod'))
const BuscarPreInscripcionSubMod = lazy(() => import('pages/submodulo/BuscarPreInscripcionSubMod'))
const BuscarRefugiadoSubMod = lazy(() => import('pages/submodulo/BuscarRefugiadoSubMod'))
const DashboardOperativoSubMod = lazy(() => import('pages/submodulo/OperativoRptSubMod'))
const RegistrarActividad = lazy(() => import('pages/submodulo/RegistrarActividad'))
const ProduccionRptSubMod = lazy(() => import('pages/submodulo/ProduccionRptSubMod'))
const NacionalizacionRptSubMod = lazy(() => import('pages/submodulo/NacionalizacionRptSubMod'))


/*» ITEM'S */
const PendientesRptItem = lazy(() => import('components/Nacionalizacion/Item/PendientesRptItem'))

import { modulo as modName, subModulo as subModName, item as itemName } from 'constants/components'

const modulo = [
   {
      name: modName.HOME,
      component: HomeMod
   }, {
      name: modName.PERFIL,
      component: PerfilMod
   }, {
      name: modName.ACTIVIDADES,
      component: ActividadesMod
   }, {
      name: modName.LINEAMIENTOS,
      component: LineamientoMod
   }, {
      name: modName.PROCESOS,
      component: ProcesosMod
   }, {
      name: modName.UTILIDADES,
      component: UtilidadesMod
   },  {
      name: modName.REPORTES,
      component: ReporteMod
   },
]

const subModulo = [
   {
      name: subModName.NUEVO_OPERATIVO,
      component: NuevoOperativoSubMod
   }, {
      name: subModName.NUEVO_INTERPOL,
      component: NuevoInterpolSubMod
   }, {
      name: subModName.NUEVA_ACTIVIDAD,
      component: NuevaActividadSubMod
   }, {
      name: subModName.BUSCAR_OPERATIVO,
      component: BuscarOperativoSubMod
   }, {
      name: subModName.BUSCAR_INTERPOL,
      component: BuscarInterpolSubMod
   }, {
      name: subModName.BUSCAR_PRE_INSCRIPCION,
      component: BuscarPreInscripcionSubMod
   }, {
      name: subModName.BUSCAR_REFUGIADO,
      component: BuscarRefugiadoSubMod
   }, {
      name: subModName.REGISTRAR_PRODUCCION,
      component: RegistrarActividad
   }, {
      name: subModName.REPORTE_MESA_DIGITAL,
      component: RptMesaDigitalSubMod
   }, {
      name: subModName.REPORTE_OPERATIVOS,
      component: DashboardOperativoSubMod
   }, {
      name: subModName.REPORTE_PRODUCCION,
      component: ProduccionRptSubMod
   }, {
      name: subModName.REPORTE_NACIONALIZACION,
      component: NacionalizacionRptSubMod
   }
]

const item = [
   {
      name: itemName.PENDIENTES,
      component: PendientesRptItem
   },
]

export const components = [...modulo, ...subModulo, ...item].reduce((map, {name, component}) => (map[name] = component, map), {})