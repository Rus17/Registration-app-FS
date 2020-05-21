import React from "react"
import {Redirect} from 'react-router-dom'
import AdminLoginForm from "./AdminLoginForm"
import { useSelector } from 'react-redux'

const AdminLoginFormContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  const isAuth = useSelector(state => state.usersPage.isAuth);
  
  const onSubmit = (formData) => {
  // dispatch(authAC(formData))
  }
  
  //Отправляем запрос на сервер с логином и паролем, когда приходит "ОК", 
  //то пропсы меняются и происходит перенаправление на AdminPanelContainer
    
  return (<>
    {sAdmin && <Redirect to={"/admin/users"} />}
    {isAuth && <Redirect to={"/admin/participants"} />}
    <AdminLoginForm onSubmit={onSubmit} />
  </>)
  
}

export default AdminLoginFormContainer