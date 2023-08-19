import * as React from 'react'
import Link from 'next/link'

interface Props {
  menu: {
    name: string
    slug: string
  }[]
}

export const Navigation = ({ menu }: Props) => (
  <nav>
    <ul className='flex'>
      {menu.map((item) => (
        <li key={item.slug}>
          <Link className='ml-6 font-bold uppercase' href={item.slug}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
