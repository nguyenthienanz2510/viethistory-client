import '@/assets/style/globals.css'
import '@/assets/style/index.scss'
import SideBar from '@/components/admin/Sidebar'
import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { globalString } from '@/constants'
config.autoAddCss = false

export const metadata: Metadata = {
  title: `Dashboard - ${globalString.SITE_NAME}`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='admin-template'>
        <div>
          <SideBar />
          <main className='ml-[260px] h-[2000px]'>
            <div className='px-7 pb-10 pt-5'>{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
