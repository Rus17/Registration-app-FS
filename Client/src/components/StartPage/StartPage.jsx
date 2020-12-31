import React from 'react'
import { NavLink } from "react-router-dom"
import s from './StartPage.module.scss'

const StartPage = ({ city, theme }) => {
  return (
    <div className={s.startPage}>
      <NavLink to={`/admin`} className={s.admin}>
        Administrator
      </NavLink>

      <div className={s.content}>
        <div className={s.title}>
          A conference dedicated to {theme} is being held in the city of {city}. <br />
        People from all over the world can register for this conference.
      </div>
        <NavLink to={`/registration`} className={s.link}>
          <div className={s.text}>
            Register now
        </div>
        </NavLink>
      </div>
    </div>
  )
}

export default StartPage