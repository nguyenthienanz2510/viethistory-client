'use client'

import { axiosAuth } from '@/lib/axios'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import React from 'react'

type Props = {}

function Media({}: Props) {
  const axiosAuth = useAxiosAuth()
  const fetchMedia = async () => {
    try {
      const res = await axiosAuth.get('/media')

      const media = res.data

      console.log(res)
    } catch (error) {
      console.error('Error during authorization:', error)
      return null
    }
  }
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
