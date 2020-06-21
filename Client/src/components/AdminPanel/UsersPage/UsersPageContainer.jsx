import React from "react"
import UsersPage from "./UsersPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { useSelector, useDispatch } from 'react-redux'
import {Redirect} from "react-router-dom"
import {updateUser_SAGA} from "../../../store/actionCreators/actionCreatorsUsers"

const UsersPageContainer = (props) => {
  
  const sAdmin = useSelector(state => state.usersPage.sAdmin)
  const userList = useSelector(state => state.usersPage.userList)
  const dispatch = useDispatch()
    
  const userBlocker = (id) => {
    
    let newUserList = userList.map((user) => {
      if(user.UserID === id){
        user.Status = "blocked"
      }
      return user
    })
    dispatch(updateUser_SAGA({newUserList, id}))
  }
  
  return (<>
    
    <SidebarContainer />
    
    {
      sAdmin 
      ? <UsersPage userList={userList} userBlocker={userBlocker}/>
      : <Redirect to={"/admin"} />
    }
    
  </>)
}

export default UsersPageContainer