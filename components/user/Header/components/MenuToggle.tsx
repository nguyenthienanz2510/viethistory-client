import * as React from 'react'
import { motion } from 'framer-motion'

const Path = (props: any) => (
  <motion.path fill='white' strokeWidth='3' stroke='hsl(0, 0%, 18%)' strokeLinecap='round' {...props} />
)

export const MenuToggle = ({ toggle }: any) => (
  <button
    onClick={toggle}
    className='absolute  right-0 top-0 flex h-16 w-16 cursor-pointer select-none items-center justify-center border-none outline-none'
  >
    <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-color-white'>
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <Path
          variants={{
            closed: { d: 'M 2 4 L 22 4' },
            open: { d: 'M 3 18 L 18.5 4' }
          }}
        />
        <Path
          d='M 2 10.923 L 22 10.923'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 17.846 L 22 17.846' },
            open: { d: 'M 3 4 L 18.5 17.846' }
          }}
        />
      </svg>
    </div>
  </button>
)
