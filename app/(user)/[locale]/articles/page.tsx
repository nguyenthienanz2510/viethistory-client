import ExampleClientComponent from '@/components/ExampleClientComponent'
import Link from 'next-intl/link'
import React from 'react'

type Props = {}

export default function Articles({}: Props) {
  return (
    <div>
      <ExampleClientComponent />
      <Link href={'/dashboard'} locale='en'>
        Dashboard
      </Link>
    </div>
  )
}
