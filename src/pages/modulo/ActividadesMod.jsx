import React, { useEffect } from 'react'
import DayCard from 'components/DayCard'
import Menu from 'components/Menu'
import useProduccion from 'hooks/useProduccion'
import ModalLoader from 'components/Styled/ModalLoader'

export default function ActividadesMod(){

   /*» CUSTOM HOOK'S... */
   const {
      produccionCurrentWeekDbLoading,
      productionAdvanceByDay,
      handleCountActividadCurrentWeek,
      handleListActividad
   } = useProduccion()

   /*» EFFECT'S  */
   useEffect(() => { handleCountActividadCurrentWeek() }, [])
   useEffect(() => { handleListActividad() }, [])

   /*» RENDERING CONDITIONAL:  */
   if(produccionCurrentWeekDbLoading) return <ModalLoader />

   return (
      <>
         <Menu>
            {
               productionAdvanceByDay.map(({dayOfWeek, date, enableToday, progress}) => (
                  <DayCard
                     key={dayOfWeek}
                     dayOfWeek={dayOfWeek}
                     date={date}
                     enableToday={enableToday}
                     progress={progress}
                  />
               ))
            }
         </Menu>
      </>
   )
}