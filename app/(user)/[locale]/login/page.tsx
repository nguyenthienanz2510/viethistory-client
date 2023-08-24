'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from '@/utils/validate'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import authApi from '@/apis/auth.api'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'
import Link from 'next/link'
import { InputAuth } from '@/components/common/Input'
import { ButtonPrimary } from '@/components/common/Button'
import NProgress from 'nprogress'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const router = useRouter()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    NProgress.start()
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.profile)
        NProgress.done()
        router.push('/dashboard')
        toast.success('Login successful!')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<null>>(error)) {
          NProgress.done()
          setError('password', { message: error.response?.data.message, type: 'maxLength' })
          toast.error('Login fail!')
        }
      }
    })
  })

  return (
    <div className='container'>
      <div className='grid grid-cols-1 py-12 lg:grid-cols-4 lg:py-32 lg:pr-10'>
        <div className='lg:col-span-2 lg:col-start-2'>
          <form className='rounded bg-white p-10 text-color-text-dark shadow-sm' onSubmit={onSubmit} noValidate>
            <h1 className='text-2xl'>Login</h1>
            <InputAuth
              name='email'
              register={register}
              type='email'
              className='mt-8'
              errorMessage={errors.email?.message}
              placeholder='Email'
            />
            <InputAuth
              name='password'
              register={register}
              type='password'
              className='mt-2'
              classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
              errorMessage={errors.password?.message}
              placeholder='Password'
              autoComplete='on'
            />
            <div className='mt-3'>
              <ButtonPrimary
                type='submit'
                className=''
                isLoading={loginMutation.isLoading}
                disabled={loginMutation.isLoading}
              >
                Login
              </ButtonPrimary>
            </div>
            <div className='mt-8 flex items-center justify-center'>
              <span className='text-gray-400'>Do not have an account?</span>
              <Link className='ml-1 text-color-primary hover:text-color-primary/80' href='/register'>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
