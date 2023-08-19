import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  menu: {
    name: string
    slug: string
  }[]
}

const ulVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    x: 500,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    }
  }
}

const liVariants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
  closed: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  }
}

export const NavigationMobile = ({ menu }: Props) => (
  <motion.ul className='absolute bottom-0 left-0 right-0 top-0 pt-16' variants={ulVariants}>
    {menu.map((item) => (
      <motion.li key={item.slug} variants={liVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link className='font-16 inline-block w-full px-5 py-2 uppercase text-color-black' href={item.slug}>
          {item.name}
        </Link>
      </motion.li>
    ))}
  </motion.ul>
)
