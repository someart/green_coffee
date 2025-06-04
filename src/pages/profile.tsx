import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Order } from '../components/Admin/types';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(allOrders.filter((order: Order) => order.userId === currentUser.id));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.username}!</h2>
          <p>User Type: {user.userType}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>

          <h3 className="text-lg font-medium mt-6 mb-4">Your Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500">You have no orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Items</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">
                        {order.items.map((item) => (
                          <div key={item.title}>{item.title} (x{item.quantity})</div>
                        ))}
                      </td>
                      <td className="p-3">${order.total.toFixed(2)}</td>
                      <td className="p-3">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}