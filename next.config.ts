import type { NextConfig } from 'next'

function getBasePath() {
  const configuredPath = process.env.NEXT_PUBLIC_BASE_PATH?.trim()

  if (!configuredPath) return ''

  if (!configuredPath.startsWith('/') || configuredPath.includes('?') || configuredPath.includes('#')) {
    throw new Error('NEXT_PUBLIC_BASE_PATH must be an absolute path without a query string or fragment.')
  }

  return configuredPath.replace(/\/+$/, '')
}

const nextConfig: NextConfig = {
  basePath: getBasePath(),
  images: {
    unoptimized: true,
  },
  output: 'export',
  poweredByHeader: false,
  trailingSlash: true,
}

export default nextConfig
