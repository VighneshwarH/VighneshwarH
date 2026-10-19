import { afterEach, describe, expect, it, vi } from 'vitest'

describe('withBasePath', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('prefixes root-relative assets for project-site deployments', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/portfolio/')
    vi.resetModules()
    const { withBasePath } = await import('./paths')

    expect(withBasePath('/images/portrait.png')).toBe('/portfolio/images/portrait.png')
    expect(withBasePath('./images/portrait.png')).toBe('/portfolio/images/portrait.png')
  })

  it('keeps root deployments at the site root', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '')
    vi.resetModules()
    const { withBasePath } = await import('./paths')

    expect(withBasePath('/assets/resume.pdf')).toBe('/assets/resume.pdf')
  })
})
