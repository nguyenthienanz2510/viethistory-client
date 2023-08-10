import '@/assets/style/globals.css'
import '@/assets/style/index.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { AppContextProvider } from '@/contexts/app.context'
import Providers from '@/utils/hoc/Providers'
config.autoAddCss = false

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>
        <AppContextProvider>
          <Providers>{children}</Providers>
        </AppContextProvider>
      </body>
    </html>
  )
}
