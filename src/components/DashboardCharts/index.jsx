import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'

const Dashboard = styled.div`
   margin-top: .25rem;
   width: calc(100% - 1rem);
   height: calc(100vh - 6rem);
   display: flex;
`

export const DashboardContent = styled.div`
   width: 90%;
   padding: .5rem;
`

export const DashboardFilter = styled.div`
   display: flex;
   flex-direction: column;
   padding:.5rem;
   width: 10%;
   border-right: 1px solid #D5D5D5;
`

export default function DashboardCharts({ children }) {
   return (
      <Fade>
         <Dashboard>
            {children}
         </Dashboard>
      </Fade>
   )
}

DashboardCharts.propTypes = {
   children: PropTypes.any.isRequired
}