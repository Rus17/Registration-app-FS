import React, { useEffect, useState } from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom"
import { getUsers_SC, updateUser_SC, delUser_SC } from "../../../store/actionCreators/usersActionCreator"
import UserAddFormContainer from '../UserAddForm/UserAddFormContainer'

const UsersPageContainer = () => {

  const auth = useSelector(state => state.authPage.auth)
  const userList = useSelector(state => state.usersPage.userList)
  const dispatch = useDispatch()
  const [componentMode, setComponentMode] = useState('showUsers')      // showUsers|addUser|editUser
  const [editableUser, setEditableUser] = useState({})

  const setEditUserHandler = (user) => {
    setEditableUser(user)
    setComponentMode("editUser")
  }

  const statusUserHandler = (id, newStatus) => {
    dispatch(updateUser_SC({ id, newStatus }))
  }

  const delUserHandler = (id) => { dispatch(delUser_SC(id)) }

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
        setComponentMode={setComponentMode} />
    }
    {(!auth.name || auth.role !== "super_admin") && <Redirect to={"/admin"} />}

    {componentMode === 'editUser' ? <UserAddFormContainer editableUser={editableUser} setComponentMode={setComponentMode} mod="edit" /> : null}

    {componentMode === 'addUser' ? <UserAddFormContainer setComponentMode={setComponentMode} mod="add" /> : null}

  </>)
}

export default UsersPageContainer