'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import React, { useState } from 'react'
import classNames from 'classnames'
import Link from 'next-intl/link'
import { useParams, usePathname, useRouter } from 'next/navigation'

type NavItemProps = {
  title: string
  icon: IconDefinition
  href?: string
  submenu?: Array<{ title: string; href: string }>
}

function NavItem({ title, icon, href, submenu }: NavItemProps) {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  return (
    <li>
      {submenu ? (
        <React.Fragment>
          <span
            className={classNames('nav-item', {
              active: pathname.includes(href as string)
            })}
            onClick={() => {
              setShow(!show)
            }}
          >
            <FontAwesomeIcon icon={icon} size='xl' />
            <span>{title}</span>
            <FontAwesomeIcon className='ml-auto' icon={show ? faAngleUp : faAngleDown} size='lg' />
          </span>
          <ul
            className={classNames('submenu', {
              show: show
            })}
          >
            {submenu.map((item) => {
              return (
                <li key={item.href}>
                  <Link
                    className={classNames('nav-item', {
                      active: item.href === pathname
                    })}
                    href={item.href}
                  >
                    <FontAwesomeIcon icon={faCircle} size='sm' />
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </React.Fragment>
      ) : (
        <Link
          className={classNames('nav-item', {
            active: href === pathname
          })}
          href={href || '#'}
        >
          <FontAwesomeIcon icon={icon} size='xl' />
          <span>{title}</span>
        </Link>
      )}
    </li>
  )
}

export default NavItem
