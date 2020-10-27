import React from "react"
import { NavLink } from "react-router-dom"
import "./sidebar.css"

const Sidebar = ({ name, role, logoutHandler }) => {
  return (<div className="sidebar">

    <div className="itemSideBar welcome">
      Welcome {name}! <br /> Have a nice day!
    </div>

    <NavLink to="/admin/participants" className="itemSideBar">Participants</NavLink>

    {role === 'super_admin'
      ? <NavLink to="/admin/users" className="itemSideBar">Users</NavLink>
      : <div className="itemSideBar inactiveLink">Users</div>}

    <div className="itemSideBar link" onClick={logoutHandler} >Logout</div>

  </div>)
}

export default Sidebar