import React from "react"
import ModalErrorContainer from "./ModalError/ModalErrorContainer"
import spinner from "../../../Img/spinner3.svg"
import s from "./UsersPage.module.scss"

const UsersPage = ({ userList, statusUserHandler, delUserHandler, setEditUserHandler, componentModeHandler, forbidden, preloader }) => {

  console.log("forbidden2", forbidden)

  const userTable = userList.map((user, i, arr) => {
    return (
      <tr key={user.userID}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td><button onClick={setEditUserHandler.bind(null, user)}>Edit</button></td>

        {user.status === "active"
          &&
          <td>
            {user.userPersonalPreloader
              ? <img className={s.spinner} src={spinner} height="10" alt="" />
              : <button onClick={statusUserHandler.bind(null, user.userID, "blocked")}>
                Block
                </button>
            }
          </td>
        }

        {user.status === "blocked"
          &&
          <td>
            {user.userPersonalPreloader
              ? <img className={s.spinner} src={spinner} height="10" alt="" />
              : <button onClick={statusUserHandler.bind(null, user.userID, "active")}>
                Activate
                </button>
            }
            {user.userPersonalPreloader
              ? <img className={s.spinner} src={spinner} height="10" alt="" />
              : <button onClick={delUserHandler.bind(null, user.userID)}>Delete</button>
            }
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
      <ModalErrorContainer forbidden={forbidden} />
    </div>)
}

export default UsersPage