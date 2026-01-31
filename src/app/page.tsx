import Link from 'next/link';

const clientLogos = [
  { name: 'Raviga', color: 'from-red-500 to-red-700' },
  { name: 'Endframe', color: 'from-blue-500 to-blue-700' },
  { name: 'Bachmanity', color: 'from-green-500 to-green-700' },
  { name: 'Tres Commas', color: 'from-yellow-500 to-yellow-700' },
  { name: 'Breamhall', color: 'from-purple-500 to-purple-700' },
  { name: 'Pied Piper', color: 'from-teal-500 to-teal-700' },
  { name: 'Aviato', color: 'from-indigo-500 to-indigo-700' },
  { name: 'Sliceline', color: 'from-pink-500 to-pink-700' },
];

const testimonials = [
  {
    quote: "Hooli's enterprise solutions transformed our entire operation. We've seen a 340% increase in efficiency since migrating to their platform.",
    name: "Monica Hall",
    title: "CFO, Raviga Capital",
    rating: 5,
  },
  {
    quote: "The quantum computing capabilities are unlike anything else on the market. Hooli is truly leading the next wave of innovation.",
    name: "Peter Gregory",
    title: "Founder, Thiel Fellowship",
    rating: 5,
  },
  {
    quote: "We processed over 1 billion transactions last quarter with zero downtime. Hooli's infrastructure is simply unmatched.",
    name: "Laurie Bream",
    title: "Managing Partner, Breamhall",
    rating: 5,
  },
];

const stats = [
  { value: '12,000+', label: 'Enterprise Clients', trend: '+23%' },
  { value: '99.999%', label: 'Uptime SLA', trend: 'Industry Best' },
  { value: '250M+', label: 'Daily Active Users', trend: '+47%' },
  { value: '$47B', label: 'Market Cap', trend: '+18%' },
  { value: '15,000+', label: 'Employees Worldwide', trend: '+12%' },
  { value: '195', label: 'Countries Served', trend: 'Global' },
];

const pressLogos = ['TechCrunch', 'Bloomberg', 'WSJ', 'Forbes', 'Wired', 'Reuters'];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.3),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Trusted by Fortune 500 Companies Worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Making the World a Better Place
              <span className="block text-blue-200 mt-2">Through Technology</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl">
              Hooli delivers enterprise-grade AI, cloud infrastructure, and quantum computing solutions that power the world&apos;s most innovative companies.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-blue-700 bg-white hover:bg-blue-50 transition shadow-lg shadow-blue-900/20"
              >
                Explore Products
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-base font-semibold rounded-xl text-white hover:bg-white/10 transition"
              >
                Contact Sales
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                SOC 2 Type II Certified
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GDPR Compliant
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ISO 27001
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="overflow-hidden">
            <div className="logo-carousel animate-scroll-left">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 logo-grayscale"
                >
                  <div className={`w-32 h-12 bg-gradient-to-r ${logo.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{logo.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Vision</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Building Tomorrow&apos;s Technology Today
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              At Hooli, we believe technology should empower everyone. Founded in a Palo Alto garage in 1996,
              we&apos;ve grown into a global leader in AI, cloud computing, and enterprise solutions. Our mission
              is to create seamless, intelligent systems that connect people, businesses, and ideas across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Solutions</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Enterprise-Grade Technology</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive solutions powering the world&apos;s most innovative companies</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">HooliCloud</h3>
              <p className="mt-3 text-gray-600">
                Global cloud infrastructure with 99.999% uptime SLA and edge computing in 195 countries.
              </p>
              <Link href="/solutions" className="mt-4 inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                Learn more <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Hooli AI</h3>
              <p className="mt-3 text-gray-600">
                Enterprise AI platform with LLMs, computer vision, and predictive analytics at scale.
              </p>
              <Link href="/solutions" className="mt-4 inline-flex items-center text-green-600 font-medium hover:text-green-700">
                Learn more <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">HooliShield</h3>
              <p className="mt-3 text-gray-600">
                Zero-trust security with AI threat detection protecting $2T+ in daily transactions.
              </p>
              <Link href="/solutions" className="mt-4 inline-flex items-center text-purple-600 font-medium hover:text-purple-700">
                Learn more <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Hooli Quantum</h3>
              <p className="mt-3 text-gray-600">
                1000+ qubit quantum computers available on-demand for research and enterprise workloads.
              </p>
              <Link href="/solutions" className="mt-4 inline-flex items-center text-orange-600 font-medium hover:text-orange-700">
                Learn more <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">The Hooli Advantage</h2>
            <p className="mt-2 text-blue-200">Industry-leading metrics that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                <div className="mt-2 text-blue-200 text-sm">{stat.label}</div>
                <div className="mt-1 text-xs text-green-300 font-medium">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {pressLogos.map((press, index) => (
              <div key={index} className="text-2xl font-bold text-gray-300 hover:text-gray-500 transition">
                {press}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Newsroom</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">Latest Updates</h2>
            </div>
            <Link href="/news" className="hidden md:inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all news <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 relative">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Breaking
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500">January 28, 2026</div>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                  Hooli Achieves Quantum Supremacy with 1000-Qubit Processor
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Our research team achieves historic milestone, setting new industry standards for quantum computing.
                </p>
              </div>
            </article>
            <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Earnings
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500">January 22, 2026</div>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                  Q4 2025: Record Revenue of $47B, Up 28% YoY
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Strong performance across all segments drives unprecedented growth and shareholder value.
                </p>
              </div>
            </article>
            <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-600 relative">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Product
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500">January 15, 2026</div>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                  Introducing Hooli AI Assistant for Enterprise
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  New AI-powered assistant revolutionizes workplace productivity with advanced reasoning capabilities.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.2),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Transform Your Business?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Join 12,000+ companies already using Hooli to drive innovation, reduce costs, and accelerate growth.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-gray-900 bg-white hover:bg-gray-100 transition shadow-lg"
            >
              Start Free Trial
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-base font-semibold rounded-xl text-white hover:bg-white/10 transition"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">No credit card required. 14-day free trial.</p>
        </div>
      </section>
    </>
  );
}
