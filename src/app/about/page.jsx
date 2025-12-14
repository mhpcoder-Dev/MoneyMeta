export const metadata = {
  title: 'About Us - MoneyMeta',
  description: 'Learn about MoneyMeta, your trusted source for government auction and surplus sale information.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-6">About MoneyMeta</h1>
        
        <div className="space-y-6 text-white/80">
          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-white/70 leading-relaxed">
              MoneyMeta is dedicated to providing easy access to government auctions and surplus sales from official sources across the United States and beyond. We aggregate publicly available auction data to help individuals and businesses discover valuable opportunities in government surplus property.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">What We Do</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We collect and organize information about active government auctions from various official sources, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>GSA Auctions (General Services Administration)</li>
              <li>Federal surplus property sales</li>
              <li>State and local government auctions</li>
              <li>Government vehicle auctions</li>
              <li>Real estate and land sales</li>
              <li>Equipment and machinery auctions</li>
            </ul>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              MoneyMeta uses official government APIs and open data feeds to aggregate auction information. We do not conduct auctions ourselves - we simply provide a convenient way to discover and access official government auction listings. All transactions are conducted directly through the respective government agencies.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment</h2>
            <p className="text-white/70 leading-relaxed">
              We are committed to providing accurate, up-to-date information from reliable government sources. Our platform is designed to be user-friendly, transparent, and helpful for anyone looking to participate in government auctions. We believe in making government surplus opportunities accessible to everyone.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-white/70 leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Visit our{' '}
              <a href="/contact" className="text-[#d4ff00] hover:underline">contact page</a> to get in touch with our team.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
