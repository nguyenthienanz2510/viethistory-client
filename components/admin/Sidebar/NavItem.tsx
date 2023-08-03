import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import React, { ReactNode } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

type NavItemProps = {
  title: string
  icon: IconDefinition
  href: string
  active?: boolean
}

function NavItem({ title, icon, active, href }: NavItemProps) {
  console.log(active)
  return (
    <li>
      <Link
        className={classNames('nav-item', {
          active: active
        })}
        href={href}
      >
        <FontAwesomeIcon icon={icon} size='xl' />
        <span>{title}</span>
      </Link>
    </li>
  )
}

export default NavItem
