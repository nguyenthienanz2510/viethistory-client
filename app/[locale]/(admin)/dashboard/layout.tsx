import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/assets/style/globals.css'
import '@/assets/style/index.scss'

import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'

import { globalString } from '@/constants'
import Providers from '@/utils/hoc/Providers'
import SideBar from '@/components/admin/Sidebar'
import NavigationEvents from '@/components/common/NavigationEvents'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

config.autoAddCss = false

const loadMessages = async (locale: string) => {
  const url = `https://api.i18nexus.com/project_resources/translations/${locale}.json?api_key=${process.env.I18NEXUS_API_KEY}`

  const res = await fetch(url, {
    next: { revalidate: false }
  })

  return res.json()
}

export const metadata: Metadata = {
  title: `Dashboard - ${globalString.SITE_NAME}`
}

interface Props {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function AdminLayout({ children, params: { locale } }: Props) {
  let messages
  try {
    messages = await loadMessages(locale)
  } catch (error) {
    notFound()
  }
  return (
    <html lang='en'>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className='admin-template'>
              <SideBar />
              <main className='ml-[260px] h-[2000px]'>
                <div className='px-7 pb-10 pt-5'>{children}</div>
              </main>
            </div>
            <ToastContainer />
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
