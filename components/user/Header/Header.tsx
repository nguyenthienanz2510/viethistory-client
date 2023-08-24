'use client'

import Link from 'next-intl/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { MenuMobile } from './components/MenuMobile'
import { Navigation } from './components/Navigation'
import { LanguageChanger } from '@/components/common/LanguageChanger'

type Props = {}

function Header({}: Props) {
  const primaryMenu = [
    {
      name: 'Home',
      slug: '/'
    },
    {
      name: 'Articles',
      slug: 'articles'
    },
    {
      name: 'Contact',
      slug: 'contact'
    }
  ]

  return (
    <header className='sticky top-0 z-[1000] w-full flex-none border-b border-slate-800 bg-color-black/80 text-color-white backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b'>
      <div className='flex h-16 w-full items-center justify-between px-4 lg:container lg:h-20'>
        <div>
          <Link href={'/'}>
            <span className='text-24 font-bold md:text-28'>Viethistory</span>
          </Link>
        </div>
        <div className='hidden items-center lg:flex'>
          <Navigation menu={primaryMenu} />
          <div className='flex'>
            <div className='ml-7 h-7 w-[1px] bg-slate-800' />
            <LanguageChanger />
            <button className='ml-7 transition-all hover:text-color-primary'>
              <FontAwesomeIcon icon={faCircleUser} size='2xl' />
            </button>
          </div>
        </div>
        <MenuMobile menu={primaryMenu} />
      </div>
    </header>
  )
}

export default Header
