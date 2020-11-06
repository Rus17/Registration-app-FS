import React from "react"
import s from "./participantsPage.module.css"

const ParticipantsPage = ({ participantList, editParticipantHandler, sortHandler, numberOfPages, pageClickHandler, currentPage }) => {

  const participantsTable = participantList.map((participant, i, arr) => {
    return (
      <tr key={participant.UserID} onClick={editParticipantHandler.bind(null, participant)}>
        <td>{participant.First_Name} {participant.Last_Name}</td>
        <td>{participant.Email}</td>
        <td>{participant.Company}</td>
        <td>{participant.Country}</td>
        <td>{participant.Position}</td>
        <td>{participant.Registration_date}</td>
        <td>{participant.Status}</td>
      </tr>
    )
  })

  let pagesArr = []
  for (let i = 1; i <= numberOfPages; i++) { pagesArr.push(i) }

  const pages = pagesArr.map((p) => {
    if (p === currentPage) {
      return <span key={p} className={s.active} > {p} </span>
    }
    return <span key={p} onClick={pageClickHandler.bind(null, p)}> {p} </span>
  })

  return (
    <div className={s.participantsPage}>
      <div className="titleTable">List of participants</div>
      <div className="containerTable">
        <table>
          <thead>
            <tr>
              <th onClick={sortHandler.bind(null, 'First_Name')}>Name</th>
              <th onClick={sortHandler.bind(null, 'Email')}>Email</th>
              <th onClick={sortHandler.bind(null, 'Company')}>Company</th>
              <th onClick={sortHandler.bind(null, 'Country')}>Country</th>
              <th onClick={sortHandler.bind(null, 'Position')}>Position</th>
              <th onClick={sortHandler.bind(null, 'Registration_date')}>Registration date</th>
              <th onClick={sortHandler.bind(null, 'Status')}>Status</th>
            </tr>
          </thead>
          <tbody>
            {participantsTable}
          </tbody>

        </table>
      </div>
      <div className={s.paginator}>
        {pages}
      </div>
    </div>
  )
}

export default ParticipantsPage