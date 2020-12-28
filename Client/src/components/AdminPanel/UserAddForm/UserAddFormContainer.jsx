import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import UserAddForm from "./UserAddForm"
import { addUser_SC } from "../../../store/actionCreators/usersActionCreator"
import { modifyUserSC } from "../../../store/actionCreators/usersActionCreator"

const UserAddFormContainer = ({ componentModeHandler, mod, editableUser }) => {
  const dispatch = useDispatch()
  const preloader = useSelector(state => state.usersPage.preloader)
  const userError = useSelector(state => state.usersPage.userError)
  const roleField = useSelector(state => state.form)
  const currentUser = useSelector(state => state.authPage.auth.email)

  //If this is an attempt to make a superadmin, then display a warning that the current account will be deleted
  let msg = 0
  if (roleField.addUser
    && roleField.addUser.values
    && roleField.addUser.values.Role
    && roleField.addUser.values.Role === "super_admin") {
    msg = 1
    if (editableUser && currentUser === editableUser.Email) {
      msg = 0
    }
  }

  const onSubmit = (user) => {
    if (mod === 'add') dispatch(addUser_SC(user))
    if (mod === 'edit') {
      user.auth = currentUser
      dispatch(modifyUserSC(user))
    }
  }

  return <UserAddForm
    onSubmit={onSubmit}
    preloader={preloader}
    userError={userError}
    msg={msg}
    mod={mod}
    initialValues={editableUser}
    componentModeHandler={componentModeHandler}
  />

}

export default UserAddFormContainer