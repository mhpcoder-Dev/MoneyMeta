export const metadata = {
  title: 'Disclaimer - MoneyMeta',
  description: 'Important disclaimers and information about using MoneyMeta.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-6">Disclaimer</h1>
        
        <div className="space-y-6 text-white/80">
          <p className="text-white/60 text-sm">Last Updated: December 14, 2025</p>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">General Information</h2>
            <p className="text-white/70 leading-relaxed">
              The information provided by MoneyMeta ("we," "us," or "our") on moneymeta.app (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">No Professional Relationship</h2>
            <p className="text-white/70 leading-relaxed">
              MoneyMeta is an information aggregation platform and is not affiliated with, endorsed by, or connected to any government agency. We do not conduct auctions, process bids, or handle any transactions. All auction activities are conducted directly through the respective government agencies.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Auction Information Accuracy</h2>
            <p className="text-white/70 leading-relaxed mb-3">
              While we strive to provide accurate and up-to-date information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Auction listings are sourced from public government databases and may change without notice</li>
              <li>We are not responsible for errors or omissions in the auction data</li>
              <li>Bid amounts, dates, and other details should always be verified directly with the official government source</li>
              <li>We do not guarantee the availability or status of any listed item</li>
            </ul>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">External Links</h2>
            <p className="text-white/70 leading-relaxed">
              The Site contains links to external websites operated by government agencies and other third parties. We have no control over the content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Financial Decisions</h2>
            <p className="text-white/70 leading-relaxed">
              MoneyMeta does not provide financial, investment, or legal advice. Any decisions you make regarding participation in government auctions are your sole responsibility. You should conduct your own due diligence and consult with appropriate professionals before making any financial commitments.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">User Responsibility</h2>
            <p className="text-white/70 leading-relaxed mb-3">
              Users of MoneyMeta are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Verifying all auction information with official government sources</li>
              <li>Understanding the terms and conditions of each auction</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Conducting appropriate inspections and due diligence before bidding</li>
              <li>Understanding payment terms, pickup requirements, and other auction conditions</li>
            </ul>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">No Warranties</h2>
            <p className="text-white/70 leading-relaxed">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the Site or reliance on any information provided on the Site. Your use of the Site and your reliance on any information on the Site is solely at your own risk.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Changes and Updates</h2>
            <p className="text-white/70 leading-relaxed">
              We reserve the right to modify this disclaimer at any time without notice. It is your responsibility to review this disclaimer periodically for changes. Your continued use of the Site following the posting of changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <p className="text-white/70 leading-relaxed">
              If you have any questions about this disclaimer, please contact us through our{' '}
              <a href="/contact" className="text-[#d4ff00] hover:underline">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
