import React from "react"
import {Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'
import ParticipantsPage from "./ParticipantsPage"
import SidebarContainer from "../Sidebar/SidebarContainer"

const ParticipantsPageContainer = () => {
  
  const isAuth = useSelector(state => state.usersPage.isAuth)
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  
  return (<>
    
    <SidebarContainer />
    
    {
      isAuth || sAdmin
      ? <ParticipantsPage />
      : <Redirect to={"/admin"} />
    }    
    
  </>)
}

export default ParticipantsPageContainer