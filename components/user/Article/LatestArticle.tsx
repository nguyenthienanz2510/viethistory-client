import React from 'react'
import ArticleCard from './components/ArticleCard'

type Props = {}

const LatestArticle = (props: Props) => {
  const latestArticle = [1, 2, 3]
  return (
    <section className='py-16'>
      <div className='container space-y-20'>
        {latestArticle.map((article) => {
          return <ArticleCard key={article} />
        })}
      </div>
    </section>
  )
}

export default LatestArticle
