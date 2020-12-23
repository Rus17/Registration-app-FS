import React from "react"
import { useDispatch, useSelector } from "react-redux"
import EditingParticipant from "./EditingParticipant"
import { setStatusParticipantSC } from "../../../../store/actionCreators/participantsActionCreator"

const EditingParticipantContainer = ({ participant, setEditMode }) => {

  const dispatch = useDispatch()
  const preloader = useSelector((state => state.participantsPage.preloader))


  const statusHandler = (payload) => {
    dispatch(setStatusParticipantSC(payload))
  }
  return <EditingParticipant participant={participant} statusHandler={statusHandler} setEditMode={setEditMode} preloader={preloader} />
}

export default EditingParticipantContainer