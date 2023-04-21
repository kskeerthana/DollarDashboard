import axios from 'axios'

const API_URL = '/api/users/'
//const { OAuth2Client } = require('google-auth-library');

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}


//const protect1 = async function verify(client_id, jwtToken) {
 
const authService = {
  register,
  logout,
  login,
}

export default authService