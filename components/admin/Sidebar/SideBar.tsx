'use client'
import { faCircleUser, faPenToSquare, faGear, faGauge, faImage } from '@fortawesome/free-solid-svg-icons'

import NavItem from './NavItem'

function SideBar() {
  return (
    <div className='sidebar fixed bottom-0 left-0 top-0 h-screen w-[260px] flex-shrink-0 bg-slate-800 text-color-text-primary'>
      <div className='px-2 py-5'>
        <span className='text-28 font-bold'>Viethistory</span>
      </div>
      <nav className='custom-scrollbar h-full overflow-y-auto px-2'>
        <ul className='space-y-1'>
          <NavItem href='/dashboard' title='Dashboard' icon={faGauge} />
          <NavItem
            title='Posts'
            icon={faPenToSquare}
            submenu={[
              { href: '/dashboard/posts/create', title: 'Add New' },
              { href: '/dashboard/posts', title: 'List' }
            ]}
          />
          <NavItem
            title='Media'
            icon={faImage}
            submenu={[
              { href: '/dashboard/media/create', title: 'Upload' },
              { href: '/dashboard/media', title: 'Media Library' }
            ]}
          />
          <NavItem href='/dashboard/users' title='Users' icon={faCircleUser} />
          <NavItem href='/dashboard/config' title='Config' icon={faGear} />
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
