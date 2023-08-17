'use client'

import { motion, useCycle } from 'framer-motion'
import { MenuToggle } from './MenuToggle'
import { Navigation } from './Navigation'
import { useEffect, useState } from 'react'

export const MenuMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)

  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // useEffect(() => {
  //   setDimensions({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   })
  // }, [])

  let sidebar = {
    open: () => ({
      clipPath: `circle(2000px at ${
        typeof window !== 'undefined' && window.innerWidth < 420 ? window.innerWidth - 32 : 420 - 32
      }px 32px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: `circle(24px at ${
        typeof window !== 'undefined' && window.innerWidth < 420 ? window.innerWidth - 32 : 420 - 32
      }px 32px)`,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  }

  return (
    <motion.nav
      className='fixed bottom-0 right-0 top-0 block h-screen w-full max-w-[420px] overflow-hidden lg:hidden'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={2000}
    >
      <motion.div className='absolute bottom-0 right-0 top-0 w-full bg-color-white' variants={sidebar} />
      <Navigation />
      <MenuToggle
        toggle={() => {
          console.log('first')
          toggleOpen()
        }}
      />
    </motion.nav>
  )
}
