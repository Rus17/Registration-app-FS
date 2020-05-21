import React from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector } from 'react-redux'

const UsersPageContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  
  return (<>
    
    <SidebarContainer />
    
    {
      sAdmin 
      ? <UsersPage />
      : <div>Sorry, you do not have access to this page.</div>
    }    
    
  </>)
}

export default UsersPageContainer