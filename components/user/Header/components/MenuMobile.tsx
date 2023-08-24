'use client'

import { motion, useCycle } from 'framer-motion'
import { MenuToggle } from './MenuToggle'
import { NavigationMobile } from './NavigationMobile'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

interface Props {
  menu: {
    name: string
    slug: string
  }[]
}

export const MenuMobile = ({ menu }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const [isClosing, setIsClosing] = useState(false)
  const widthDevice = typeof window !== 'undefined' && window.innerWidth < 420 ? window.innerWidth - 32 : 420 - 32

  let sidebar = {
    open: () => ({
      clipPath: `circle(${typeof window !== 'undefined' && window.innerHeight * 2}px at ${widthDevice}px 32px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: `circle(0px at ${widthDevice}px 32px)`,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsClosing(true)
      }, 700)
    } else {
      setIsClosing(false)
    }
    return () => {
      clearTimeout
    }
  }, [isOpen])

  const closeMenu = () => {
    toggleOpen()
    setIsClosing(true)
  }

  return (
    <motion.div
      className='lg:hidden'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={typeof window !== 'undefined' && window.innerHeight}
    >
      <div
        className={classNames(
          'fixed bottom-0 right-0 top-0 h-screen w-full max-w-[420px] overflow-hidden transition-all',
          { hidden: isClosing, show: isOpen }
        )}
      >
        <motion.div className='absolute bottom-0 right-0 top-0 w-full bg-color-white' variants={sidebar} />
        <NavigationMobile menu={menu} closeMenu={closeMenu} />
      </div>
      <MenuToggle
        toggle={() => {
          toggleOpen()
        }}
      />
    </motion.div>
  )
}
