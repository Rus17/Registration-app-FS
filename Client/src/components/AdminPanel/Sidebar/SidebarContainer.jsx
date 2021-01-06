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

    // document.cookie = "lang=JavaScript; max-age=0"
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
  }


  return (<>
    <Sidebar name={name} role={role} logoutHandler={logoutHandler} />
  </>)
}

export default SidebarContainer