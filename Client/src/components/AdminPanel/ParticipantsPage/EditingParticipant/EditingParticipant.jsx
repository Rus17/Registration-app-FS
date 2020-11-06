// import reactRouterDom from "react-router-dom";
import React from "react"
import s from "./EditingParticipant.module.css"

const EditingParticipant = ({ participant, statusHandler, setEditMode }) => {
  // console.log("part", participant)
  return <div className={s.participant}>
    <div>ID: </div><div>{participant.UserID}</div>
    <div>First Name: </div><div>{participant.First_Name}</div>
    <div>Last Name: </div><div>{participant.Last_Name}</div>
    <div>Position: </div><div>{participant.Position}</div>
    <div>Status: </div><div>{participant.Status}</div>
    <div>Birthdate: </div><div>{participant.Birthdate}</div>
    <div>Company: </div><div>{participant.Company}</div>
    <div>Country: </div><div>{participant.Country}</div>
    <div>Date of arrival: </div><div>{participant.Date_of_arrival}</div>
    <div>Date of departure: </div><div>{participant.Date_of_departure}</div>
    <div>Email: </div><div>{participant.Email}</div>
    <div>Registration date: </div><div>{participant.Registration_date}</div>
    <div>Role: </div><div>{participant.Role}</div>
    <div>Sex: </div><div>{participant.Sex}</div>

    <div className={s.link} onClick={() => setEditMode(false)}>&#8592; Back</div>
    <div>
      {participant.Status === 'Approve'
        ? null
        : <button
          onClick={statusHandler.bind(null, { status: "Approve", id: participant.UserID })}
          className={s.approveButton}>
          Approve
          </button>
      }
      {participant.Status === 'Decline'
        ? null
        : <button
          onClick={statusHandler.bind(null, { status: "Decline", id: participant.UserID })}
          className={s.declineButton}>
          Decline
          </button>
      }
    </div>
  </div>
}

export default EditingParticipant