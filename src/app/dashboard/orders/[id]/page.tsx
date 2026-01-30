import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import db, { Order, OrderItem, Product } from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

interface OrderItemWithProduct extends OrderItem {
  product_name: string;
}

export default async function OrderDetailPage({ params }: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const { id } = await params;
  const orderResult = await db.query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [id, user.id]
  );
  const order = orderResult.rows[0] as Order | undefined;

  if (!order) {
    notFound();
  }

  const itemsResult = await db.query(
    `SELECT oi.*, p.name as product_name
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = $1`,
    [order.id]
  );
  const items = itemsResult.rows as OrderItemWithProduct[];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to Orders
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-500 text-sm mt-1">
                Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${
              order.status === 'completed' ? 'bg-green-100 text-green-800' :
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">{item.product_name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-gray-900 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping Address</h2>
            <p className="text-gray-600 whitespace-pre-line">{order.shipping_address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
