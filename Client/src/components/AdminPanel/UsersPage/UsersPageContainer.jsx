import React, { useEffect } from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom"
import { getUsers_SC, updateUser_SC, delUser_SC, redirectAC } from "../../../store/actionCreators/actionCreatorsUsers"

const UsersPageContainer = (props) => {

  const auth = useSelector(state => state.authPage.auth)
  const userList = useSelector(state => state.usersPage.userList)
  const dispatch = useDispatch()

  dispatch(redirectAC(false))

  const userStatus = (id, newStatus) => {
    dispatch(updateUser_SC({ id, newStatus }))
  }

  const delUser = (id) => {
    //    let newUserList = userList.filter((user) => {     
    //      return user.UserID !== id
    //    })
    dispatch(delUser_SC(id))
  }

  useEffect(() => {
    // console.log("useEffect")
    dispatch(getUsers_SC())
  }, [])

  return (<>

    <SidebarContainer />

    {
      (auth.name && auth.role === "super_admin")
        ? <UsersPage userList={userList} userStatus={userStatus} delUser={delUser} />
        : <Redirect to={"/admin"} />
    }

  </>)
}

export default UsersPageContainer