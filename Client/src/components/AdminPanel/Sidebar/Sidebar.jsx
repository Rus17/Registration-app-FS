import React from "react"
import {NavLink} from "react-router-dom"
import "./sidebar.css"

const Sidebar = (props) => {
  return (<div className="sidebar">
      
    <NavLink to="/admin/participants" className="activeLink">Participants</NavLink>
    
    {props.sAdmin 
    ? <NavLink to="/admin/users" className="activeLink">Users</NavLink>
    : <div className="inactiveLink">Users</div>}
    
    <div className="activeLink">Logout</div>
    
  </div>)
}

export default Sidebar