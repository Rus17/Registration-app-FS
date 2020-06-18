import React from "react"
import {Redirect} from 'react-router-dom'
import AdminLoginForm from "./AdminLoginForm"
import { useSelector, useDispatch } from 'react-redux'
import {authorization_SAGA} from "../../../store/actionCreators/actionCreatorsUsers"


const AdminLoginFormContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  const isAuth = useSelector(state => state.usersPage.isAuth)
  const authError = useSelector(state => state.usersPage.authError)
  const dispatch = useDispatch()
  
  const onSubmit = (formData) => {
    dispatch(authorization_SAGA(formData))
  }
  
  //Отправляем запрос на сервер с логином и паролем, когда приходит "ОК", 
  //то пропсы меняются и происходит перенаправление на AdminPanelContainer
    
  return (<>
    {sAdmin && <Redirect to={"/admin/users"} />}
    {isAuth && <Redirect to={"/admin/participants"} />}
    <AdminLoginForm onSubmit={onSubmit} authError={authError}/>
  </>)
  
}

export default AdminLoginFormContainer