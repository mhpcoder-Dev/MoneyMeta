import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://moneymeta.app'),
  title: 'MoneyMeta - Government Auctions & Surplus Sales',
  description: 'Find active government auctions and surplus sales from official sources across the US, UK, Canada and more.',
  keywords: 'government auctions, surplus sales, GSA auctions, public auctions, government surplus, federal auctions',
  authors: [{ name: 'MoneyMeta' }],
  creator: 'MoneyMeta',
  publisher: 'MoneyMeta',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1 1%22></svg>',
  },
  openGraph: {
    title: 'MoneyMeta - Government Auctions & Surplus Sales',
    description: 'Find active government auctions and surplus sales from official sources.',
    type: 'website',
    siteName: 'MoneyMeta',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyMeta - Government Auctions & Surplus Sales',
    description: 'Find active government auctions and surplus sales from official sources.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}