import * as axios from "axios"

//https://restcountries.eu/rest/v2/all
//const server = "http://localhost:4000/"


export const getListOfCountriesAPI = () => {
  return axios.get(`https://restcountries.eu/rest/v2/all`)
}

export const setParticipantAPI = (payload) => {
  const payloadJSON = JSON.stringify(payload)
  return axios.post(`http://localhost:4000/conf_registration`, payloadJSON, {
    headers: {'content-type': 'application/json'}
  })
}

export const authorizationAPI = (payload) => {
  const payloadJSON = JSON.stringify(payload)
  return axios.post(`http://localhost:4000/admin`, payloadJSON, {
    headers: {'content-type': 'application/json'}
  })
}

export const updateUserAPI = (payload) => {
  const payloadJSON = JSON.stringify(payload)
  return axios.put(`http://localhost:4000/admin/update_user`, payloadJSON, {
    headers: {'content-type': 'application/json'}
  })
}

export const delUserAPI = (payload) => {
  return axios.delete(`http://localhost:4000/admin/del_user/${payload}`)
}
