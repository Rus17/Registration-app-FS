import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserEditForm from "./UserEditForm"
import { modifyUserSC } from "../../../store/actionCreators/usersActionCreator"
import SidebarContainer from "../Sidebar/SidebarContainer"

const UserEditFormContainer = ({ editableUser }) => {
  const dispatch = useDispatch()
  const preloader = useSelector(state => state.usersPage.preloader)
  const userError = useSelector(state => state.usersPage.userError)
  // const redirect = useSelector(state => state.usersPage.redirect)

  // useEffect(() => { dispatch(userErrorAC({})) }, [])

  const onSubmit = (modifiedUser) => {
    dispatch(modifyUserSC(modifiedUser))
  }


  return <UserEditForm onSubmit={onSubmit} initialValues={editableUser} preloader={preloader} userError={userError} />

}

export default UserEditFormContainer