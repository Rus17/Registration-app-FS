import React from "react"
import s from "./participantsPage.module.css"
import SearchFormContainer from '../SearchForm/SearchFormContainer'

const ParticipantsPage = ({ participantList, editParticipantHandler, sortHandler, numberOfPages, pageClickHandler,
  currentPage, filterHandler, sort, filter, search, searchReset }) => {

  // console.log("sort", sort)
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
        <div>
          Sorting: {sort} <br />
          Filtration: {filter} <br />
          Search: {search.searchText} {search.searchText ? <span className={s.resetSymbol} onClick={searchReset.bind()} >Reset</span> : null}
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


          </thead>
          <tbody>
            <tr>
              <td>
                <SearchFormContainer name='First_Name' />
              </td>
              <td>
                <SearchFormContainer name='Email' />
              </td>
              <td>
                <SearchFormContainer name='Company' />
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