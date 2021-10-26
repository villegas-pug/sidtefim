# COMPONENT  ◄► SPEED-DIAL
---

```javascript

   /*»  CALL : COMPONENT ...*/
   <SpeedDial direction='right' optSpeedDialAction={optSpeedDialAction} />

   /*» Argumentos del componente... */
   /*-----------------------------------------------------------------------------------------------------*/

   /*» ARGUMENT : `optSpeedDialAction`  */
     const optSpeedDialAction = [
      {
         icon: <Save />,
         tooltip: 'Registrar',
         handleOnClick: () => { rRegistrar.current.click() }
      }, {
         tooltip: 'Limpiar',
         icon: <DeleteForever />,
         handleOnClick: () => { rLimpiar.current.click() }
      },
   ]

```