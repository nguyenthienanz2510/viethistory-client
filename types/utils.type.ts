export interface SuccessResponse<Data> {
  statusCode: number
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  statusCode: number
  message: string
  error?: string
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
