import React, { useEffect, useState } from "react"
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ParticipantsPage from "./ParticipantsPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { getParticipantsSC } from "../../../store/actionCreators/participantsActionCreator"
import EditingParticipantsContainer from "./EditingParticipant/EditingParticipantContainer"

const ParticipantsPageContainer = () => {

  const name = useSelector(state => state.authPage.auth.name)
  const participantList = useSelector(state => state.participantsPage.participantList)
  const pageSize = useSelector(state => state.participantsPage.pageSize)
  // const totalParticipantsCount = useSelector(state => state.participantsPage.totalParticipantsCount)
  const currentPage = useSelector(state => state.participantsPage.currentPage)
  const sort = useSelector(state => state.participantsPage.sort)

  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [participant, setParticipant] = useState({})

  const editParticipantHandler = (participant) => {
    setEditMode(true)
    setParticipant(participant)
  }

  const sortHandler = (sort) => {

    dispatch(getParticipantsSC({ sort, pageSize, currentPage }))
  }

  useEffect(() => {
    if (!participantList.length) {
      console.log("useEffect", sort, pageSize, currentPage)
      dispatch(getParticipantsSC({ sort, pageSize, currentPage }))
    }
  }, [])

  if (editMode) {
    return (<>
      <SidebarContainer />
      <EditingParticipantsContainer participant={participant} setEditMode={setEditMode} />
    </>)
  }

  return (<>
    <SidebarContainer />
    {name
      ? <ParticipantsPage participantList={participantList} editParticipantHandler={editParticipantHandler} sortHandler={sortHandler} />
      : <Redirect to={"/admin"} />
    }
  </>)
}

export default ParticipantsPageContainer