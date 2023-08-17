import * as React from 'react'
import { motion } from 'framer-motion'
import { MenuItem } from './MenuItem'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const primaryMenu = [
  {
    name: 'Home',
    slug: '/'
  },
  {
    name: 'Article',
    slug: 'article'
  },
  {
    name: 'About',
    slug: 'about'
  }
]

export const Navigation = () => (
  <motion.ul className='absolute bottom-0 left-0 right-0 top-0 pt-16' variants={variants}>
    {primaryMenu.map((item) => (
      <MenuItem item={item} key={item.slug} />
    ))}
  </motion.ul>
)
