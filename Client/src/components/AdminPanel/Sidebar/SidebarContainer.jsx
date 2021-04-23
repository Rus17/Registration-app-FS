import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from "./Sidebar"
import { logoutAC } from "../../../store/actionCreators/authActionCreator"
import { clearUserPageAC } from "../../../store/actionCreators/usersActionCreator"

const SidebarContainer = () => {

  const name = useSelector(state => state.authPage.auth.name)
  const role = useSelector(state => state.authPage.auth.role)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutAC())
    dispatch(clearUserPageAC())
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"

    //Удаление всех кук
    // var cookies = document.cookie.split(";");
    // for (var i = 0; i < cookies.length; i++) {
    //   var cookie = cookies[i];
    //   var eqPos = cookie.indexOf("=");
    //   var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    //   document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // }

  }

  return (<>
    <Sidebar name={name} role={role} logoutHandler={logoutHandler} />
  </>)
}

export default SidebarContainer