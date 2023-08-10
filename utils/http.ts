'use client'

import axios, { AxiosError, AxiosRequestConfig, type AxiosInstance } from 'axios'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from '@/types/utils.type'
import { siteConfig } from '@/constants'
import { AuthResponse } from '@/types/auth.type'

const URL_LOGIN = '/auth/login'
const URL_REGISTER = '/auth/register'
const URL_LOGOUT = '/auth/logout'
const URL_REFRESH_TOKEN = '/auth/refresh'

export class Http {
  public instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS() || ''
    this.refreshToken = getRefreshTokenFromLS() || ''
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: siteConfig.API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    /**
     * Request interceptor
     */
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = 'Bearer ' + this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    /**
     * Response interceptor
     */
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.tokens.access_token
          this.refreshToken = data.data.tokens.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.data.profile)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
          console.log(URL_LOGOUT)
        }

        return response
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config: AxiosRequestConfig = error.response?.config || {}
          const { url } = config as any

          if (error.response?.status === 401 && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: 'Bearer ' + access_token }
              })
            })
          }

          clearLS()
          this.accessToken = ''
          this.refreshToken = ''

          alert(error.response?.data.message)
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return axios
      .get(`${siteConfig.API_URL}/auth/refresh`, {
        headers: {
          Authorization: 'Bearer ' + this.refreshToken
        }
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data.data.tokens

        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        this.accessToken = access_token
        this.refreshToken = refresh_token

        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''

        alert(error.response.data.message)
        window.location.href = '/login'
      })
  }
}
const http = new Http().instance
export default http
