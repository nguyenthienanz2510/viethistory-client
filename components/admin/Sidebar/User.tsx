'use client'

import { AppContext } from '@/contexts/app.context'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'

type Props = {}

const User = (props: Props) => {
  const { profile } = useContext(AppContext)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className='flex justify-start gap-3 overflow-hidden p-4'>
      <FontAwesomeIcon icon={faUser} size='lg' />
      <span className='truncate'>{isClient && profile?.email}</span>
    </div>
  )
}

export default User
