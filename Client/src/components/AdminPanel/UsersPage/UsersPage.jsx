import React from "react"
import {Redirect} from 'react-router-dom'
import {NavLink} from "react-router-dom"
import "./usersPage.css"

const UsersPage = ({userList, userStatus, delUser}) => {
  
  const userTable = userList.map((user, i, arr) => {
    return (
      <tr key={user.UserID}>
        <td>{user.First_Name}</td>
        <td>{user.Last_Name}</td>
        <td>{user.Email}</td>
        <td><button>Edit</button></td>
        
        {user.Status === "active" 
        && 
        <td>
          <button onClick={userStatus.bind(null, user.UserID, "blocked")}>
            Block
          </button>
        </td>
        }
        
        {user.Status === "blocked" 
        && 
        <td>
          <button onClick={userStatus.bind(null, user.UserID, "active")}>
            Activate
          </button>
          <button onClick={delUser.bind(null, user.UserID)}>Delete</button>
        </td>
        }
          
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
    <NavLink to="/admin/users/add_user"><button className="addUserButton">Add user</button></NavLink>

    
  </div>)
}

export default UsersPage