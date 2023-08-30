import { Media } from './media.type'
import { User } from './user.type'

export interface Category {
  id: number
  parent_id: number
  name: string
  slug: string
  description: string
  status: string
  thumb_id: string
  thumb: Media
  is_featured: boolean
  images: string
  order: number
  meta_title: string
  meta_description: string
  created_at: string
  updated_at: string
  user_created_id: string
  user_updated_id: string
  user_created: User
  user_updated: User
  translations: CategoryTranslations
}

interface CategoryTranslations {
  vi: Category
}
