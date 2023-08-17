'use client'

import { motion, useCycle } from 'framer-motion'
import { MenuToggle } from './MenuToggle'
import { NavigationMobile } from './NavigationMobile'

export const MenuMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const widthDevice = typeof window !== 'undefined' && window.innerWidth < 420 ? window.innerWidth - 32 : 420 - 32

  let sidebar = {
    open: () => ({
      clipPath: `circle(2000px at ${widthDevice}px 32px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: `circle(24px at ${widthDevice}px 32px)`,
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
      <NavigationMobile />
      <MenuToggle
        toggle={() => {
          console.log('first')
          toggleOpen()
        }}
      />
    </motion.nav>
  )
}
