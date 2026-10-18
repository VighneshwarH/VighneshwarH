import localFont from 'next/font/local'

export const agency = localFont({
  src: '../../public/fonts/agency.otf',
  variable: '--font-agency',
  display: 'swap',
  weight: '400',
})

export const instrumentSans = localFont({
  src: [
    { path: '../../public/fonts/instrument-sans-400.ttf', weight: '400' },
    { path: '../../public/fonts/instrument-sans-500.ttf', weight: '500' },
    { path: '../../public/fonts/instrument-sans-600.ttf', weight: '600' },
    { path: '../../public/fonts/instrument-sans-700.ttf', weight: '700' },
  ],
  variable: '--font-instrument-sans',
  display: 'swap',
})

export const dmMono = localFont({
  src: [
    { path: '../../public/fonts/dm-mono-400.ttf', weight: '400' },
    { path: '../../public/fonts/dm-mono-500.ttf', weight: '500' },
  ],
  variable: '--font-dm-mono',
  display: 'swap',
})
