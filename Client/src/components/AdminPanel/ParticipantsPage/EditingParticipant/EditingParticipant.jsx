// import reactRouterDom from "react-router-dom";
import React from "react"
import spinner from "../../../../Img/spinner2.svg"
import s from "./EditingParticipant.module.scss"

const EditingParticipant = ({ participant, statusHandler, setEditMode, preloader }) => {
  return (
    <div className={s.participant_outer}>
      <div className={s.participant_inner}>
        <div>ID: </div><div>{participant.userID}</div>
        <div>First Name: </div><div>{participant.first_name}</div>
        <div>Last Name: </div><div>{participant.last_name}</div>
        <div>Position: </div><div>{participant.position}</div>
        <div>Status: </div><div>{participant.status}</div>
        <div>Birthdate: </div><div>{participant.birthdate}</div>
        <div>Company: </div><div>{participant.company}</div>
        <div>Country: </div><div>{participant.country}</div>
        <div>Date of arrival: </div><div>{participant.date_of_arrival}</div>
        <div>Date of departure: </div><div>{participant.date_of_departure}</div>
        <div>Email: </div><div>{participant.email}</div>
        <div>Registration date: </div><div>{participant.registration_date}</div>
        <div>Role: </div><div>{participant.role}</div>
        <div>Sex: </div><div>{participant.sex}</div>

        <div className={s.link} onClick={() => setEditMode(false)}>&#8592; Back</div>
        <div>
          {preloader ? <img src={spinner} width="150" alt="" /> : null}


          {participant.status === 'Approve' || preloader
            ? null
            : <button
              onClick={statusHandler.bind(null, { status: "Approve", id: participant.userID })}
              className={s.approveButton}>
              Approve
              </button>
          }
          {participant.status === 'Decline' || preloader
            ? null
            : <button
              onClick={statusHandler.bind(null, { status: "Decline", id: participant.userID })}
              className={s.declineButton}>
              Decline
              </button>
          }

        </div>
      </div>
    </div>
  )
}

export default EditingParticipant