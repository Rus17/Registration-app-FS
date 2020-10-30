import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import UserAddForm from "./UserAddForm"
import { addUser_SC, userErrorAC } from "../../../store/actionCreators/usersActionCreator"
import { modifyUserSC } from "../../../store/actionCreators/usersActionCreator"
// import SidebarContainer from "../Sidebar/SidebarContainer"

const UserAddFormContainer = ({ setComponentMode, mod, editableUser }) => {
  const dispatch = useDispatch()
  const preloader = useSelector(state => state.usersPage.preloader)
  const userError = useSelector(state => state.usersPage.userError)
  // const redirect = useSelector(state => state.usersPage.redirect)
  const roleField = useSelector(state => state.form)
  const currentUser = useSelector(state => state.authPage.auth.email)

  let msg = 0
  if (roleField.addUser
    && roleField.addUser.values
    && roleField.addUser.values.Role
    && roleField.addUser.values.Role === "super_admin"
    && currentUser !== editableUser.Email) {
    msg = 1
  }
  useEffect(() => { dispatch(userErrorAC({})) }, [])

  const onSubmit = (user) => {
    if (mod === 'add') dispatch(addUser_SC(user))
    if (mod === 'edit') {
      user.auth = currentUser
      dispatch(modifyUserSC(user))
    }
    setComponentMode("showUsers")
  }

  // if (redirect && Object.keys(userError).length === 0) {
  //   return <Redirect to={"/admin/users"} />
  // }
  return <UserAddForm onSubmit={onSubmit} preloader={preloader} userError={userError} msg={msg} mod={mod} initialValues={editableUser} />

}

export default UserAddFormContainer