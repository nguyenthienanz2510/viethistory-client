'use client'

import mediaApi from '@/apis/media.api'
import { AppContext } from '@/contexts/app.context'
import React, { useContext } from 'react'

type Props = {}

function Media({}: Props) {
  const { isAuthenticated, profile, reset, setIsAuthenticated } = useContext(AppContext)
  console.log(isAuthenticated)

  const fetchMedia = async () => {
    try {
      const res = await mediaApi.getMedia()

      const media = res.data

      console.log(res)
    } catch (error) {
      console.error('Error during authorization:', error)
      return null
    }
  }
  fetchMedia()

  return (
    <div>
      <h1 className='mb-10'>Media</h1>
      <button
        onClick={() => {
          fetchMedia()
        }}
      >
        Fetch Media
      </button>
    </div>
  )
}

export default Media
