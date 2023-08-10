import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import type { Metadata } from 'next'
import { globalString } from '@/constants'
import React from 'react'

export const metadata: Metadata = {
  title: `Home - ${globalString.SITE_NAME}`,
  description: 'Embark on a journey to uncover the stories of history with us'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}
