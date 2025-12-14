export const metadata = {
  title: 'Terms of Service - MoneyMeta',
  description: 'MoneyMeta Terms of Service - Read our terms and conditions for using our platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
        
        <div className="space-y-6 text-white/80">
          <p className="text-white/60 text-sm">Last Updated: December 14, 2025</p>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              By accessing and using MoneyMeta ("Service," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Description of Service</h2>
            <p className="text-white/70 leading-relaxed">
              MoneyMeta is an information aggregation platform that provides access to publicly available government auction and surplus sale data. We collect information from official government sources and present it in an organized, searchable format. We do not conduct auctions ourselves and are not affiliated with any government agency.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Use of Service</h2>
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Permitted Use</h3>
            <p className="text-white/70 leading-relaxed mb-3">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to interfere with or disrupt the Service</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Reproduce, duplicate, or copy any part of the Service for commercial purposes</li>
              <li>Transmit any viruses, malware, or harmful code</li>
            </ul>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
            <p className="text-white/70 leading-relaxed">
              The Service and its original content, features, and functionality are owned by MoneyMeta and are protected by international copyright, trademark, and other intellectual property laws. Government auction data displayed on the Service is sourced from public government databases and remains the property of their respective government agencies.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Links and Services</h2>
            <p className="text-white/70 leading-relaxed">
              Our Service may contain links to third-party websites, including official government auction sites. We are not responsible for the content, privacy policies, or practices of any third-party sites. We strongly advise you to review the terms and privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Disclaimer of Warranties</h2>
            <p className="text-white/70 leading-relaxed mb-3">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. MoneyMeta makes no warranties, expressed or implied, regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>The accuracy, completeness, or timeliness of auction information</li>
              <li>The availability or uninterrupted access to the Service</li>
              <li>The results that may be obtained from using the Service</li>
              <li>The merchantability or fitness for a particular purpose</li>
            </ul>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p className="text-white/70 leading-relaxed">
              In no event shall MoneyMeta, its directors, employees, partners, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Indemnification</h2>
            <p className="text-white/70 leading-relaxed">
              You agree to indemnify and hold harmless MoneyMeta and its affiliates from any claims, damages, losses, liabilities, and expenses arising out of your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page. Your continued use of the Service after such modifications constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
            <p className="text-white/70 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-white/70 leading-relaxed">
              If you have any questions about these Terms, please contact us through our{' '}
              <a href="/contact" className="text-[#d4ff00] hover:underline">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
