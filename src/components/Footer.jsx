'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact', href: '/contact' },
    ],
    resources: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Advertise', href: '/advertise' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
    social: [
      { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
      { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
      { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
      { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    ]
  }

  return (
    <footer className="bg-[#0a0e27] border-t border-white/10 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold gradient-text mb-4">moneymeta</h2>
            <p className="text-white/60 text-sm mb-4">
              Discover active government auctions and surplus sales from official sources across the United States.
            </p>
            <p className="text-white/40 text-xs">
              Your trusted source for government surplus auctions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <p className="text-white/60 text-sm mb-4">
              Follow us for updates on the latest government auctions.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#d4ff00] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {currentYear}, MoneyMeta. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/disclaimer" className="text-white/60 hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs text-center">
            MoneyMeta aggregates publicly available government auction data. We are not affiliated with any government agency. 
            All auctions are conducted by their respective government entities. Please verify all information directly with the official sources.
          </p>
        </div>
      </div>
    </footer>
  )
}
