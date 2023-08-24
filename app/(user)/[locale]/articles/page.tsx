import { LatestArticle } from '@/components/user/Article'
import { Post } from '@/types/post.type'
import React from 'react'

type Props = {
  params: {
    locale: string
  }
}

async function getData() {
  try {
    const res = await fetch('https://viethistory-api.cyclic.app/posts')

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default async function Articles({ params }: Props) {
  const { locale } = params
  const data = await getData()
  let latestArticle = data.data.posts

  return (
    <div>
      <LatestArticle locale={locale} latestArticle={latestArticle} />
    </div>
  )
}
