import useIntl from '@/app/intl'
import ExampleClientComponent from '@/components/ExampleClientComponent'
import React from 'react'
import ServerIntlProvider from '@/components/ServerIntlProvider'

type Props = {}

export default async function Articles({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = await useIntl('common')

  return (
    <div>
      <h1>{intl.formatMessage({ id: 'Home' })}</h1>
      <h1>{intl.formatMessage({ id: 'Welcome to Viethistory' })}</h1>
      <ServerIntlProvider messages={intl.messages} locale={intl.locale}>
        <ExampleClientComponent />
      </ServerIntlProvider>
    </div>
  )
}
