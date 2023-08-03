'use client'
import { faCircleUser, faPenToSquare, faGear, faGauge } from '@fortawesome/free-solid-svg-icons'

import NavItem from './NavItem'

function SideBar() {
  return (
    <div className='h-screen w-[260px] flex-shrink-0 bg-slate-800 px-2 text-color-text-primary'>
      <div className='py-5'>
        <span className='text-28 font-bold'>Viethistory</span>
      </div>
      <nav>
        <ul className='space-y-1'>
          <NavItem href='/dashboard' title='Dashboard' icon={faGauge} active />
          <NavItem href='/dashboard/posts' title='Posts' icon={faPenToSquare} />
          <NavItem href='/dashboard/users' title='Users' icon={faCircleUser} />
          <NavItem href='/dashboard/config' title='Config' icon={faGear} />
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
