'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gavel, Clock, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: 'GOVERNMENT SALES AND AUCTIONS', icon: Gavel },
    { path: '/future', label: 'FUTURE SALES', icon: Clock },
    { path: '/announcements', label: 'ANNOUNCEMENTS FROM COMPANIES', icon: Sparkles },
  ]

  return (
    <nav className="bg-gradient-to-r from-[#0a0e27] via-[#0d1235] to-[#0a0e27] border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <h1 className="text-4xl font-bold gradient-text tracking-tight">
              moneymeta
            </h1>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#d4ff00] text-[#0a0e27] shadow-lg shadow-[#d4ff00]/20'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}