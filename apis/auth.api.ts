import axios from '@/lib/axios'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { AuthResponse } from '@/types/auth.type'

// eslint-disable-next-line react-hooks/rules-of-hooks
const axiosAuth = useAxiosAuth()

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return axios.post<AuthResponse>('/auth/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return axios.post<AuthResponse>('/auth/login', body)
  },
  logoutAccount() {
    return axiosAuth.post('/auth/logout')
  }
}

export default authApi
