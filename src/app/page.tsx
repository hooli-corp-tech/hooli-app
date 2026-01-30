import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Redefining the Future of Technology
            </h1>
            <p className="mt-6 text-xl text-blue-100">
              Making the world a better place through innovative solutions that transform industries and enhance lives.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 transition"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-4 text-lg text-gray-600">
              At Hooli, we believe technology should empower everyone. Our mission is to create seamless,
              intelligent solutions that connect people, businesses, and ideas across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Solutions</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive technology solutions for every need</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Global Connectivity</h3>
              <p className="mt-2 text-gray-600">
                Connect your business to the world with our cutting-edge networking solutions and global infrastructure.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Data Analytics</h3>
              <p className="mt-2 text-gray-600">
                Transform raw data into actionable insights with our advanced analytics and machine learning platform.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Cybersecurity</h3>
              <p className="mt-2 text-gray-600">
                Protect your digital assets with enterprise-grade security solutions powered by AI threat detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">500+</div>
              <div className="mt-2 text-blue-100">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99.99%</div>
              <div className="mt-2 text-blue-100">Uptime SLA</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50M+</div>
              <div className="mt-2 text-blue-100">Users Worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold">180+</div>
              <div className="mt-2 text-blue-100">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            <p className="mt-4 text-lg text-gray-600">Stay updated with Hooli&apos;s innovations</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500">January 15, 2026</div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  Hooli Announces Quantum Computing Breakthrough
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Our research team achieves 1000-qubit milestone, setting new industry standards.
                </p>
              </div>
            </article>
            <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500">January 10, 2026</div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  Q4 2025 Results: 28% YoY Revenue Growth
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Strong performance across all business segments drives record quarterly results.
                </p>
              </div>
            </article>
            <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500">January 5, 2026</div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  Launching Hooli AI Assistant for Enterprise
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  New AI-powered assistant revolutionizes workplace productivity and collaboration.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Transform Your Business?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Join hundreds of companies already using Hooli to drive innovation and growth.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-100 transition"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
