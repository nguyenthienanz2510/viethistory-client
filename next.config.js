/** @type {import('next').NextConfig} */
const { i18nRewriter } = require('next-i18n-router')
const i18nConfig = require('./i18nConfig.ts')

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      afterFiles: i18nRewriter(i18nConfig)
    }
  },
  swcMinify: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
