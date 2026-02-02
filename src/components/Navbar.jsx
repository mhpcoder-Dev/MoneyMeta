'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gavel, Clock, Sparkles, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'GOVERNMENT SALES AND AUCTIONS', icon: Gavel },
    // { path: '/future', label: 'FUTURE SALES', icon: Clock },
    // { path: '/announcements', label: 'ANNOUNCEMENTS FROM COMPANIES', icon: Sparkles },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-[#0a0e27] via-[#0d1235] to-[#0a0e27] border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={closeMobileMenu}>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text tracking-tight truncate">
              GoodsAroundTheWorld
            </h1>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-1.5 px-3 xl:px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#d4ff00] text-[#0a0e27] shadow-lg shadow-[#d4ff00]/20'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-[10px] xl:text-xs">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-2">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#d4ff00] text-[#0a0e27] shadow-lg shadow-[#d4ff00]/20'
                        : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}