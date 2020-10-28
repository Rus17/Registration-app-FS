import React, { useEffect, useState } from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom"
import { getUsers_SC, updateUser_SC, delUser_SC, redirectAC } from "../../../store/actionCreators/usersActionCreator"
import UserEditFormContainer from "../UserEditForm/UserEditFormContainer"

const UsersPageContainer = () => {

  const auth = useSelector(state => state.authPage.auth)
  const userList = useSelector(state => state.usersPage.userList)
  const dispatch = useDispatch()

  dispatch(redirectAC(false))

  const [editMode, setEditMode] = useState(0)
  const [editableUser, setEditableUser] = useState({})

  // console.log("editableUser", editableUser)

  const editHandler = (user) => {
    setEditableUser(user)
    setEditMode(1)
  }

  const userStatus = (id, newStatus) => {
    dispatch(updateUser_SC({ id, newStatus }))
  }

  const delUser = (id) => { dispatch(delUser_SC(id)) }

  useEffect(() => {
    if (!userList.length && auth.role === "super_admin") {
      dispatch(getUsers_SC())
    }
  }, [])

  console.log("editMode", editMode)

  return (<>

    <SidebarContainer />

    {(!editMode && auth.role === "super_admin")
      && <UsersPage userList={userList} userStatus={userStatus} delUser={delUser} editHandler={editHandler} />
    }

    {(!editMode && auth.role !== "super_admin") && <Redirect to={"/admin"} />}

    {(editMode) && <UserEditFormContainer editableUser={editableUser} />}
  </>)
}

export default UsersPageContainer