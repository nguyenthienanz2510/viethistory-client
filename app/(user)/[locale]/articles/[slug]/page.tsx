import { Post } from '@/types/post.type'
import Image from 'next/image'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export const revalidate = 60

async function getData() {
  const res = await fetch('https://viethistory-api.cyclic.app/posts')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function generateStaticParams() {
  const allPosts = await getData()

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

export default async function ArticleDetail({ params: { slug } }: Props) {
  //   if (post == null) {
  //     return null
  //   }

  console.log(slug)

  return <article>{slug}</article>
}
