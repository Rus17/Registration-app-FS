import React, { useEffect, useState } from "react"
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ParticipantsPage from "./ParticipantsPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import {
  getParticipantsSC, setSortingParticipantsAC,
  setCurrentPageParticipantsAC, setFiltrationParticipantsAC
} from "../../../store/actionCreators/participantsActionCreator"
import EditingParticipantsContainer from "./EditingParticipant/EditingParticipantContainer"

const ParticipantsPageContainer = () => {

  const name = useSelector(state => state.authPage.auth.name)
  const participantList = useSelector(state => state.participantsPage.participantList)
  const pageSize = useSelector(state => state.participantsPage.pageSize)
  const totalParticipantsCount = useSelector(state => state.participantsPage.totalParticipantsCount)
  const currentPage = useSelector(state => state.participantsPage.currentPage)
  const sort = useSelector(state => state.participantsPage.sort)
  const filter = useSelector(state => state.participantsPage.filter)
  const search = useSelector(state => state.participantsPage.search)

  const dispatch = useDispatch()
  const numberOfPages = Math.ceil(totalParticipantsCount / pageSize)

  const [editMode, setEditMode] = useState(false)
  const [participant, setParticipant] = useState({})

  const editParticipantHandler = (participant) => {
    setEditMode(true)
    setParticipant(participant)
  }

  // Меняем значение sort в redax-е => Срабатывает useEffect, потому что sort указан в  зависимостях => срабатывает getParticipantsSC()
  const sortHandler = (newSort) => {
    if (sort == newSort) {
      newSort = newSort + '!rev'
    }
    dispatch(setSortingParticipantsAC(newSort))
  }

  const pageClickHandler = (p) => {
    dispatch(setCurrentPageParticipantsAC(p))
  }

  const filterHandler = (newFilter) => {
    //All|New|Approve|Decline
    dispatch(setFiltrationParticipantsAC(newFilter))
    dispatch(setCurrentPageParticipantsAC(1))
  }

  useEffect(() => {
    dispatch(getParticipantsSC({ sort, pageSize, currentPage, filter }))
  }, [sort, currentPage, filter, search])

  if (editMode) {
    return (<>
      <SidebarContainer />
      <EditingParticipantsContainer participant={participant} setEditMode={setEditMode} />
    </>)
  }

  return (<>
    <SidebarContainer />
    {name
      ? <ParticipantsPage
        participantList={participantList} editParticipantHandler={editParticipantHandler} currentPage={currentPage}
        sortHandler={sortHandler} numberOfPages={numberOfPages} pageClickHandler={pageClickHandler} filterHandler={filterHandler}
      />
      : <Redirect to={"/admin"} />
    }
  </>)
}

export default ParticipantsPageContainer