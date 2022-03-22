import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import httpStatusReducer from './reducers/httpStatusReducer'
import procNacReducer from 'redux/reducers/procNacReducer'
import tipoDocumentoReducer from 'redux/reducers/tipoDocumentoReducer'
import paisReducer from 'redux/reducers/paisReducer'
import tipoSolicitudReducer from 'redux/reducers/tipoSolicitudReducer'
import tipoTramiteReducer from 'redux/reducers/tipoTramiteReducer'
import usuarioReducer from 'redux/reducers/usuarioReducer'
import formsReducer from 'redux/reducers/formsReducer'
import lineamientoReducer from 'redux/reducers/lineamientoReducer'
import interpolReducer from 'redux/reducers/interpolReducer'
import tipoOperativoReducer from 'redux/reducers/tipoOperativoReducer'
import empresaReducer from 'redux/reducers/empresaReducer'
import operativoReducer from 'redux/reducers/operativoReducer'
import distritoReducer from 'redux/reducers/distritoReducer'
import tipoInfraccionReducer from 'redux/reducers/tipoInfraccionReducer'
import produccionReducer from 'redux/reducers/produccionReducer'
import nacionalizacionReducer from 'redux/reducers/nacionalizacionReducer'
import expedienteMininterReducer from './reducers/expedienteMininterReducer'
import preInscripcionReducer from 'redux/reducers/preInscripcionReducer'
import refugiadoReducer from 'redux/reducers/refugiadoReducer'
import ceremoniaReducer from 'redux/reducers/ceremoniaReducer'
import nuevoTramiteNacReducer from 'redux/reducers/nuevoTramiteNacReducer'
import fiscalizacionPosteriorReducer from 'redux/reducers/fiscalizacionPosteriorReducer'

/*» Manage status of the step's sub-module's...  */
import stagesReducer from 'redux/reducers/stagesReducer'

const reducers = combineReducers({
   httpStatus: httpStatusReducer,
   procNacionalizacion: procNacReducer,
   tipoDocumento: tipoDocumentoReducer,
   pais: paisReducer,
   tipoSolicitud: tipoSolicitudReducer,
   tipoTramite: tipoTramiteReducer,
   usuario: usuarioReducer,
   forms: formsReducer,
   lineamiento: lineamientoReducer,
   interpol: interpolReducer,
   tipoOperativo: tipoOperativoReducer,
   empresa: empresaReducer,
   operativo: operativoReducer,
   distrito: distritoReducer,
   tipoInfraccion: tipoInfraccionReducer,
   produccion: produccionReducer,
   nacionalizacion: nacionalizacionReducer,
   expedienteMininter: expedienteMininterReducer,
   preInscripcion: preInscripcionReducer,
   refugiado: refugiadoReducer,
   ceremonia: ceremoniaReducer,
   nuevoTramiteNac: nuevoTramiteNacReducer,
   fiscalizacionPosterior: fiscalizacionPosteriorReducer,
   stages: stagesReducer,
})

export default createStore(
   reducers,
   compose(
      applyMiddleware(thunk),
      devToolsEnhancer()
   )
)