import axios from "axios"

const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
  console.log("før")
  return axios.get(baseUrl).then(response=> response.data)
}


const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response=>response.data)
}

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data)
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}


export default {getAll,create,update, del}
