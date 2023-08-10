import SideBar from '@/components/admin/Sidebar'
import type { Metadata } from 'next'
import { globalString } from '@/constants'

export const metadata: Metadata = {
  title: `Dashboard - ${globalString.SITE_NAME}`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='admin-template'>
      <SideBar />
      <main className='ml-[260px] h-[2000px]'>
        <div className='px-7 pb-10 pt-5'>{children}</div>
      </main>
    </div>
  )
}
