import { config } from '@fortawesome/fontawesome-svg-core'
import Providers from '@/utils/hoc/Providers'
import { ToastContainer } from 'react-toastify'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/assets/style/globals.css'
import '@/assets/style/index.scss'
import { Suspense } from 'react'
import NavigationEvents from '@/components/common/NavigationEvents'

config.autoAddCss = false

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <Providers>
          {children}
          <ToastContainer />
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
