import { User } from '@/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (accessToken: string) => {
  if (typeof window == 'undefined') return false

  localStorage.setItem('access_token', accessToken)
}

export const setRefreshTokenToLS = (refreshToken: string) => {
  if (typeof window == 'undefined') return false

  localStorage.setItem('refresh_token', refreshToken)
}

export const clearLS = () => {
  if (typeof window == 'undefined') return false

  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => {
  if (typeof window == 'undefined') return false

  localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLS = () => {
  if (typeof window == 'undefined') return false

  localStorage.getItem('refresh_token') || ''
}

export const getProfileFromLS = () => {
  if (typeof window == 'undefined') return false

  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  if (typeof window == 'undefined') return false

  localStorage.setItem('profile', JSON.stringify(profile))
}
