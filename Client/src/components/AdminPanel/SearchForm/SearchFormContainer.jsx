import React from "react"
import { useDispatch } from 'react-redux'
import { reset } from 'redux-form'
import SearchForm from "./SearchForm"
import { setSearchParticipantsAC } from '../../../store/actionCreators/participantsActionCreator'

const SearchFormContainer = ({ name }) => {

  const dispatch = useDispatch()
  const onSubmit = (text) => {
    dispatch(setSearchParticipantsAC({ searchText: text.Search, fieldName: text.fieldName }))
    dispatch(reset(name))
  }

  return <SearchForm onSubmit={onSubmit} form={name} initialValues={{ fieldName: name }} />
}

export default SearchFormContainer