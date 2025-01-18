import axios from 'axios'

export const AxiosLib = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})