import Link from 'next/link';
import Image from 'next/image';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'connectivity',
      title: 'Global Connectivity',
      description: 'Connect your business to the world with our cutting-edge networking solutions and global infrastructure spanning 195 countries.',
      features: [
        'High-speed global network infrastructure',
        'Low-latency connections worldwide',
        '99.999% uptime guarantee',
        'Dedicated support team',
      ],
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    },
    {
      id: 'analytics',
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights with our AI-powered analytics platform used by Fortune 500 companies.',
      features: [
        'Real-time data processing',
        'AI-powered insights',
        'Custom dashboards and reports',
        'Integration with existing tools',
      ],
      color: 'green',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      id: 'security',
      title: 'Cybersecurity',
      description: 'Protect your digital assets with enterprise-grade security solutions that safeguard $2T+ in daily transactions.',
      features: [
        'AI threat detection',
        '24/7 security monitoring',
        'Compliance management',
        'Incident response team',
      ],
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    },
    {
      id: 'cloud',
      title: 'Cloud Services',
      description: 'Scale your infrastructure with our reliable cloud platform powering millions of applications worldwide.',
      features: [
        'Auto-scaling infrastructure',
        'Global data centers',
        'Pay-as-you-go pricing',
        'Managed Kubernetes',
      ],
      color: 'orange',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
  };

  const industries = [
    { name: 'Financial Services', icon: 'bank', count: '2,500+' },
    { name: 'Healthcare', icon: 'health', count: '1,800+' },
    { name: 'Retail', icon: 'shop', count: '3,200+' },
    { name: 'Manufacturing', icon: 'factory', count: '1,400+' },
    { name: 'Government', icon: 'building', count: '800+' },
    { name: 'Education', icon: 'academic', count: '2,100+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium text-blue-300 mb-6">
            Enterprise Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Technology That Transforms</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive enterprise solutions designed to help your business thrive in the digital age.
            Trusted by 12,000+ organizations worldwide.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Schedule a Demo
            </Link>
            <Link
              href="#solutions"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Our Solutions</h2>
          </div>
          <div className="space-y-20">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                id={solution.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
              >
                <div className="flex-1 w-full">
                  <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${colorClasses[solution.color].bg} ${colorClasses[solution.color].text}`}>
                    Solution
                  </div>
                  <h2 className="mt-4 text-3xl font-bold text-gray-900">{solution.title}</h2>
                  <p className="mt-4 text-lg text-gray-600">{solution.description}</p>
                  <ul className="mt-6 space-y-3">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <svg className={`w-5 h-5 mr-3 ${colorClasses[solution.color].text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition"
                  >
                    Learn More
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Industries</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Trusted Across Industries</h2>
            <p className="mt-4 text-lg text-gray-600">Serving organizations in every major sector</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry) => (
              <div key={industry.name} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  {industry.icon === 'bank' && (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  )}
                  {industry.icon === 'health' && (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {industry.icon === 'shop' && (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )}
                  {industry.icon === 'factory' && (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {industry.icon === 'building' && (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  )}
                  {industry.icon === 'academic' && (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{industry.name}</h3>
                <p className="mt-1 text-sm text-blue-600 font-medium">{industry.count} clients</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Customer Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-5xl font-bold text-blue-600">73%</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">Reduction in Fraud</div>
              <p className="mt-3 text-gray-600">
                A leading financial institution reduced fraudulent transactions by 73% using HooliShield.
              </p>
              <div className="mt-4 text-sm text-gray-500">Financial Services</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-5xl font-bold text-green-600">340%</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">Efficiency Increase</div>
              <p className="mt-3 text-gray-600">
                Healthcare provider streamlined operations and improved patient care delivery times.
              </p>
              <div className="mt-4 text-sm text-gray-500">Healthcare</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-5xl font-bold text-purple-600">1M+</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">Transactions/Second</div>
              <p className="mt-3 text-gray-600">
                Global retail giant processes over 1 million transactions per second with zero downtime.
              </p>
              <div className="mt-4 text-sm text-gray-500">Retail</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Contact our team to discuss how Hooli can help transform your business with enterprise-grade solutions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              Contact Sales
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
