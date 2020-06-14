import React from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector } from 'react-redux'
import {Redirect} from "react-router-dom"

const UsersPageContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  const userList = useSelector(state => state.usersPage.userList)
  
  return (<>
    
    <SidebarContainer />
    
    {
      sAdmin 
      ? <UsersPage userList={userList} />
      : <Redirect to={"/admin"} />
    }
    
  </>)
}

export default UsersPageContainer