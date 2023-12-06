import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desafio Play For a Cause',
  description: 'Chat em tempo real.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <Providers>
        <body className="body-font font-inter">{children}</body>
      </Providers>
    </html>
  )
}
