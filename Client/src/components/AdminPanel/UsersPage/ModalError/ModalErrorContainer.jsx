import React from 'react'
import { useDispatch } from 'react-redux'
import { forbiddenAC } from '../../../../store/actionCreators/authActionCreator'
import ModalError from './ModalError'

const ModalErrorContainer = ({ forbidden }) => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(forbiddenAC(false))
  }

  return <ModalError forbidden={forbidden} closeModal={closeModal} />
}

export default ModalErrorContainer