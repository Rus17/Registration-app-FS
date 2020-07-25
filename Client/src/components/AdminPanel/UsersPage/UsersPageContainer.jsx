import React from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector, useDispatch } from 'react-redux'
import {Redirect} from "react-router-dom"
import {updateUser_SAGA, delUser_SAGA, redirectAC} from "../../../store/actionCreators/actionCreatorsUsers"

const UsersPageContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  const userList = useSelector(state => state.usersPage.userList)
  const dispatch = useDispatch()
  
  dispatch(redirectAC(false))
    
  const userStatus = (id, newStatus) => {
    dispatch(updateUser_SAGA({id, newStatus}))    
  }
  
  const delUser = (id) => {
//    let newUserList = userList.filter((user) => {     
//      return user.UserID !== id
//    })
    dispatch(delUser_SAGA(id))
  }
  
  
  return (<>
    
    <SidebarContainer />
    
    {
      sAdmin 
      ? <UsersPage userList={userList} userStatus={userStatus} delUser={delUser}/>
      : <Redirect to={"/admin"} />
    }
    
  </>)
}

export default UsersPageContainer