export const metadata = {
  title: 'Privacy Policy - MoneyMeta',
  description: 'MoneyMeta Privacy Policy - Learn how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-white/80">
          <p className="text-white/60 text-sm">Last Updated: December 14, 2025</p>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="text-white/70 leading-relaxed">
              MoneyMeta ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website moneymeta.app.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Automatically Collected Information</h3>
            <p className="text-white/70 leading-relaxed mb-3">
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Log data (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, clickstream data)</li>
              <li>Device information (device type, unique device identifiers)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Information You Provide</h3>
            <p className="text-white/70 leading-relaxed">
              We may collect information you voluntarily provide when you contact us, subscribe to newsletters, or interact with our services.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <p className="text-white/70 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new features and functionality</li>
              <li>Communicate with you for customer service and support</li>
              <li>Send you updates and marketing communications (with your consent)</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
            </ul>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-white/70 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p className="text-white/70 leading-relaxed mb-3">
              We may use third-party services such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Google Analytics for website analytics</li>
              <li>Google AdSense for advertising</li>
              <li>Government APIs for auction data</li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-3">
              These third parties have their own privacy policies addressing how they use such information.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p className="text-white/70 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p className="text-white/70 leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable cookies in your browser settings</li>
            </ul>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
            <p className="text-white/70 leading-relaxed">
              Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
            <p className="text-white/70 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="bg-[#1a1f3a] rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-white/70 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us through our{' '}
              <a href="/contact" className="text-[#d4ff00] hover:underline">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
