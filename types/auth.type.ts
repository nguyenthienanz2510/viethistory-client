import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  tokens: { access_token: string; refresh_token: string }
  profile: User
}>
