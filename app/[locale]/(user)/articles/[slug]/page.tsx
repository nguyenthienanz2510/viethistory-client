import { globalString, siteConfig } from '@/constants'
import { Category } from '@/types/category.type'
import { Post } from '@/types/post.type'
import { convertDateTimeIsoStringToCustomFormat } from '@/utils/utils'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    const res = await fetch(`${siteConfig.API_URL}/categories?slug=${slug}`)

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
  const res = await fetch(`${siteConfig.API_URL}/categories`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const allCategories = await res.json()

  const slugRoutes = allCategories.data.categories.map((category: Category) => {
    return category.slug
  })

  return slugRoutes.map((slug: string) => ({
    slug: slug
  }))
}

export async function generateMetadata({ params: { slug, locale } }: Props) {
  const data = await getData(slug)
  let categoryDetail: Category = data.data.category

  if (locale !== 'en') {
    categoryDetail = categoryDetail.translations.vi
  }

  if (categoryDetail == null) {
    return null
  }

  return {
    openGraph: {
      images: categoryDetail.thumb.url
    },
    title: `${categoryDetail.name} | ${globalString.SITE_NAME}`,
    description: categoryDetail.description || categoryDetail.name
  }
}

export default async function ArticleDetail({ params: { slug, locale } }: Props) {
  const data = await getData(slug)
  let categoryDetail: Category = data.data.category

  if (locale !== 'en') {
    categoryDetail = categoryDetail.translations.vi
    console.log(categoryDetail.translations)
  }

  return (
    <div className='container py-20'>
      <section>
        <div className='relative w-full pt-[56.25%]'>
          <Image src={categoryDetail.thumb.url} alt={categoryDetail.name} title={categoryDetail.name} fill />
        </div>
        <h1 className='my-10 text-32 font-bold uppercase'>{categoryDetail.name}</h1>
      </section>
    </div>
  )
}
