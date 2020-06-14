import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from "./Sidebar"
import {logoutAC} from "../../../store/usersReducer"

const SidebarContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  const admin = useSelector(state => state.usersPage.isAuth)
  const dispatch = useDispatch()
  
  const logoutHandler = () => {
    dispatch(logoutAC())
  }
  
  
  return (<>
    <Sidebar sAdmin={sAdmin} admin={admin} logoutHandler={logoutHandler}/>
  </>)
}

export default SidebarContainer