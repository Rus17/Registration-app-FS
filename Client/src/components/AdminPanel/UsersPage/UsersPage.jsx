import React from "react"
import ModalErrorContainer from "./ModalError/ModalErrorContainer"
import spinner from "../../../Img/spinner.svg"
import s from "./UsersPage.module.scss"

const UsersPage = ({
  userList, statusUserHandler, delUserHandler, setEditUserHandler,
  componentModeHandler, forbidden, preloader, userErrorMsg
}) => {

  const userTable = userList.map((user, i, arr) => {
    return (
      <tr key={user.userID}>
        <td className={user.admin_role === "super_admin" ? s.superAdmin : undefined}>{user.first_name}</td>
        <td className={user.admin_role === "super_admin" ? s.superAdmin : undefined}>{user.last_name}</td>
        <td className={user.admin_role === "super_admin" ? s.superAdmin : undefined}>{user.email}</td>
        <td>
          <button onClick={setEditUserHandler.bind(null, user)}>
            <span className={user.admin_role === "super_admin" ? s.superAdmin : undefined}>
              Edit
            </span>
          </button>
        </td>

        {user.status === "active"
          &&
          <td>
            {user.userPersonalPreloader
              ? <img className={s.spinner} src={spinner} height="10" alt="" />
              : <button onClick={statusUserHandler.bind(null, user.userID, "blocked")}>
                <span className={user.admin_role === "super_admin" ? s.superAdmin : undefined}>
                  Block
                </span>
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
                <span className={user.admin_role === "super_admin" ? s.superAdmin : undefined}>
                  Activate
                </span>
              </button>
            }
            {user.userPersonalPreloader
              ? <img className={s.spinner} src={spinner} height="10" alt="" />
              : <button onClick={delUserHandler.bind(null, user.userID)}>
                <span className={user.admin_role === "super_admin" ? s.superAdmin : undefined}>
                  Delete
                </span>
              </button>
            }
          </td>
        }
      </tr>
    )
  })

  return (
    <div className={s.usersPage}>
      <div className={s.titleTable}>A list of users</div>
      {preloader
        ?
        <img className={s.spinner} src={spinner} alt="" />
        : <table>
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
      }
      <button className={s.addUserButton} onClick={componentModeHandler.bind(null, "addUser")}>Add user</button>

      <ModalErrorContainer forbidden={forbidden} userErrorMsg={userErrorMsg} />
    </div>)
}

export default UsersPage