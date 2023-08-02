import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

type Props = {}

function Header({}: Props) {
  return (
    <header className='border-b border-slate-800 supports-backdrop-blur:bg-white/60 z-100 sticky top-0 w-full flex-none border-slate-50/[0.06] bg-transparent text-color-white backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b'>
      <div className='container flex h-16 items-center justify-between'>
        <div>
          <Link href={'/'}>
            <span className='text-28 font-bold'>Viethistory</span>
          </Link>
        </div>
        <div className='flex items-center'>
          <nav>
            <ul className='flex'>
              <li className='ml-6'>
                <Link href={'/'}>Home</Link>
              </li>
              <li className='ml-6'>
                <Link href={'/articles'}>Articles</Link>
              </li>
              <li className='ml-6'>
                <Link href={'/resume'}>Resume</Link>
              </li>
            </ul>
          </nav>
          <div className='flex'>
            <div className='ml-7 h-7 w-[1px] bg-slate-800' />
            <button className='ml-7 transition-all hover:text-color-primary'>
              <FontAwesomeIcon icon={faCircleUser} width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
