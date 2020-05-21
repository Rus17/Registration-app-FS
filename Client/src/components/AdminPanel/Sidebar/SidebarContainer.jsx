import React from "react"
import { useSelector } from 'react-redux'
import Sidebar from "./Sidebar"

const SidebarContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin);
  
  return (<>
    <Sidebar sAdmin={sAdmin}/>
  </>)
}

export default SidebarContainer