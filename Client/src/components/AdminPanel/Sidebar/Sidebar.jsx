import React from "react"
import { NavLink } from "react-router-dom"
import s from "./Sidebar.module.scss"

const Sidebar = ({ name, role, logoutHandler }) => {
  return (
    <div className={s.sidebar}>

      <div className={`${s.itemSideBar} ${s.welcome}`}>
        Welcome {name}! <br /> Have a nice day!
    </div>

      <NavLink to="/admin/participants" className={s.itemSideBar}>Participants</NavLink>

      {
        role === 'super_admin'
          ? <NavLink to="/admin/users" className={s.itemSideBar}>Users</NavLink>
          : <div className={`${s.itemSideBar} ${s.inactiveLink}`}> Users</div >
      }

      <div className={`${s.itemSideBar} ${s.link}`} onClick={logoutHandler} >Logout</div>

    </div >
  )
}

export default Sidebar