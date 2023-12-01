import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({weight: '500', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHub Profile by HedgeCode',
  description: 'Github profile finder. Application made in NextJS 14 to communicate with several GitHub API endpoints.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className}>{children}</body>
    </html>
  )
}
