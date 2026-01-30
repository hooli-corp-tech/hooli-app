import Link from 'next/link';

export default function AboutPage() {
  const leadership = [
    { name: 'Gavin Belson', role: 'Chief Executive Officer', bio: 'Visionary leader with 20+ years in tech innovation.' },
    { name: 'Jack Barker', role: 'Chief Operating Officer', bio: 'Operations expert driving global efficiency.' },
    { name: 'Davis Bannerchek', role: 'Chief Technology Officer', bio: 'Engineering mastermind behind our core platform.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">About Hooli</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re on a mission to make the world a better place through cutting-edge technology
            and innovative solutions that transform industries.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Founded in 1997, Hooli started as a small startup with a big vision. Today, we&apos;re a global
              technology leader serving millions of users and thousands of enterprises worldwide.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Our journey has been defined by innovation, integrity, and an unwavering commitment to
              our customers. From cloud computing to artificial intelligence, we continue to push
              the boundaries of what&apos;s possible.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Values</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Innovation</h3>
              <p className="mt-2 text-gray-600">Constantly pushing boundaries to create revolutionary solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Trust</h3>
              <p className="mt-2 text-gray-600">Building lasting relationships through transparency and reliability.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Community</h3>
              <p className="mt-2 text-gray-600">Empowering people and organizations to achieve their full potential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Leadership Team</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((person) => (
              <div key={person.name} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto"></div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{person.name}</h3>
                <p className="text-blue-600">{person.role}</p>
                <p className="mt-2 text-gray-600 text-sm">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Join Our Journey</h2>
          <p className="mt-4 text-lg text-blue-100">
            Be part of a team that&apos;s shaping the future of technology.
          </p>
          <Link
            href="/careers"
            className="mt-8 inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            View Careers
          </Link>
        </div>
      </section>
    </div>
  );
}
