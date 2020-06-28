import React from "react"
import UserAddForm from "./UserAddForm"

const UserAddFormContainer = () => {
  
  const onSubmit = (formData) => {
    console.log(formData)
  }
  
  return (
    <UserAddForm onSubmit={onSubmit} />
  )
}

export default UserAddFormContainer