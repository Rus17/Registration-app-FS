import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from "./Sidebar"
import { logoutAC } from "../../../store/actionCreators/authActionCreator"
import { clearUserPageAC } from "../../../store/actionCreators/usersActionCreator"

const SidebarContainer = (props) => {

  const name = useSelector(state => state.authPage.auth.name)
  const role = useSelector(state => state.authPage.auth.role)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutAC())
    dispatch(clearUserPageAC())
  }


  return (<>
    <Sidebar name={name} role={role} logoutHandler={logoutHandler} />
  </>)
}

export default SidebarContainer