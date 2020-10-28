import React from "react"
import "./participantsPage.css"

const ParticipantsPage = ({ participantList }) => {

  const participantsTable = participantList.map((participant, i, arr) => {
    return (
      <tr key={participant.UserID}>
        <td>{participant.First_Name} {participant.Last_Name}</td>
        <td>{participant.Email}</td>
        <td>{participant.Date_of_arrival}</td>
        <td>{participant.Date_of_departure}</td>
        <td>{participant.Company}</td>
        <td>{participant.Country}</td>
        <td>{participant.Position}</td>
        <td>{participant.Sex}</td>
        <td>{participant.Birthdate}</td>
        <td>{participant.Registration_date}</td>
        <td>{participant.Status}</td>
        <td>{participant.Role}</td>
      </tr>
    )
  })

  return (
    <div className="participantsPage">
      <div className="titleTable">List of participants</div>
      <div className="containerTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Arrival date</th>
              <th>Departure date</th>
              <th>Company</th>
              <th>Country</th>
              <th>Position</th>
              <th>Sex</th>
              <th>Birthdate</th>
              <th>Registration date</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {participantsTable}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ParticipantsPage