# COMPONENT  ◄► TABLE
---

```javascript

   /*»  Llamada al componente...*/
   <Table dataTable={dataTable} configTable={configTable} />

   /*» Argumentos del componente... */
   /*-----------------------------------------------------------------------------------------------------*/

   /*» ARGUMENT ◄► `dataTable`  */
   const dataTable = () => ({
      columns: [
         { title: 'Nro', field: 'idProcNac', type: 'number', width: 10 },
         { title: 'Registro', field: 'fechaRegistro', type: 'date', width: 15 },
         { title: 'Operador', field: 'operador', width: 350, render: ({ operador: { nombre } }) => nombre },
      ],
      data: []
   })

   /*» ARGUMENT ◄► `dataTable`  */
   const configTable = () => ({
         actions: [{ icon: 'Editar' }, { icon: 'Exportar Excel' }],
         components: ({ action: { icon }, data }) => {
            if (icon === 'Editar')
               return (
                  <Tooltip
                     title='Editar'
                     arrow
                  >
                     <IconButton
                        onClick={() => { Aquí el cuerpo del callback... }}
                     >
                        <Edit />
                     </IconButton>
                  </Tooltip>)
            else if (icon === 'Exportar Excel') {
               return()
            }
         }
      })
```