import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unbagged Tracker - Ocean Cleanup Impact',
  description: 'Track the impact of unbagged token on ocean cleanup. For every 1 SOL in fees, 3.3k bags are removed from the ocean.',
  other: {
    'wallet-extension': 'disabled',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="wallet-extension" content="disabled" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 