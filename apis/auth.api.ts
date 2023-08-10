import { AuthResponse } from '@/types/auth.type'
import http from '@/utils/http'

// eslint-disable-next-line react-hooks/rules-of-hooks

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/auth/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/auth/login', body)
  },
  logoutAccount() {
    return http.get('/auth/logout')
  }
}

export default authApi
