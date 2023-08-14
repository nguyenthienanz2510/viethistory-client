'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })
NProgress.configure({ parent: 'body' })

export default function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    return () => {
      NProgress.start()
      NProgress.done()
    }
  }, [pathname, searchParams])

  return null
}
