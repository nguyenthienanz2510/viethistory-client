'server-only'

import { createIntl } from '@formatjs/intl'
import { currentLocale } from 'next-i18n-router'
import { headers } from 'next/headers'

const getMessages = async (lang: string, namespace: string) => {
  const res = await fetch(
    `https://api.i18nexus.com/project_resources/translations/${lang}/${namespace}.json?api_key=${process.env.I18NEXUS_API_KEY}`,
    { next: { revalidate: process.env.NODE_ENV === 'production' ? false : 0 } }
  )

  return res.json()
}

export default async function useIntl(namespace: string) {
  const lang = currentLocale()

  return createIntl({
    locale: lang as string,
    messages: await getMessages(lang as string, namespace)
  })
}
