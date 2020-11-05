import * as axios from "axios"

const instance = axios.create({
  baseURL: 'http://localhost:4000/admin',
  headers: { 'Content-Type': 'application/json' }
})


export const conference = {
  getListOfCountriesAPI() {
    return axios.get(`https://restcountries.eu/rest/v2/all`)
  },

  setParticipantAPI(payload) {
    return axios.post(`http://localhost:4000/conf_registration`,
      JSON.stringify(payload),
      { headers: { 'content-type': 'application/json' } }
    )
  }
}

export const auth = {
  authorizationAPI(payload) {
    return instance.post('', JSON.stringify(payload))
  }
}

export const users = {
  getUsersAPI() {
    return instance.get('/users')
  },

  modificationUserAPI(payload) {
    return instance.put(`/user/${payload.modUser.UserID}`, JSON.stringify(payload.modUser))
  },

  updateUserAPI(payload) {
    // console.log("api", payload)
    return instance.patch(`/users/${payload.id}`, JSON.stringify({ status: payload.status }))
  },

  delUserAPI(payload) {
    return instance.delete(`/users/${payload}`, payload)
  },

  addUserAPI(payload) {
    return instance.post('/users', JSON.stringify(payload))
  }
}


export const participants = {
  getParticipantsAPI(payload) {
    console.log("api", payload)
    return instance.get(`/participants/${payload.sort}/${payload.pageSize}/${payload.currentPage}`)
  },

  setStatusParticipantAPI(payload) {
    // console.log("api", payload)
    return instance.patch(`/participant/${payload.id}`, JSON.stringify({ status: payload.status }))
  }
}

