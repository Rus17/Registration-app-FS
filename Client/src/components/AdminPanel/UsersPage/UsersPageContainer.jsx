import React, { useEffect, useState } from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom"
import { getUsers_SC, updateUser_SC, delUser_SC, setComponentModeAC } from "../../../store/actionCreators/usersActionCreator"
import { forbiddenAC } from '../../../store/actionCreators/authActionCreator'
import UserAddFormContainer from '../UserAddForm/UserAddFormContainer'

const UsersPageContainer = () => {

  const name = useSelector(state => state.authPage.auth.name)
  const role = useSelector(state => state.authPage.auth.role)
  const userList = useSelector(state => state.usersPage.userList)
  const componentMode = useSelector(state => state.usersPage.componentMode)
  const forbidden = useSelector(state => state.authPage.forbidden)
  const dispatch = useDispatch()
  const [editableUser, setEditableUser] = useState({})


  const setEditUserHandler = (user) => {
    if (role === 'admin') {
      dispatch(forbiddenAC(true))
    } else {
      setEditableUser(user)
      dispatch(setComponentModeAC("editUser"))
    }
  }

  const statusUserHandler = (id, newStatus) => {
    if (role === 'admin') {
      dispatch(forbiddenAC(true))
    } else {
      dispatch(updateUser_SC({ id, newStatus }))
    }
  }

  const delUserHandler = (id) => {
    if (role === 'admin') {
      dispatch(forbiddenAC(true))
    } else {
      dispatch(delUser_SC(id))
    }
  }

  const componentModeHandler = (payload) => {
    if (role === 'admin') {
      dispatch(forbiddenAC(true))
    } else {
      dispatch(setComponentModeAC(payload))
    }
  }

  useEffect(() => {
    if (!userList.length) { dispatch(getUsers_SC()) }
  }, [])

  if (!name) { return <Redirect to={"/admin"} /> }

  return (<>

    <SidebarContainer />
    {componentMode === 'showUsers'
      ? <UsersPage
        userList={userList}
        statusUserHandler={statusUserHandler}
        delUserHandler={delUserHandler}
        setEditUserHandler={setEditUserHandler}
        componentModeHandler={componentModeHandler}
        forbidden={forbidden} />
      : null
    }

    {componentMode === 'editUser' ? <UserAddFormContainer
      editableUser={editableUser}
      componentModeHandler={componentModeHandler}
      mod="edit" /> : null
    }

    {componentMode === 'addUser' ? <UserAddFormContainer componentModeHandler={componentModeHandler} mod="add" /> : null}

  </>)
}

export default UsersPageContainer