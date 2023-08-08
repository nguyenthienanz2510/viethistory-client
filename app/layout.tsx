import '@/assets/style/globals.css'
import '@/assets/style/index.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Providers from './Providers'
import { SessionProvider } from 'next-auth/react'
// import { SessionProvider } from 'next-auth/react'
config.autoAddCss = false

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  // return <SessionProvider session={session}>{children}</SessionProvider>
  return <Providers>{children}</Providers>
}
