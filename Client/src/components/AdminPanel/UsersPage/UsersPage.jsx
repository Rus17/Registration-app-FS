import React from "react"
import s from "./UsersPage.module.scss"

const UsersPage = ({ userList, statusUserHandler, delUserHandler, setEditUserHandler, componentModeHandler }) => {

  const userTable = userList.map((user, i, arr) => {
    return (
      <tr key={user.UserID}>
        <td>{user.First_Name}</td>
        <td>{user.Last_Name}</td>
        <td>{user.Email}</td>
        <td><button onClick={setEditUserHandler.bind(null, user)}>Edit</button></td>

        {user.Status === "active"
          &&
          <td>
            <button onClick={statusUserHandler.bind(null, user.UserID, "blocked")}>
              Block
          </button>
          </td>
        }

        {user.Status === "blocked"
          &&
          <td>
            <button onClick={statusUserHandler.bind(null, user.UserID, "active")}>
              Activate
          </button>
            <button onClick={delUserHandler.bind(null, user.UserID)}>Delete</button>
          </td>
        }
      </tr>
    )
  })

  return (
    <div className={s.usersPage}>
      <div className={s.titleTable}>A list of users</div>
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
      <button className={s.addUserButton} onClick={componentModeHandler.bind(null, "addUser")}>Add user</button>
    </div>)
}

export default UsersPage