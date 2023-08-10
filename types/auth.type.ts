import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  tokens: { accessToken: string; refreshToken: string }
}>
