import { User } from './user.type'

export interface Post {
  id: string
  title: string
  slug: string
  description: string
  status: string
  thumb: string
  images: string
  content: string
  timestamp: string
  order: number
  meta_title: string
  meta_description: string
  meta_keywords: string
  created_at: string
  updated_at: string
  user_created_id: string
  user_updated_id: string
  user_created: User
  user_updated: User
}