import React, {useState} from "react"
import { useDispatch, useSelector } from 'react-redux'
import {Redirect} from 'react-router-dom'
import UserAddForm from "./UserAddForm"
import { addUser_SAGA } from "../../../store/actionCreators/actionCreatorsUsers"
import SidebarContainer from "../Sidebar/SidebarContainer"

const UserAddFormContainer = () => {
  const dispatch = useDispatch()
  const preloader = useSelector(state => state.usersPage.preloader)
  const userError = useSelector(state => state.usersPage.userError)
  const redirect = useSelector(state => state.usersPage.redirect)  
  
  const onSubmit = (newUser) => {
    dispatch(addUser_SAGA(newUser))
  }
  
  if(redirect){
    return <Redirect to={"/admin/users"} />
  }
  return (<>
    <SidebarContainer />
    <UserAddForm onSubmit={onSubmit} preloader={preloader} userError={userError}/>
  </>)
}

export default UserAddFormContainer