import { User } from './user.type'

export interface Media {
  id: string
  public_id: string
  filename: string
  resource_type: string
  format: string
  size: number
  width: number
  height: number
  url: string
  url_cdn: string | null
  title: string | null
  alt: string | null
  description: string | null
  status: string
  created_at: string
  updated_at: string
  user_created_id: string
  user_updated_id: string
  user_created: User
  user_updated: User
}
