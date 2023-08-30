import { globalString, siteConfig } from '@/constants'
import { Category } from '@/types/category.type'
import Link from 'next-intl/link'
import Image from 'next/image'

interface Props {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export async function generateMetadata() {
  return {
    title: `Articles - ${globalString.SITE_NAME}`,
    description: 'Embark on a journey to uncover the stories of history with us'
  }
}

async function getData() {
  try {
    const res = await fetch(`${siteConfig.API_URL}/categories`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default async function AdminLayout({ children, params: { locale } }: Props) {
  const data = await getData()
  let categories = data.data.categories
  return (
    <div className='container flex'>
      <div className='flex-1 pr-[60px]'>{children}</div>
      <div>
        <ul className='space-y-6 border-l border-slate-800 py-16 pl-[60px] md:min-w-[300px]'>
          {categories.map((category: Category) => {
            if (locale !== 'en') {
              category = category.translations.vi
            }
            return (
              <li key={category.slug} className='category-card'>
                <Link href={`/articles/${category.slug}`} className='group block'>
                  <div className='relative h-[90px] w-full overflow-hidden'>
                    <Image
                      src={category.thumb.url}
                      alt={category.name}
                      fill
                      className='object-cover transition-all group-hover:scale-105'
                    />
                    <div className='absolute bottom-0 left-0 right-0 top-0 bg-black/30 p-3 pr-[50px] font-bold uppercase italic'>
                      <p className='transition-all group-hover:translate-x-2'>{category.name}</p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
