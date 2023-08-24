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

config.autoAddCss = false

export const metadata: Metadata = {
  title: `Dashboard - ${globalString.SITE_NAME}`
}

interface Props {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>
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
      </body>
    </html>
  )
}
