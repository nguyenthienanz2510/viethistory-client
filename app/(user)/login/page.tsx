'use client'

import { signIn } from 'next-auth/react'
import React, { useRef } from 'react'

type Props = {}

function Login({}: Props) {
  const email = useRef('')
  const password = useRef('')

  const onSubmit = async () => {
    try {
      const result = await signIn('credentials', {
        email: email.current,
        password: password.current,
        redirect: true,
        callbackUrl: '/'
      })
      console.log(result)
    } catch (error) {
      console.error('Error during SignIn:', error)
    }
  }

  return (
    <div className='container'>
      <div className='mx-auto flex max-w-[460px] flex-col items-center justify-center gap-5 py-60'>
        <h1 className='text-4xl font-bold text-color-text-primary'>Login to your account</h1>
        <div className='w-full space-y-5'>
          <div>
            <input
              className='w-full text-color-text-dark'
              type='email'
              name='email'
              placeholder='email'
              onChange={(e) => {
                email.current = e.target.value
              }}
            />
          </div>
          <div>
            <input
              className='w-full text-color-text-dark'
              type='text'
              name='password'
              placeholder='password'
              onChange={(e) => {
                password.current = e.target.value
              }}
            />
          </div>
          <button className='w-full rounded bg-color-primary py-2 text-color-white' onClick={onSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
