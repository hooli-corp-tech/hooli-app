import Link from 'next/link';
import db, { Product } from '@/lib/db';

export default async function ProductsPage() {
  const productsResult = await db.query('SELECT * FROM products');
  const products = productsResult.rows as Product[];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover innovative solutions designed to transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium">{product.category}</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
