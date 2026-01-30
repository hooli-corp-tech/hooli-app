import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import db, { Order } from '@/lib/db';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const ordersResult = await db.query(
    'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
    [user.id]
  );
  const orders = ordersResult.rows as Order[];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">{orders.length}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-sm text-gray-500">Active Services</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">3</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-sm text-gray-500">Support Tickets</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">0</div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <Link href="/dashboard/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No orders yet.{' '}
                    <Link href="/products" className="text-blue-600 hover:text-blue-700">
                      Browse products
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="px-6 py-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Order #{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-900 font-medium">${order.total.toFixed(2)}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/products"
                  className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition"
                >
                  Browse Products
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="block w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition"
                >
                  View Orders
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">Name</div>
                  <div className="text-gray-900">{user.name}</div>
                </div>
                <div>
                  <div className="text-gray-500">Email</div>
                  <div className="text-gray-900">{user.email}</div>
                </div>
                <div>
                  <div className="text-gray-500">Member since</div>
                  <div className="text-gray-900">
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
