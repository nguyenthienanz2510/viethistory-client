import { i18nRouter } from 'next-i18n-router'
const i18nConfig = require('./i18nConfig.ts')

export function middleware(request: any) {
  return i18nRouter(request, i18nConfig)
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
}
