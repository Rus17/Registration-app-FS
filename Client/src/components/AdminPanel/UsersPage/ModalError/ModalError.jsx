import React from 'react'
import Modal from 'react-modal'
import s from './ModalError.module.scss'

const customStyles = {
  content: {
    width: '350px',
    height: '200px',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

const ModalError = ({ forbidden, closeModal, userErrorMsg }) => {

  let errorMsg = []

  if (Object.keys(userErrorMsg).length) {
    for (var key in userErrorMsg) {
      errorMsg.push(<div key={key} className={s.title}>{key}: {userErrorMsg[key]}</div>)
    }
  }

  return (
    <div>
      <Modal
        isOpen={forbidden}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={s.container}>
          {
            errorMsg.length
              ? errorMsg
              : <div className={s.title}>Sorry! <br />You are not authorized to perform these actions.</div>
          }

          <button onClick={closeModal} className={s.button}>Close</button>
        </div>
      </Modal>
    </div>
  )
}

export default ModalError