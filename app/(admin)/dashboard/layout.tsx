import SideBar from '@/components/admin/Sidebar'
import type { Metadata } from 'next'
import { globalString } from '@/constants'

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
