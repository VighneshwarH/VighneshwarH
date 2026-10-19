const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, '') ?? ''

export function withBasePath(path: string) {
  const normalizedPath = path.replace(/^(?:\.\/)+/, '')
  return `${basePath}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`
}
