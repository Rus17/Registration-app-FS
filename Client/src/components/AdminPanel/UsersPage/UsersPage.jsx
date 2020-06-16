import React from "react"
import "./usersPage.css"

const UsersPage = ({userList}) => {
  
  const userTable = userList.map((user, i, arr) => {
    return (
      <tr key={user.UserID}>
        <td>{user.First_Name}</td>
        <td>{user.Last_Name}</td>
        <td>{user.Email}</td>
        <td><button>Edit</button></td>
        <td><button>Delete</button></td>    
      </tr>
    )
  })
  
  return (
    <div className="usersPage">
    <div className="titleTable">A list of users</div>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {userTable}
      </tbody>
      
    </table>

    
  </div>)
}

export default UsersPage