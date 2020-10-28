import React, { useEffect } from "react"
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ParticipantsPage from "./ParticipantsPage"
import SidebarContainer from "../Sidebar/SidebarContainer"
import { getParticipantsSC } from "../../../store/actionCreators/participantsActionCreator"

const ParticipantsPageContainer = () => {

  const name = useSelector(state => state.authPage.auth.name)
  const participantList = useSelector(state => state.participantsPage.participantList)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!participantList.length) {
      dispatch(getParticipantsSC())
    }
  }, [])

  return (<>

    <SidebarContainer />

    {name
      ? <ParticipantsPage participantList={participantList} />
      : <Redirect to={"/admin"} />
    }

  </>)
}

export default ParticipantsPageContainer