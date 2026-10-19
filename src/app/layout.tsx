import type { Metadata, Viewport } from 'next'
import NetworkStatus from '@/components/NetworkStatus'
import { withBasePath } from '@/lib/paths'
import { agency, dmMono, instrumentSans } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vighneshwar Hebbar | Portfolio',
  description: 'Portfolio of Vighneshwar Hebbar, full-stack developer and UI/UX designer.',
  icons: {
    icon: withBasePath('/images/favicon.ico'),
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#efeae0',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${agency.variable} ${instrumentSans.variable} ${dmMono.variable}`}
    >
      <body className='no-scrollbar'>
        {children}
        <NetworkStatus />
      </body>
    </html>
  )
}
