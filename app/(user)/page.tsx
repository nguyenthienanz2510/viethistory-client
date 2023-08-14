'use client'

import Hero from '@/components/user/Hero'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
  useEffect(() => {
    toast('Welcome to Viethistory!')
    console.log('toast')
  }, [])
  return (
    <>
      <Hero />
    </>
  )
}
