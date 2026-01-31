import Link from 'next/link';
import Image from 'next/image';

const leadership = [
  {
    name: 'Gavin Belson',
    role: 'Chief Executive Officer',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    bio: 'Visionary leader who founded Hooli in his garage in 1996. Known for his philosophy of "making the world a better place," Gavin has led the company through unprecedented growth and innovation.'
  },
  {
    name: 'Jack Barker',
    role: 'Chief Operating Officer',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    bio: 'Creator of the "Conjoined Triangles of Success" management methodology. Jack brings decades of operational excellence, having previously led companies to successful IPOs.'
  },
  {
    name: 'Davis Bannerchek',
    role: 'Chief Technology Officer',
    image: 'https://randomuser.me/api/portraits/men/35.jpg',
    bio: 'Engineering mastermind behind HooliCloud and Hooli AI. Davis oversees our 5,000+ engineers and drives our technical strategy across all product lines.'
  },
  {
    name: 'Patrice Alexander',
    role: 'Chief Financial Officer',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    bio: 'Former Goldman Sachs partner with deep expertise in tech valuations. Patrice has successfully managed our path to a $47B market cap and oversees global financial operations.'
  },
  {
    name: 'Hoover',
    role: 'Chief Innovation Officer',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Leads Hooli XYZ, our moonshot innovation lab. Hoover has incubated over 40 breakthrough technologies including our quantum computing division.'
  },
  {
    name: 'Denpok',
    role: 'Head of Spiritual Development',
    image: 'https://randomuser.me/api/portraits/men/91.jpg',
    bio: 'Guides the spiritual and mindful culture at Hooli. Denpok ensures our team stays centered and focused on what truly matters: making the world better.'
  },
  {
    name: 'Amanda Chen',
    role: 'Chief People Officer',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    bio: 'Oversees our 15,000+ global workforce. Amanda has built one of tech\'s most sought-after workplace cultures with industry-leading retention rates.'
  },
  {
    name: 'Marcus Webb',
    role: 'Chief Security Officer',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: 'Former NSA director who now leads HooliShield. Marcus protects over $2 trillion in daily transactions and has maintained our perfect security record.'
  },
];

const timeline = [
  { year: '1996', title: 'The Garage Days', description: 'Gavin Belson founds Hooli in a Palo Alto garage with a vision to revolutionize technology.' },
  { year: '1999', title: 'First Million Users', description: 'HooliMail launches and reaches 1 million users in just 90 days.' },
  { year: '2002', title: 'IPO Success', description: 'Hooli goes public on NASDAQ, raising $2.4 billion in the largest tech IPO of the year.' },
  { year: '2008', title: 'Cloud Revolution', description: 'HooliCloud launches, pioneering enterprise cloud computing and setting new industry standards.' },
  { year: '2015', title: 'AI Breakthrough', description: 'Hooli AI division formed, achieving state-of-the-art results in machine learning research.' },
  { year: '2020', title: 'Quantum Leap', description: 'Hooli Quantum achieves 100-qubit milestone, marking a new era in computing.' },
  { year: '2024', title: 'Global Dominance', description: '250M+ daily active users and operations in 195 countries worldwide.' },
  { year: '2026', title: 'The Future', description: 'Launching next-generation AI and achieving 1000-qubit quantum supremacy.' },
];

const values = [
  {
    icon: 'lightning',
    title: 'Innovation First',
    description: 'We reject "good enough" and relentlessly pursue breakthrough solutions. Every Hooli product aims to be 10x better than the alternative.',
    color: 'blue'
  },
  {
    icon: 'shield',
    title: 'Radical Integrity',
    description: 'Transparency isn\'t optional—it\'s foundational. We earn trust through consistent actions, not just words.',
    color: 'green'
  },
  {
    icon: 'users',
    title: 'Community Impact',
    description: 'We measure success by how many lives we improve. Technology should empower everyone, everywhere.',
    color: 'purple'
  },
  {
    icon: 'leaf',
    title: 'Sustainable Future',
    description: 'Carbon-negative by 2027. We\'re building technology that helps the planet, not harms it.',
    color: 'emerald'
  },
];

const offices = [
  { city: 'Palo Alto', country: 'HQ', employees: '5,000+' },
  { city: 'London', country: 'UK', employees: '2,500+' },
  { city: 'Tokyo', country: 'Japan', employees: '1,800+' },
  { city: 'Singapore', country: 'APAC Hub', employees: '1,200+' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium text-blue-300 mb-6">
            Since 1996
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Making the World<br />a Better Place</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            From a Palo Alto garage to powering the world&apos;s most innovative companies.
            This is the Hooli story.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
                From Garage to Global
              </h2>
              <div className="mt-6 space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  In 1996, Gavin Belson had a radical idea: technology should make the world fundamentally better,
                  not just incrementally faster. Working from a cramped garage on Newell Road in Palo Alto,
                  he built the first version of what would become Hooli.
                </p>
                <p>
                  Three decades later, that vision has transformed into a global enterprise serving 250 million
                  daily users across 195 countries. Our cloud infrastructure processes $2 trillion in
                  transactions daily. Our AI powers everything from healthcare diagnostics to autonomous vehicles.
                </p>
                <p>
                  But we&apos;re just getting started. With breakthroughs in quantum computing and next-generation AI,
                  Hooli is positioned to define the next era of technology.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold">$47B</div>
                <div className="mt-2 text-blue-100">Market Cap</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold">15K+</div>
                <div className="mt-2 text-green-100">Employees</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold">250M+</div>
                <div className="mt-2 text-purple-100">Daily Users</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold">195</div>
                <div className="mt-2 text-orange-100">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Milestones</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={item.year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                      <span className="text-blue-600 font-bold text-lg">{item.year}</span>
                      <h3 className="mt-1 text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What Drives Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className={`w-16 h-16 bg-${value.color}-100 rounded-2xl flex items-center justify-center mx-auto`}>
                  {value.icon === 'lightning' && (
                    <svg className={`w-8 h-8 text-${value.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {value.icon === 'shield' && (
                    <svg className={`w-8 h-8 text-${value.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {value.icon === 'users' && (
                    <svg className={`w-8 h-8 text-${value.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {value.icon === 'leaf' && (
                    <svg className={`w-8 h-8 text-${value.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="mt-3 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">The Team</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Leadership</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the visionaries driving Hooli&apos;s mission to make the world a better place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person) => (
              <div key={person.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition group">
                <div className="w-24 h-24 mx-auto relative group-hover:scale-105 transition">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900 text-center">{person.name}</h3>
                <p className="text-blue-600 text-sm text-center">{person.role}</p>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Worldwide</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Global Presence</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {offices.map((office) => (
              <div key={office.city} className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                <p className="text-sm text-gray-500">{office.country}</p>
                <p className="mt-2 text-blue-600 font-semibold">{office.employees}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold">Join Our Journey</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Be part of a team that&apos;s shaping the future of technology. We&apos;re always looking for
            passionate people who want to make the world a better place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              View Open Positions
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
