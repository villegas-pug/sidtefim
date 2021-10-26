import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { Icons } from 'helpers/icons'
import PropTypes from 'prop-types'
import {
   Typography
} from '@material-ui/core'

function Table(props) {

   const {
      isLoading,
      dataTable: { columns, data },
      configTable: { actions, components },
      options,/*-> Default props...*/
      ...rest
   } = props

   /*» HOOK'S  */
   const [state, setState] = useState({ columns })

   /*» EFFECT'S  */
   useEffect(() => { setState((prevState) => ({ ...prevState, data })) }, [data])

   return (
      <>
         <MaterialTable
            isLoading={isLoading}
            icons={Icons}
            options={{ 
               ...options, 
               ...rest, 
               headerStyle: { textAlign: 'left', fontWeight: 700 },
               rowStyle: { fontSize: 10, textTransform: 'uppercase' },
            }}
            localization={{ 
               header: { actions: 'Acciones' }, 
               pagination: { labelDisplayedRows: '{from}-{to} de {count}' },
               body:{
                  emptyDataSourceMessage:(
                     <Typography variant='h4' color='textSecondary'>««« No existen datos para mostrar »»»</Typography>
                  )
               }
            }}
            columns={state.columns}
            data={state.data}
            actions={actions}
            components={{ Action: components }}
         />
      </>
   )
}

Table.defaultProps = {
   dataTable: [],
   configTable: {},
   options: {
      pageSizeOptions: false,
      /* paginationType: 'stepped', */
      /* showEmptyDataSourceMessage: false, */
      sorting: true,
      minBodyHeight: 100,
      pageSize: 4,
      toolbar: false,
      search: false,
      showTitle: false,
      searchFieldAlignment: 'left',
      loadingType: 'linear'
   }
}

Table.propTypes = {
   isLoading: PropTypes.bool.isRequired,
   dataTable: PropTypes.object.isRequired,
   configTable: PropTypes.object.isRequired,
   options: PropTypes.object.isRequired
}

export default React.memo(Table, (prevProps, nextProps) => {
   return prevProps.isLoading === nextProps.isLoading
}) 