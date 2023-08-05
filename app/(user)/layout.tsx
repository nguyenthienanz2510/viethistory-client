import '@/assets/style/globals.css'
import '@/assets/style/index.scss'
import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { globalString } from '@/constants'
config.autoAddCss = false

export const metadata: Metadata = {
  title: `Dashboard - ${globalString.SITE_NAME}`,
  description: 'embark on a journey to uncover the stories of history with us'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
