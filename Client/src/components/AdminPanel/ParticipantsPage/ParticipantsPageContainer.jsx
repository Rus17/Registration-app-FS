import React from "react"
import {Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'
import ParticipantsPage from "./ParticipantsPage"
import SidebarContainer from "../Sidebar/SidebarContainer"

const ParticipantsPageContainer = (props) => {
  
  const isAuth = useSelector(state => state.usersPage.isAuth)
  
  return (<>
    
    <SidebarContainer />
    
    {
      isAuth 
      ? <ParticipantsPage />
      : <Redirect to={"/admin"} />
    }    
    
  </>)
}

export default ParticipantsPageContainer