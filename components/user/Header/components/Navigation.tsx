'use client'

import * as React from 'react'
import Link from 'next-intl/link'
import { useTranslations } from 'next-intl'

interface Props {
  menu: {
    name: string
    slug: string
  }[]
}

export const Navigation = ({ menu }: Props) => {
  const t = useTranslations('common')

  return (
    <nav>
      <ul className='flex'>
        {menu.map((item) => (
          <li key={item.slug}>
            <Link className='ml-6 font-bold uppercase' href={item.slug}>
              {t(item.name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
