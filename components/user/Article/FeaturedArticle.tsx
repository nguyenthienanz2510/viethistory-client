import React from 'react'
import FeaturedArticleCard from './components/FeaturedArticleCard'

type Props = {
  sectionClass?: string
}

const FeaturedArticle = ({ sectionClass = 'py-10' }: Props) => {
  const FeaturedArticle = [1, 2, 3]
  return (
    <section className={`${sectionClass} no-scrollbar overflow-x-scroll scroll-smooth`}>
      <div className='container flex gap-8 lg:gap-14'>
        {FeaturedArticle.map((article) => {
          return <FeaturedArticleCard key={article} />
        })}
      </div>
    </section>
  )
}

export default FeaturedArticle
