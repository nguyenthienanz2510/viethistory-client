'use client'

export function isMobile() {
  const userAgent = navigator.userAgent
  return /Mobi|Android/i.test(userAgent)
}
