import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Injective Agent',
  description: 'Injective Agent',
  icons: {
    icon: '/injective-logo-blue.png',
    shortcut: '/injective-logo-blue.png',
    apple: '/injective-logo-blue.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
