import { siteConfig } from '@/constants'
import axios from 'axios'

export default axios.create({
  baseURL: siteConfig.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axiosAuth = axios.create({
  baseURL: siteConfig.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
