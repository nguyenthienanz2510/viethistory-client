'use client'

import { faLanguage, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useRouter } from 'next-intl/client'
import { usePathname } from 'next-intl/client'
import { useLocale } from 'next-intl'

const locales = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'vi',
    name: 'Vietnamese'
  }
]

export default function LanguageChanger() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const selectLanguageRef = useRef<HTMLUListElement>(null)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!selectLanguageRef.current?.contains(e.target as Node)) {
        setShowPopup(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const handleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale })
    toast(`Current language is ${newLocale === 'en' ? 'English' : 'Vietnamese'}`)
  }

  return (
    <div className='relative ml-7'>
      <button className='group flex h-full items-center' onClick={() => setShowPopup(!showPopup)}>
        <FontAwesomeIcon className='transition-all group-hover:text-color-primary' icon={faLanguage} size='xl' />
      </button>
      {showPopup && (
        <motion.ul
          className='absolute right-0 top-[140%] min-w-[160px] rounded border bg-white py-2 text-color-black transition-all'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={selectLanguageRef}
        >
          {locales.map((locale) => {
            return (
              <li key={locale.code}>
                <button
                  className={classNames(
                    'flex w-full items-center justify-between px-4 py-2 hover:bg-color-primary/10',
                    {
                      'bg-color-primary/10 font-bold text-color-primary': locale.code === currentLocale
                    }
                  )}
                  onClick={() => handleChange(locale.code)}
                >
                  {locale.name} {locale.code !== currentLocale && <FontAwesomeIcon icon={faAngleRight} size='1x' />}
                </button>
              </li>
            )
          })}
        </motion.ul>
      )}
    </div>
  )
}
