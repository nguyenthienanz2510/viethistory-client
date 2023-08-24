'use client'

import { useTranslations } from 'next-intl'

export default function ExampleClientComponent() {
  const t = useTranslations('common')
  return (
    <div>
      <h2>Welcome to Viethistory</h2>
      <h2>{t('Welcome to Viethistory')}</h2>
    </div>
  )
}
