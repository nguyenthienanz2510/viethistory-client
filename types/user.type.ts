export interface User {
  id: string
  email: string
  username: string
  phone_number: string | null
  role: string
  status: string
  first_name: string | null
  last_name: string | null
  avatar: string | null
  created_at: Date
  updated_at: Date
}
