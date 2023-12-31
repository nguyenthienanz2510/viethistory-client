import { Media } from './media.type'
import { User } from './user.type'

export interface Post {
  id: number
  title: string
  slug: string
  description: string
  status: string
  thumb_id: string
  thumb: Media
  images: string
  content: string
  timestamp: string
  order: number
  is_featured: boolean
  meta_title: string
  meta_description: string
  created_at: string
  updated_at: string
  user_created_id: string
  user_updated_id: string
  user_created: User
  user_updated: User
  translations: PostTranslations
}

interface PostTranslations {
  vi: Post
}
