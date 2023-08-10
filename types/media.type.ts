import { User } from './user.type'

export interface Media {
  id: number
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
  created_at: Date
  updated_at: Date
  user_created_id: string
  user_updated_id: string
  user_created: User
  user_updated: User
}
