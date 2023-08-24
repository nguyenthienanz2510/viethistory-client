import React from 'react'
import ArticleCard from './components/ArticleCard'
import { Post } from '@/types/post.type'

type Props = {
  latestArticle: any
}

const LatestArticle = ({ latestArticle }: Props) => {
  return (
    <section className='py-12 md:py-16'>
      <div className='container space-y-10 md:space-y-20'>
        {latestArticle.map((article: Post) => {
          return <ArticleCard key={article.id} article={article} />
        })}
      </div>
    </section>
  )
}

export default LatestArticle
