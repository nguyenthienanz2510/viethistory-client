import { Post } from '@/types/post.type'
import Image from 'next/image'
import React from 'react'

type Props = {
  params: {
    slug: string
    locale: string
  }
}

export const revalidate = 60

async function getData(slug?: string) {
  try {
    const res = await fetch(`https://viethistory-api.cyclic.app/posts?slug=${slug}`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export async function generateStaticParams() {
  const res = await fetch('https://viethistory-api.cyclic.app/posts')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const allPosts = await res.json()

  const slugRoutes = allPosts.data.posts.map((post: Post) => {
    return post.slug
  })

  return slugRoutes.map((slug: string) => ({
    slug: slug
  }))
}

// export async function generateMetadata({ params: { slug } }: Props) {

//   const post: Post = await client.fetch(query, { slug })

//   if (post == null) {
//     return null
//   }

//   return {
//     openGraph: {
//       images: urlFor(post.mainImage).url()
//     },
//     title: `${post.title} | Nguyen Thien An's Daily Blog`,
//     description: post.description,
//     keywords: [`${post.title}`, `Nguyen Thien An's Daily Blog`, `Nguyen Thien An`, `An's Blog`, `An's Daily Blog`],
//     creator: post.author.name
//   }
// }

export default async function ArticleDetail({ params: { slug, locale } }: Props) {
  const data = await getData(slug)
  let articleDetail: Post = data.data.post
  console.log(data)
  if (locale !== 'en') {
    articleDetail = articleDetail.translations.vi
    console.log(articleDetail.translations)
  }
  return (
    <div className='container py-20'>
      <article>
        <h1 className='mb-5 text-32 font-bold'>{articleDetail.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
      </article>
    </div>
  )
}
