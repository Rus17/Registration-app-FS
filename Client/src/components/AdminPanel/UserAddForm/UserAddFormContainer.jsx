import React, {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import {Redirect} from 'react-router-dom'
import UserAddForm from "./UserAddForm"
import { addUser_SAGA, userErrorAC } from "../../../store/actionCreators/actionCreatorsUsers"
import SidebarContainer from "../Sidebar/SidebarContainer"

const UserAddFormContainer = () => {
  const dispatch = useDispatch()
  const preloader = useSelector(state => state.usersPage.preloader)
  const userError = useSelector(state => state.usersPage.userError)
  const redirect = useSelector(state => state.usersPage.redirect)
  
//  dispatch(userErrorAC(""))
  useEffect(() => {dispatch(userErrorAC({}))}, []) 
  
  const onSubmit = (newUser) => {
    dispatch(addUser_SAGA(newUser))
  }
  
  //If, when adding a new user, "rdr" is set to "true" and there are no errors from the server, 
  //then redirect to the user table
  
  if(redirect && Object.keys(userError).length === 0){
    return <Redirect to={"/admin/users"} />
  }
  return (<>
    <SidebarContainer />
    <UserAddForm onSubmit={onSubmit} preloader={preloader} userError={userError}/>
  </>)
}

export default UserAddFormContainer