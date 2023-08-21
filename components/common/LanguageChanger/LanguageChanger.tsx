'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from 'next-i18n-router/client'
import { faLanguage, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
const i18nConfig = require('@/i18nConfig.ts') // Update the path to your i18nConfig file

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
  const currentPathname = usePathname()
  const currentLocale = useCurrentLocale(i18nConfig)

  const popupRef = useRef<HTMLUListElement>(null)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!popupRef.current?.contains(e.target as Node)) {
        setShowPopup(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const handleChange = (newLocale: string) => {
    setShowPopup(!showPopup)
    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = '; expires=' + date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }
    locales.forEach((locale) => {
      locale.code === newLocale && toast(`Current language is ${locale.name}`)
    })
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
          ref={popupRef}
        >
          {locales.map((locale) => {
            return (
              <li key={locale.code}>
                <button
                  className={classNames(
                    'flex w-full items-center justify-between px-4 py-1 hover:bg-color-primary/10',
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
