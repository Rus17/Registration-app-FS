import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import SearchForm from "./SearchForm"
import { setSearchParticipantsAC } from '../../../store/actionCreators/participantsActionCreator'

const SearchFormContainer = ({ name }) => {
  const dispatch = useDispatch()

  const onSubmit = (text) => {
    console.log("text: ", text)
    dispatch(setSearchParticipantsAC(text.Search))
  }

  return <SearchForm onSubmit={onSubmit} form={name} initialValues={{ fieldName: name }} />
}

export default SearchFormContainer