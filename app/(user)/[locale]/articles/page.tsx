import { LatestArticle } from '@/components/user/Article'
import { Post } from '@/types/post.type'
import React from 'react'

type Props = {
  params: {
    locale: string
  }
}

async function getData() {
  const res = await fetch('https://viethistory-api.cyclic.app/posts')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Articles({ params }: Props) {
  const data = await getData()
  let latestArticle = data.data.posts

  if (params.locale === 'vi') {
    latestArticle = latestArticle.map((article: Post) => {
      if (!article.translations?.length) {
        return article
      } else {
        const translations = article.translations[0]
        const articleTranslation = {
          ...article,
          title: translations.title,
          description: translations.description,
          content: translations.content,
          meta_description: translations.meta_description,
          meta_title: translations.meta_title
        }
        return articleTranslation
      }
    })
  }

  return (
    <div>
      <LatestArticle latestArticle={latestArticle} />
    </div>
  )
}
