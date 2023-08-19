'use client'

import { LatestArticle } from '@/components/user/Article'
import HomeHero from '@/components/user/Hero'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
  useEffect(() => {
    toast('Welcome to Viethistory!')
  }, [])
  return (
    <>
      <HomeHero />
      <LatestArticle />
    </>
  )
}
