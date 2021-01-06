import React from "react"
import s from "./ParticipantsPage.module.scss"
import SearchFormContainer from '../SearchForm/SearchFormContainer'
import spinner from "../../../Img/spinner3.svg"

const ParticipantsPage = ({ participantList, editParticipantHandler, sortHandler, numberOfPages, pageClickHandler,
  currentPage, filterHandler, sort, filter, search, searchReset, preloader }) => {

  const participantsTable = participantList.map((participant, i, arr) => {
    return (
      <tr key={participant.userID} onClick={editParticipantHandler.bind(null, participant)}>
        <td>{participant.first_name} {participant.last_name}</td>
        <td>{participant.email}</td>
        <td>{participant.company}</td>
        <td>{participant.country}</td>
        <td>{participant.position}</td>
        <td>{participant.registration_date}</td>
        <td>{participant.status}</td>
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
      <div className={s.titleTable}>List of participants</div>
      <div className={s.containerTable}>
        <div className={s.sett}>
          <div className={s.settTitle}>Sorting:</div><div className={s.settValue}>{sort} <br /></div><div></div>
          <div className={s.settTitle}>Filtration:</div><div className={s.settValue}>{filter} <br /></div><div></div>
          <div className={s.settTitle}>Search:</div><div className={s.settValue}>{search.searchText}</div>
          <div>{search.searchText ? <button onClick={searchReset.bind()} >Reset</button> : null}</div>
        </div>

        <img className={preloader ? s.spinner : s.hidden} src={spinner} alt="" />

        <div className={s.paginator}>
          {pages}
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <div onClick={sortHandler.bind(null, 'First_Name')} className={s.sorter}>
                  Name
                </div>
              </th>
              <th>
                <div onClick={sortHandler.bind(null, 'Email')} className={s.sorter}>
                  Email
                </div>
              </th>
              <th>
                <div onClick={sortHandler.bind(null, 'Company')} className={s.sorter}>
                  Company
                </div>
              </th>
              <th onClick={sortHandler.bind(null, 'Country')} className={s.sorter}>Country</th>
              <th onClick={sortHandler.bind(null, 'Position')} className={s.sorter}>Position</th>
              <th onClick={sortHandler.bind(null, 'Registration_date')} className={s.sorter}>Registration date</th>
              <th>
                <div onClick={sortHandler.bind(null, 'Status')} className={s.sorter}>Status</div>
                <div className={s.filter}>
                </div>
              </th>
            </tr>

            <tr>
              <td>
                <SearchFormContainer name='first_name' />
              </td>
              <td>
                <SearchFormContainer name='email' />
              </td>
              <td>
                <SearchFormContainer name='company' />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div>Filter:</div>
                <div className={s.filter}>
                  <span onClick={filterHandler.bind(null, 'All')}>All</span>|
                  <span onClick={filterHandler.bind(null, 'new')}>New</span>|
                  <span onClick={filterHandler.bind(null, 'Approve')}>App.</span>|
                  <span onClick={filterHandler.bind(null, 'Decline')}>Dec.</span>
                </div>
              </td>
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