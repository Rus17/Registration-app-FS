import React from "react"
import { Redirect } from 'react-router-dom'
import AdminLoginForm from "./AdminLoginForm"
import { useSelector, useDispatch } from 'react-redux'
import { authorization_SAGA } from "../../../store/actionCreators/authActionCreator"


const AdminLoginFormContainer = () => {

  const name = useSelector(state => state.authPage.auth.name)
  const role = useSelector(state => state.authPage.auth.role)
  const authError = useSelector(state => state.authPage.authError)
  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    dispatch(authorization_SAGA(formData))
  }

  return (<>
    {(name && role === 'super_admin') && <Redirect to={"/admin/users"} />}
    {(name && role === 'admin') && <Redirect to={"/admin/participants"} />}
    <AdminLoginForm onSubmit={onSubmit} authError={authError} />
  </>)

}

export default AdminLoginFormContainer