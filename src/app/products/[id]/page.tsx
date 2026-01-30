import { notFound } from 'next/navigation';
import db, { Product } from '@/lib/db';
import AddToCartButton from '@/components/AddToCartButton';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productResult = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  const product = productResult.rows[0] as Product | undefined;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <svg className="w-32 h-32 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="p-8">
              <div className="text-sm text-blue-600 font-medium">{product.category}</div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.category === 'Services' && (
                  <span className="text-gray-500 ml-2">/month</span>
                )}
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
              </div>

              <div className="mt-8">
                <AddToCartButton product={product} />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Enterprise-grade security</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">24/7 customer support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Free updates and maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">30-day money-back guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
