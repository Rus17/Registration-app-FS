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

//export const getUsersListAPI = () => {
////  const payloadJSON = JSON.stringify(payload)
//  return axios.get(`http://localhost:4000/users`)
//}



// export const authorizationAPI = (data, reg) => {
//   let regUrl = reg ? "register" : "login"
//   let dataJSON = JSON.stringify(data)
//   return axios.post(`${server}api/${regUrl}/`, dataJSON, {
//      headers: { 'content-type': 'application/json' }
//   })
// }


// export const sendMyCommentAPI = (data, id, token) => {
//   let dataJSON = JSON.stringify(data)
//   return axios.post(`${server}api/reviews/${id}`, dataJSON, {
//      headers: {
//        'content-type': 'application/json',
//        'Authorization': `Token ${token}`
//      }
//   })
// }