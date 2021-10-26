import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { 
   FilterList, 
   Restore,
   SkipNext,
   SkipPrevious,
   Home,
   RotateLeft
} from '@material-ui/icons'
import {
   FormControl,
   FormHelperText,
   ButtonGroup,
   Button,
   Select,
   MenuItem,
   Typography, 
   Divider,
   RadioGroup,
   FormControlLabel,
   Radio
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import SpeedDials from 'components/SpeedDial'
import Dashboard, { DashboardContent, DashboardFilter } from 'components/DashboardCharts'
import ChartByOpe from 'components/ChartsOperativo/ChartByQuantity'
import ChartByNacionalidad from 'components/ChartsOperativo/ChartByNacionalidad'
import ChartBySexo from 'components/ChartsOperativo/ChartBySexo'
import ChartByOpeAnual from 'components/ChartsOperativo/ChartByOpeAnual'
import ChartByIntervenidos from 'components/ChartsOperativo/ChartByIntervenidos'
import ChartByDisposicionPNP from 'components/ChartsOperativo/ChartByDisposicionPNP'
import ChartByRefugiados from 'components/ChartsOperativo/ChartByRefugiados'
import ChartByTipoInfraccion from 'components/ChartsOperativo/ChartByTipoInfraccion'
import ChartByTipoOpe from 'components/ChartsOperativo/ChartByTipoOpe'

import useOperativo from 'hooks/useOperativo'
import useDistrito from 'hooks/useDistrito'
import ChartByModalidad from 'components/ChartsOperativo/ChartByModalidad'
import ChartByJefaturaZonal from 'components/ChartsOperativo/ChartByJefaturaZonal'

const optAñoOpe = [
   { key: ' ', label: '-Todos-' },
   { key: 2019, label: 2019 },
   { key: 2020, label: 2020 },
   { key: 2021, label: 2021 },
]

const optSexo = [
   { key: ' ', label: '-Ambos-' },
   { key: 'MASCULINO', label: 'Masculino' },
   { key: 'FEMENINO', label: 'Femenino' }
]

const useStyle = makeStyles({
   formControl:{
      marginTop: 5,
      marginBottom: 10
   },
   select:{
      fontSize: 8,
      color: '#999'
   },
   menuItem: {
      fontWeight: 1000,
      fontSize: 8
   },
   iconButton:{
      width: 50,
      height: 50,
      display: 'inline-block'
   },
   buttonGroup:{
      marginTop: 5,
      marginBottom: 15,
      alignSelf: 'center'
   },
})

const CommonBodyOfDashboard = styled.body`
   height: 100%;
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   grid-template-rows: repeat(3, 1fr);
   grid-gap: 1rem;
`

const DashboardLimaFirstStage = styled(CommonBodyOfDashboard)`
   grid-template-columns: repeat(4, 1fr);
`

const DashboardLimaSecondStage = styled(CommonBodyOfDashboard)`
   grid-template-columns: repeat(2, 1fr);
   grid-template-rows: repeat(2, 1fr);
`

const DashboardJZFirstStage = styled(CommonBodyOfDashboard)`
   grid-template-columns: repeat(4, 1fr);
   grid-template-rows: repeat(2, 1fr);
`

const CommonSide = styled.body`
   grid-row: 1 / -1;
   height: 94%;
`

const SideIntervenidosJZ = styled(CommonSide)`
   grid-column: 3 / 4;
   grid-row: 1 / -1;
`

const SideDisposicionPNPJZ = styled(CommonSide)`
   grid-column: 4 / -1;
   grid-row: 1 / -1;
`


const SideIntervenidosByNacionalidad = styled(CommonSide)`
   grid-column: 3 / 4;
`

const SideIrregularByNacionalidad = styled(CommonSide)`
   grid-column: 4 / -1;
`

const DASHBOARD_LIMA_FIRST_STAGE = 'DASHBOARD LIMA FIRST STAGE'
const DASHBOARD_LIMA_SECOND_STAGE = 'DASHBOARD LIMA SECOND STAGE'
const DASHBOARD_JZ_FIRST_STAGE = 'DASHBOARD JZ FIRST STAGE'

const LIMA = 'Lima'
const JEFATURA_ZONAL = 'JZ'

const initialValues = {
   añoOpe: ' ',
   sexo: ' ',
   dependencia: ''
}

/*» Method's  */
const convertOpeJZByYears = (opeJZDb) => {
   return (
      Object.values(
         opeJZDb.reduce((map, {añoOpe, totalOperativos}) => {
            const totalOpe = map[añoOpe] ? map[añoOpe].totalOpe + totalOperativos : totalOperativos
            map[añoOpe] = { añoOpe, totalOpe }
            return map
         }, {})
      )
   )
}

const convertOpeJZByIntervenidos = (opeJZDb) => {
   return (
      Object.values(
         opeJZDb.reduce((map, {añoOpe, totalIntervenidos: intervenidos}) => {
            const totalIntervenidos = map[añoOpe] ? map[añoOpe].totalIntervenidos + intervenidos : intervenidos
            map[añoOpe] = { añoOpe, totalIntervenidos }
            return map
         }, {})
      )
   )
}

const convertOpeJZByDisposicionPNP = (opeJZDb) => {
   return (
      Object.values(
         opeJZDb.reduce((map, {añoOpe, totalDisposicionPNP}) => {
            const totalIrregular = map[añoOpe] ? map[añoOpe].totalIrregular + totalDisposicionPNP : totalDisposicionPNP
            map[añoOpe] = { añoOpe, totalIrregular }
            return map
         }, {})
      )
   )
}

const convertOpeJZByJZAndIntervenidos = (opeJZDb, año) => {
   return (
      Object.values(
         opeJZDb
            .filter(({añoOpe}) => año.toString().trim() ? añoOpe === año : true)
            .reduce((map, {jefaturaZonal, totalIntervenidos}) => {
               const total = map[jefaturaZonal] ? map[jefaturaZonal].total + totalIntervenidos : totalIntervenidos
               map[jefaturaZonal] = { jefaturaZonal, total }
               return map
            }, {})
      )
   )
}

const convertOpeJZByJZAndIrregular = (opeJZDb, año) => {
   return (
      Object.values(
         opeJZDb
            .filter(({añoOpe}) => año.toString().trim() ? añoOpe === año : true)
            .reduce((map, {jefaturaZonal, totalDisposicionPNP}) => {
               const total = map[jefaturaZonal] ? map[jefaturaZonal].total + totalDisposicionPNP : totalDisposicionPNP
               map[jefaturaZonal] = { jefaturaZonal, total }
               return map
            }, {})
      )
   )
}

export default function OperativoChartRpt({handleCurrentNav}){

   /*» HOOK'S */
   const [inputsFilter, setInputsFilter] = useState(initialValues)
   const [currentDashboard, setCurrentDashboard] = useState(DASHBOARD_LIMA_FIRST_STAGE)
   const [checkFilterDep, setCheckFilterDep] = useState(LIMA)

   /*» CUSTOM HOOKS'S  */
   const classes = useStyle()
   const {
      opePivotedDb,
      opePivotedByNacionalidadDb,
      opePivotedBySexoDb,
      opePivotedByModalidadDb,
      opeAnualPivotedDb,
      operativoJZDb,
      intervenidosPivotedDb,
      tipoInfraccionPivotedDb,
      tipoOpePivotedDb,
      handleFindAllOpeAnualPivoted,
      handleFindAllOpePivoted,
      handleFindAllOpeJZ,
      handleFindOpePivotedByNacionalidad,
      handleFindOpePivotedBySexo,
      handleFindOpePivotedByModalidad,
      handleFindAllIntervenidosPivoted,
      handleFindTipoInfraccionPivoted,
      handleFindTipoOpePivoted
   } = useOperativo()

   const { distritoDb } = useDistrito()

   /*» EFFECT'S  */
   useEffect(() => { handleFindAllOpePivoted() }, [])
   useEffect(() => { handleFindAllOpeAnualPivoted() }, [])
   useEffect(() => { checkFilterDep === JEFATURA_ZONAL && handleFindAllOpeJZ() }, [checkFilterDep])
   useEffect(() => { handleFindOpePivotedBySexo(inputsFilter) }, [inputsFilter])
   useEffect(() => { handleFindOpePivotedByModalidad(inputsFilter) }, [inputsFilter])
   useEffect(() => { handleFindOpePivotedByNacionalidad(inputsFilter) }, [inputsFilter])
   useEffect(() => { handleFindAllIntervenidosPivoted(inputsFilter) }, [inputsFilter])
   useEffect(() => { handleFindTipoInfraccionPivoted(inputsFilter) }, [inputsFilter])
   useEffect(() => { handleFindTipoOpePivoted(inputsFilter) }, [inputsFilter])

   /*» HANDLER'S  */
   const handleChangeFilter = ({target: { name, value }}) => {
      setInputsFilter({ ...inputsFilter, [name]: value })
   }
   const handleUpdateNav = (nav) => { handleCurrentNav(nav) }
   const handleUpdateStage = (stage) => { setCurrentDashboard(stage) }
   const handleResetFilter = () => { setInputsFilter({...initialValues}) }
   const handleChangeDependencia = ({target: { value: currentSelectedDep }}) => { 
      setCheckFilterDep(currentSelectedDep)
      currentSelectedDep === LIMA && setCurrentDashboard(DASHBOARD_LIMA_FIRST_STAGE)
      currentSelectedDep === JEFATURA_ZONAL && setCurrentDashboard(DASHBOARD_JZ_FIRST_STAGE)
   }

   /*» DEPENDENCY'S  */
   const optSpeedDialAction = useMemo(() => ([
      {
         icon: <Restore />,
         tooltip: 'Actualizar',
         handleOnClick: () => {
            handleFindAllOpeAnualPivoted()
            handleFindAllOpePivoted()
            handleFindAllIntervenidosPivoted(inputsFilter)
            handleFindTipoInfraccionPivoted(inputsFilter)
            handleFindTipoOpePivoted(inputsFilter)
            handleFindOpePivotedBySexo(inputsFilter)
            handleFindOpePivotedByModalidad(inputsFilter)
            handleFindOpePivotedByNacionalidad(inputsFilter)
         }
      }
   ]), [inputsFilter])

   return (
      <>
         <Dashboard>

            {/*» FILTER  */}
            <DashboardFilter>
               <ButtonGroup color='primary' variant='contained' className={classes.buttonGroup}>
                  <Button
                     onClick={() => handleUpdateNav(null)}
                     className={classes.button}
                     startIcon={<Home fontSize='large' />}
                  />
                  <Button
                     onClick={() => handleResetFilter()}
                     className={classes.button}
                     endIcon={<RotateLeft fontSize='large' />}
                  />
               </ButtonGroup>

               {/*» OPCIONES: DEPENDENCIA  */}
               <FormControl className={classes.formControl}>
                  <RadioGroup value={checkFilterDep} onChange={handleChangeDependencia}>
                     <FormControlLabel 
                        value={LIMA}
                        label={<Typography variant='h5' >Lima</Typography>} 
                        control={<Radio color='primary' />} 
                     />
                     <FormControlLabel 
                        value={JEFATURA_ZONAL}
                        label={<Typography variant='h5' >Jefatura Zonal</Typography>} 
                        control={<Radio color='primary' />} 
                     />
                  </RadioGroup>
                  <FormHelperText>Selecciona una dependencia</FormHelperText>
               </FormControl>

               {
                  checkFilterDep === LIMA
                  && (
                     <ButtonGroup 
                        color='inherit' 
                        variant='contained'
                        className={classes.buttonGroup}
                     >
                        <Button
                           disabled={currentDashboard === DASHBOARD_LIMA_FIRST_STAGE ? true : false}
                           startIcon={<SkipPrevious fontSize='large' />}
                           onClick={() => handleUpdateStage(DASHBOARD_LIMA_FIRST_STAGE)} 
                        />
                        <Button 
                           disabled={currentDashboard === DASHBOARD_LIMA_SECOND_STAGE ? true : false}
                           endIcon={<SkipNext fontSize='large' />} 
                           onClick={() => handleUpdateStage(DASHBOARD_LIMA_SECOND_STAGE)} 
                        />
                     </ButtonGroup>
                  )
               }

               {/*» OPCIONES DE FILTRO  */}  
               <Button 
                  fullWidth 
                  size='small'
                  color='inherit'
                  className={classes.select}
                  startIcon={<FilterList />}
               >
                  <Typography variant="h4" color="textSecondary">Filtro</Typography>
               </Button>
               <Divider />

               <FormControl className={classes.formControl}>
                  <Select
                     color='primary'
                     name='añoOpe'
                     value={inputsFilter.añoOpe}
                     defaultValue={optAñoOpe[0].key}
                     className={classes.select}
                     onChange={handleChangeFilter}
                  >
                     {
                        optAñoOpe.map(({key, label}) => (
                           <MenuItem 
                              className={classes.menuItem} 
                              key={label}
                              value={key}
                           >
                              {label}
                           </MenuItem>
                        ))
                     }
                  </Select>
                  <FormHelperText>Año operativo</FormHelperText>
               </FormControl>

               {
                  checkFilterDep === LIMA
                  && (
                     <>
                        <FormControl className={classes.formControl}>
                           <Select
                              name='sexo'
                              color='primary'
                              value={inputsFilter.sexo}
                              defaultValue={optSexo[0].key}
                              className={classes.select}
                              onChange={handleChangeFilter}
                           >
                              {
                                 optSexo.map(({key, label}) => (
                                    <MenuItem className={classes.menuItem} key={label} value={key}>{label}</MenuItem>
                                 ))
                              }
                           </Select>
                           <FormHelperText>Sexo</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                           <Select
                              name='dependencia'
                              color='primary'
                              value={inputsFilter.dependencia}
                              className={classes.select}
                              onChange={handleChangeFilter}
                           >
                              {
                                 distritoDb.map(({idDependencia, nombre}) => (
                                    <MenuItem className={classes.menuItem} key={idDependencia} value={nombre}>{nombre}</MenuItem>
                                 ))
                              }
                           </Select>
                           <FormHelperText>¿Dónde se realizó el operativo?</FormHelperText>
                        </FormControl>
                     </>
                  )
               }
            </DashboardFilter>

            {/*» MAIN  */}
            <DashboardContent>
               {
                  currentDashboard === DASHBOARD_LIMA_FIRST_STAGE
                     && (
                        <DashboardLimaFirstStage>
                           <ChartByOpeAnual title='OPERATIVOS ANUALES' data={opeAnualPivotedDb} />
                           <ChartByOpe title='OPERATIVOS MENSUALES' data={opePivotedDb} />
                           <ChartByIntervenidos title='INTERVENIDOS' data={intervenidosPivotedDb} />
                           <ChartByDisposicionPNP title='PUESTOS A DISPOSICIÓN PNP' data={intervenidosPivotedDb} />
                           <ChartByRefugiados title='REFUGIADOS' data={intervenidosPivotedDb} />
                           <SideIntervenidosByNacionalidad>
                              <ChartByNacionalidad title='INTERVENIDOS POR NACIONALIDAD' data={opePivotedByNacionalidadDb} fieldName='totalIntervenidos' />
                           </SideIntervenidosByNacionalidad>
                           <SideIrregularByNacionalidad>
                              <ChartByNacionalidad title='DISPOSICIÓN PNP POR NACIONALIDAD' data={opePivotedByNacionalidadDb} fieldName='totalIrregular' />
                           </SideIrregularByNacionalidad>
                           <ChartBySexo title='INTERVENIDOS POR SEXO' data={opePivotedBySexoDb} />
                        </DashboardLimaFirstStage>
                     )
               }
               {
                  currentDashboard === DASHBOARD_LIMA_SECOND_STAGE
                  && (
                     <DashboardLimaSecondStage>
                        <ChartByTipoInfraccion title='POR INFRACCION MIGRATORIA' data={tipoInfraccionPivotedDb} />
                        <ChartByTipoOpe title='POR TIPO OPERATIVO' data={tipoOpePivotedDb} />
                        <ChartByModalidad title='POR MODALIDAD OPERATIVO' data={opePivotedByModalidadDb} />
                     </DashboardLimaSecondStage>
                  )
               }
               {
                  currentDashboard === DASHBOARD_JZ_FIRST_STAGE
                  && (
                     <DashboardJZFirstStage>
                        <ChartByOpeAnual title='OPERATIVOS ANUALES' data={convertOpeJZByYears(operativoJZDb)} />
                        <ChartByIntervenidos title='INTERVENIDOS' data={convertOpeJZByIntervenidos(operativoJZDb)} />
                        <SideIntervenidosJZ>
                           <ChartByJefaturaZonal 
                              title='INTERVENIDOS POR JEFATURA ZONAL' 
                              data={convertOpeJZByJZAndIntervenidos(operativoJZDb, inputsFilter.añoOpe)} 
                           />
                        </SideIntervenidosJZ>
                        <SideDisposicionPNPJZ>
                           <ChartByJefaturaZonal 
                              title='INTERVENIDOS DISPOSICIÓN PNP POR JEFATURA ZONAL' 
                              data={convertOpeJZByJZAndIrregular(operativoJZDb, inputsFilter.añoOpe)} 
                           />
                        </SideDisposicionPNPJZ>
                        <ChartByDisposicionPNP title='PUESTOS A DISPOSICIÓN PNP' data={convertOpeJZByDisposicionPNP(operativoJZDb)} />
                        <div>4</div>
                     </DashboardJZFirstStage>
                  )
               }
            </DashboardContent>

         </Dashboard>

         {/*» FLOAT...  */}
         <SpeedDials
            direction='right'
            optSpeedDialAction={optSpeedDialAction}
            position='absolute'
            opt={{
               bottom: 5,
               left: 5
            }}
         />
      </>
   )
}

OperativoChartRpt.propTypes = {
   handleCurrentNav: PropTypes.func.isRequired
}