import React, { useEffect, useState } from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom"
import { getUsers_SC, updateUser_SC, delUser_SC, setComponentModeAC } from "../../../store/actionCreators/usersActionCreator"
import UserAddFormContainer from '../UserAddForm/UserAddFormContainer'

const UsersPageContainer = () => {

  const auth = useSelector(state => state.authPage.auth)
  const userList = useSelector(state => state.usersPage.userList)
  const componentMode = useSelector(state => state.usersPage.componentMode)
  const dispatch = useDispatch()
  const [editableUser, setEditableUser] = useState({})


  const setEditUserHandler = (user) => {
    setEditableUser(user)
    dispatch(setComponentModeAC("editUser"))
  }

  const statusUserHandler = (id, newStatus) => {
    dispatch(updateUser_SC({ id, newStatus }))
  }

  const delUserHandler = (id) => { dispatch(delUser_SC(id)) }

  const componentModeHandler = (payload) => {
    dispatch(setComponentModeAC(payload))
  }

  useEffect(() => {
    if (!userList.length && auth.role === "super_admin") {
      dispatch(getUsers_SC())
    }
  }, [])

  return (<>

    <SidebarContainer />

    {(componentMode === 'showUsers' && auth.role === "super_admin")
      && <UsersPage
        userList={userList}
        statusUserHandler={statusUserHandler}
        delUserHandler={delUserHandler}
        setEditUserHandler={setEditUserHandler}
        componentModeHandler={componentModeHandler} />
    }
    {(!auth.name || auth.role !== "super_admin") && <Redirect to={"/admin"} />}

    {componentMode === 'editUser' ? <UserAddFormContainer
      editableUser={editableUser}
      componentModeHandler={componentModeHandler}
      mod="edit" /> : null
    }

    {componentMode === 'addUser' ? <UserAddFormContainer componentModeHandler={componentModeHandler} mod="add" /> : null}

  </>)
}

export default UsersPageContainer