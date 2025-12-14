'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gavel, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: 'Active Listings' },
    { path: '/future', label: 'Future Items' },
  ]

  return (
    <nav className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-navy rounded-lg group-hover:bg-navy-light transition-colors">
              <Gavel className="h-5 w-5 text-navy-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Moneymeta</h1>
              <p className="text-xs text-muted-foreground">Government Auction Aggregator</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={pathname === item.path ? 'default' : 'ghost'}
                  size="sm"
                  className={pathname === item.path ? 'bg-navy hover:bg-navy-light text-navy-foreground' : ''}
                  asChild
                >
                  <Link href={item.path}>{item.label}</Link>
                </Button>
              ))}
            </div>

            <Badge 
              variant="outline" 
              className="border-navy text-navy bg-navy/5 text-xs"
            >
              Beta
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  )
}