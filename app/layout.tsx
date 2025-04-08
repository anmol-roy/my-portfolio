import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'portfolio app',
  description: 'Created by anmol',
  generator: 'Anmol',
  applicationName: 'Portfolio',
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
