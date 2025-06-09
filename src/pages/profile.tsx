import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Order } from '../components/Admin/types';

// Define User interface with location and phone
interface User {
  id: string;
  username?: string;
  orders?: string[];
  location?: string;
  phone?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setLocation(currentUser.location || '');
    setPhone(currentUser.phone || '');

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(allOrders.filter((order: Order) => order.userId === currentUser.id));
  }, [router]);

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, location, phone };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.username || 'User'}!</h2>

          <div className="mt-4">
            <p className="font-medium">Location: {location || 'Not set'}</p>
            <p className="font-medium">Phone: {phone || 'Not set'}</p>
            {isEditing ? (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Location & Phone
              </button>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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