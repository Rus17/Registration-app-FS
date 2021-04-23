import React from 'react'
import { useDispatch } from 'react-redux'
import ModalError from './ModalError'
import { userErrorAC, forbiddenAC } from '../../../../store/actionCreators/usersActionCreator'

const ModalErrorContainer = ({ forbidden, userErrorMsg }) => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(userErrorAC({}))
    dispatch(forbiddenAC(false))
  }

  return <ModalError forbidden={forbidden} closeModal={closeModal} userErrorMsg={userErrorMsg} />
}

export default ModalErrorContainer