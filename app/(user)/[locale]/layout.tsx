import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/assets/style/globals.css'
import '@/assets/style/index.scss'

import React from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import { globalString } from '@/constants'
import Providers from '@/utils/hoc/Providers'
import NavigationEvents from '@/components/common/NavigationEvents'
import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }]
}

const loadMessages = async (locale: string) => {
  const url = `https://api.i18nexus.com/project_resources/translations/${locale}.json?api_key=${process.env.I18NEXUS_API_KEY}`

  const res = await fetch(url, {
    next: { revalidate: false }
  })

  return res.json()
}

config.autoAddCss = false

export async function generateMetadata() {
  return {
    title: `Home - ${globalString.SITE_NAME}`,
    description: 'Embark on a journey to uncover the stories of history with us'
  }
}

interface Props {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function UserLayout({ children, params: { locale } }: Props) {
  let messages
  try {
    messages = await loadMessages(locale)
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
