import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { siteConfig } from '@/constants'
import axios from '@/lib/axios'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post('/auth/login', {
            email: credentials?.email,
            password: credentials?.password
          })

          const user = res.data

          if (user) {
            return user
          } else {
            return null
          }
        } catch (error) {
          console.error('Error during authorization:', error)
          return null
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any

      return session
    }
  },

  pages: {
    signIn: '/login'
  }
}

export default NextAuth(nextAuthOptions)
