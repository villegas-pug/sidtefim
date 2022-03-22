import React from 'react'
import MaterialTable from 'material-table'
import { Icons } from 'helpers/icons'
import PropTypes from 'prop-types'
import {
   Typography
} from '@material-ui/core'

export default function Table(props) {

   const {
      isLoading,
      dataTable: { columns, data },
      configTable: { actions, components },
      options,/*-> Default props...*/
      ...rest
   } = props

   return (
      <>
         <MaterialTable
            isLoading={isLoading}
            columns={columns}
            data={data}
            actions={actions}
            components={{ Action: components }}
            icons={Icons}
            options={{ 
               ...options, 
               ...rest, 
               headerStyle: { textAlign: 'left', fontWeight: 700 },
               rowStyle: { fontSize: 10, textTransform: 'uppercase' },
            }}
            localization={{ 
               header: { actions: '«»' }, 
               pagination: { 
                  labelDisplayedRows: '{from}-{to} de {count}',
                  firstTooltip: '',
                  nextTooltip: '',
                  previousTooltip: '',
                  lastTooltip: ''
               },
               body:{
                  emptyDataSourceMessage:(
                     <Typography variant='h3' color='textSecondary'>«« »»</Typography>
                  )
               }
            }}
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

/* export default React.memo(Table, (prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading)  */