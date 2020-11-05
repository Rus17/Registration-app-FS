import React from "react"
import { useDispatch } from "react-redux"
import EditingParticipant from "./EditingParticipant"
import { setStatusParticipantSC } from "../../../../store/actionCreators/participantsActionCreator"

const EditingParticipantContainer = ({ participant, setEditMode }) => {

  const dispatch = useDispatch()

  const statusHandler = (payload) => {
    dispatch(setStatusParticipantSC(payload))
  }
  return <EditingParticipant participant={participant} statusHandler={statusHandler} setEditMode={setEditMode} />
}

export default EditingParticipantContainer