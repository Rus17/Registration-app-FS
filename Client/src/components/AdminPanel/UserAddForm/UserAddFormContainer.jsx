import React from "react"
import { useDispatch } from 'react-redux'
import UserAddForm from "./UserAddForm"
import { addUser_SAGA } from "../../../store/actionCreators/actionCreatorsUsers"
import SidebarContainer from "../Sidebar/SidebarContainer"

const UserAddFormContainer = () => {
  const dispatch = useDispatch()
  
  const onSubmit = (newUser) => {
    console.log("newUser", newUser)
    dispatch(addUser_SAGA(newUser))
  }
  
  return (<>
    <SidebarContainer />
    <UserAddForm onSubmit={onSubmit} />
  </>)
}

export default UserAddFormContainer