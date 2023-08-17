import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const variants = {
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

interface Props {
  item: {
    slug: string
    name: string
  }
}

export const MenuItem = ({ item }: Props) => {
  return (
    <motion.li variants={variants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link className='font-16 inline-block w-full px-5 py-2 uppercase text-color-black' href={item.slug}>
        {item.name}
      </Link>
    </motion.li>
  )
}
