import Link from 'next/link';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'connectivity',
      title: 'Global Connectivity',
      description: 'Connect your business to the world with our cutting-edge networking solutions.',
      features: [
        'High-speed global network infrastructure',
        'Low-latency connections worldwide',
        '99.99% uptime guarantee',
        'Dedicated support team',
      ],
      color: 'blue',
    },
    {
      id: 'analytics',
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights with our analytics platform.',
      features: [
        'Real-time data processing',
        'AI-powered insights',
        'Custom dashboards and reports',
        'Integration with existing tools',
      ],
      color: 'green',
    },
    {
      id: 'security',
      title: 'Cybersecurity',
      description: 'Protect your digital assets with enterprise-grade security solutions.',
      features: [
        'AI threat detection',
        '24/7 security monitoring',
        'Compliance management',
        'Incident response team',
      ],
      color: 'purple',
    },
    {
      id: 'cloud',
      title: 'Cloud Services',
      description: 'Scale your infrastructure with our reliable cloud platform.',
      features: [
        'Auto-scaling infrastructure',
        'Global data centers',
        'Pay-as-you-go pricing',
        'Managed Kubernetes',
      ],
      color: 'orange',
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; gradient: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-blue-400 to-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', gradient: 'from-green-400 to-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-purple-400 to-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', gradient: 'from-orange-400 to-orange-600' },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Our Solutions</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to help your business thrive in the digital age.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                id={solution.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
              >
                <div className={`flex-1 h-64 lg:h-80 w-full rounded-xl bg-gradient-to-br ${colorClasses[solution.color].gradient} flex items-center justify-center`}>
                  <svg className="w-24 h-24 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClasses[solution.color].bg} ${colorClasses[solution.color].text}`}>
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
                    className={`mt-8 inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition`}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Contact our team to discuss how Hooli can help transform your business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Contact Sales
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
