import React from 'react'
import ArticleCard from './components/ArticleCard'
import { Post } from '@/types/post.type'

type Props = {
  latestArticle: Post[]
  locale: string
}

const LatestArticle = ({ latestArticle, locale }: Props) => {
  return (
    <section className='py-12 md:py-16'>
      <div className='space-y-10 md:space-y-20'>
        {latestArticle.map((article: Post) => {
          if (locale !== 'en') {
            article = article.translations.vi
          }
          return <ArticleCard key={article.id} article={article} />
        })}
      </div>
    </section>
  )
}

export default LatestArticle
