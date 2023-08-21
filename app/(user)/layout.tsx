import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import { globalString } from '@/constants'
import React from 'react'
// import useIntl from '@/app/intl'

export async function generateMetadata() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const intl = await useIntl('common')

  // return {
  //   title: `${intl.formatMessage({ id: 'Home' })} - ${globalString.SITE_NAME}`,
  //   description: `${intl.formatMessage({ id: 'Embark on a journey to uncover the stories of history with us' })}`
  // }

  return {
    title: `Home - ${globalString.SITE_NAME}`,
    description: 'Embark on a journey to uncover the stories of history with us'
  }
}

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}
