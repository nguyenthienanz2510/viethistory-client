import { globalString, siteConfig } from '@/constants'
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
    const res = await fetch(`${siteConfig.API_URL}/posts?slug=${slug}`)

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
  const res = await fetch(`${siteConfig.API_URL}/posts`)

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

export async function generateMetadata({ params: { slug, locale } }: Props) {
  const data = await getData(slug)
  let articleDetail: Post = data.data.post

  if (locale !== 'en') {
    articleDetail = articleDetail.translations.vi
  }

  if (articleDetail == null) {
    return null
  }

  return {
    openGraph: {
      images: articleDetail.thumb.url
    },
    title: `${articleDetail.title} | ${globalString.SITE_NAME}`,
    description: articleDetail.description,
    creator: articleDetail.user_created.first_name + ' ' + articleDetail.user_created.last_name
  }
}

export default async function ArticleDetail({ params: { slug, locale } }: Props) {
  const data = await getData(slug)
  let articleDetail: Post = data.data.post

  if (locale !== 'en') {
    articleDetail = articleDetail.translations.vi
  }

  return (
    <div className='container py-20'>
      <article>
        <section>
          <div className='relative rounded'>
            <div className='absolute top-0 -z-10 h-full w-full overflow-hidden rounded'>
              <div>
                <Image
                  className='object-cover object-center blur-sm'
                  alt={articleDetail.title}
                  title={articleDetail.title}
                  src={articleDetail.thumb.url}
                  fill
                />
              </div>
            </div>
            <div className='flex flex-col justify-between gap-5 rounded bg-color-primary bg-opacity-80 p-5 text-white md:text-16'>
              <div className='flex flex-col justify-between gap-5 md:flex-row'>
                <div className='space-y-2'>
                  <h3 className='text-24 font-bold md:text-36'>{articleDetail.title}</h3>
                  <p className='text-color-text-light-primary'>
                    {convertDateTimeIsoStringToCustomFormat(articleDetail.created_at)}
                  </p>
                </div>
                <div className='flex flex-shrink-0 items-start gap-2 pt-2'>
                  {articleDetail.user_created.avatar ? (
                    <Image
                      className='rounded-full object-cover object-center'
                      alt={articleDetail.user_created.first_name + ' ' + articleDetail.user_created.last_name}
                      title={articleDetail.user_created.first_name + ' ' + articleDetail.user_created.last_name}
                      src={articleDetail.user_created.avatar}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className='flex h-10 w-10 items-center justify-center rounded-full border'>
                      <FontAwesomeIcon icon={faUser} size='xl' />
                    </div>
                  )}
                  <p className='text-18 font-bold leading-[40px]'>
                    {articleDetail.user_created.first_name + ' ' + articleDetail.user_created.last_name}
                  </p>
                </div>
              </div>
              <div className='space-y-5'>
                <p className='italic' dangerouslySetInnerHTML={{ __html: articleDetail.description }} />
                <div className='flex w-full flex-wrap justify-end gap-2 text-12 leading-6 md:text-16 md:leading-8'>
                  {[1, 2, 3].map((category, index) => {
                    return (
                      <span
                        className='inline-block rounded border bg-color-secondary px-3 font-normal uppercase tracking-wide text-white md:px-4'
                        key={index}
                      >
                        Category Name
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='article-content' dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
      </article>
    </div>
  )
}
