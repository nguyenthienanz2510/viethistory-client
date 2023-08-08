'use client'

import { signIn, useSession } from 'next-auth/react'
import axios from '../axios'

export const useRefreshToken = () => {
  const { data: session } = useSession()

  const refreshToken = async () => {
    try {
      const res = await axios.get('/auth/refresh', {
        headers: {
          Authorization: `Bearer ${session?.user.refreshToken}`
        }
      })

      if (session) {
        session.user.accessToken = res.data.accessToken
        session.user.refreshToken = res.data.refreshToken
      }
    } catch (err) {
      console.error(err)
      signIn()
    }
  }

  return refreshToken
}
