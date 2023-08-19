import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { MenuMobile } from './components/MenuMobile'

type Props = {}

function Header({}: Props) {
  return (
    <header className='sticky top-0 z-[1000] w-full flex-none border-b border-slate-800 bg-color-black/80 text-color-white backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b'>
      <div className='flex h-16 w-full items-center justify-between px-4 lg:container lg:h-20'>
        <div>
          <Link href={'/'}>
            <span className='text-24 font-bold md:text-28'>Viethistory</span>
          </Link>
        </div>
        <div className='hidden items-center lg:flex'>
          <nav>
            <ul className='flex'>
              <li className='ml-6 font-bold uppercase'>
                <Link href={'/'}>Home</Link>
              </li>
              <li className='ml-6 font-bold uppercase'>
                <Link href={'/articles'}>Articles</Link>
              </li>
              <li className='ml-6 font-bold uppercase'>
                <Link href={'/resume'}>Resume</Link>
              </li>
            </ul>
          </nav>
          <div className='flex'>
            <div className='ml-7 h-7 w-[1px] bg-slate-800' />
            <button className='ml-7 transition-all hover:text-color-primary'>
              <FontAwesomeIcon icon={faCircleUser} size='2xl' />
            </button>
          </div>
        </div>
        <MenuMobile />
      </div>
    </header>
  )
}

export default Header
