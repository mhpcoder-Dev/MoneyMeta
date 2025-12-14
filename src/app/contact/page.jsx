'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MessageSquare, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/60 text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-[#1a1f3a] border-0">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4ff00]/10 mb-4">
                <Mail className="h-6 w-6 text-[#d4ff00]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Email Us</h3>
              <p className="text-white/60 text-sm">support@moneymeta.app</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f3a] border-0">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4ff00]/10 mb-4">
                <MessageSquare className="h-6 w-6 text-[#d4ff00]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Support</h3>
              <p className="text-white/60 text-sm">Get help with using MoneyMeta</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f3a] border-0">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4ff00]/10 mb-4">
                <Send className="h-6 w-6 text-[#d4ff00]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Feedback</h3>
              <p className="text-white/60 text-sm">Share your suggestions</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1a1f3a] border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#0f1429] border-white/10 text-white placeholder:text-white/40"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#0f1429] border-white/10 text-white placeholder:text-white/40"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-[#0f1429] border-white/10 text-white placeholder:text-white/40"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-[#0f1429] border border-white/10 text-white placeholder:text-white/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4ff00] focus:border-[#d4ff00]"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#d4ff00] text-[#0a0e27] hover:bg-[#d4ff00]/90 font-bold py-6 text-lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>

              {submitted && (
                <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400">Thank you! Your message has been sent successfully.</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 bg-[#1a1f3a] rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">How do I participate in an auction?</h3>
              <p className="text-white/60 text-sm">
                Click on any auction listing to view details and follow the link to the official government auction site to participate.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Is MoneyMeta affiliated with the government?</h3>
              <p className="text-white/60 text-sm">
                No, we are an independent platform that aggregates publicly available government auction data for your convenience.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">How often is auction data updated?</h3>
              <p className="text-white/60 text-sm">
                We update our auction data regularly from official government sources to ensure you have access to the latest listings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
